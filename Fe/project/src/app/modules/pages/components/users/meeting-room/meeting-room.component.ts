import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MeetingService } from 'src/app/services/meeting.service';

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints: MediaStreamConstraints): Promise<MediaStream>;
  }
}
@Component({
  selector: 'app-meeting-room',
  templateUrl: './meeting-room.component.html',
  styleUrls: ['./meeting-room.component.css']
})
export class MeetingRoomComponent implements OnInit, OnDestroy {
  roomId: string = '';
  roomLink: string = '';
  videoEnabled: boolean = true;
  micEnabled: boolean = true;
  isScreenSharing: boolean = false;
  localStream: MediaStream | null = null;
  screenStream: MediaStream | null = null;
  peers: { id: string; videoEnabled: boolean; micEnabled: boolean }[] = [];
  ws: WebSocket | null = null;
  peerConnections: Map<string, RTCPeerConnection> = new Map();
  signalQueue: Map<string, Array<{ type: string; signal: any }>> = new Map();
  participantId: string = uuidv4();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  errorMessage: string | null = null;
  private disconnectedPeers: Set<string> = new Set(); // Track disconnected peers

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  async ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    this.roomLink = `${window.location.origin}/pages/components/meeting-room/${this.roomId}`;
    console.log('Joining room:', this.roomId, 'with participantId:', this.participantId);
    this.meetingService.joinRoom(this.roomId, this.participantId).subscribe({
      next: () => console.log('Joined room successfully'),
      error: (err) => {
        console.error('Error joining room:', err);
        this.cdr.detectChanges();
      },
    });
    await this.startWebRTC();
    this.connectWebSocket();
  }

  async startWebRTC() {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (permissionStatus.state === 'denied') {
        this.errorMessage = 'Quyền truy cập camera bị từ chối. Vui lòng cấp quyền trong cài đặt trình duyệt.';
        this.cdr.detectChanges();
        return;
      }

      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
      localVideo.srcObject = this.localStream;
      console.log('Local stream initialized with tracks:', this.localStream.getTracks());
    } catch (err) {
      console.error('Error accessing media devices:', err);
      this.errorMessage = 'Không thể truy cập camera hoặc microphone. Vui lòng kiểm tra quyền truy cập.';
      this.cdr.detectChanges();
    }
  }

  async toggleScreenShare() {
    if (this.isScreenSharing) {
      this.stopScreenShare();
    } else {
      try {
        this.screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });
        this.isScreenSharing = true;
        console.log('Screen stream initialized with tracks:', this.screenStream.getTracks());

        this.cdr.detectChanges();
        setTimeout(() => {
          const localScreen = document.getElementById('localScreen') as HTMLVideoElement;
          if (localScreen && this.screenStream) {
            localScreen.srcObject = this.screenStream;
            localScreen.play().catch((err) => console.error('Error playing local screen:', err));
            console.log('Assigned screen stream to localScreen element');
          } else {
            console.error('localScreen element or screenStream not found');
          }
        }, 100);

        const screenTrack = this.screenStream.getVideoTracks()[0];
        this.peerConnections.forEach((peerConnection, peerId) => {
          const videoSender = peerConnection.getSenders().find(sender => sender.track?.kind === 'video');
          if (videoSender && screenTrack) {
            videoSender.replaceTrack(screenTrack).then(() => {
              console.log('Replaced video track with screen track for peer:', peerId);
            }).catch(err => console.error('Error replacing track:', err));
          } else if (screenTrack) {
            peerConnection.addTrack(screenTrack, this.screenStream!);
            console.log('Added screen track to peer:', peerId);
          }
        });

        screenTrack.onended = () => {
          console.log('Screen sharing ended by user');
          this.stopScreenShare();
        };

        this.cdr.detectChanges();
      } catch (error) {
        console.error('Error accessing display media:', error);
        this.errorMessage = error.name === 'NotAllowedError'
          ? 'Quyền chia sẻ màn hình bị từ chối. Vui lòng cấp quyền.'
          : 'Không thể chia sẻ màn hình. Vui lòng thử lại.';
        this.isScreenSharing = false;
        this.screenStream = null;
        this.cdr.detectChanges();
      }
    }
  }

  stopScreenShare() {
    if (this.screenStream) {
      this.screenStream.getTracks().forEach(track => track.stop());
      this.screenStream = null;
      this.isScreenSharing = false;
      console.log('Stopped screen sharing');

      const localScreen = document.getElementById('localScreen') as HTMLVideoElement;
      if (localScreen) {
        localScreen.srcObject = null;
        console.log('Cleared localScreen srcObject');
      }

      if (this.localStream) {
        const videoTrack = this.localStream.getVideoTracks()[0];
        if (videoTrack) {
          this.peerConnections.forEach((peerConnection, peerId) => {
            const videoSender = peerConnection.getSenders().find(sender => sender.track?.kind === 'video');
            if (videoSender) {
              videoSender.replaceTrack(videoTrack).then(() => {
                console.log('Restored camera video track for peer:', peerId);
              }).catch(err => console.error('Error restoring track:', err));
            }
          });
        }
      }

      this.cdr.detectChanges();
    }
  }

  connectWebSocket() {
    this.ws = new WebSocket('ws://localhost:8080/signaling');

    this.ws.onopen = () => {
      console.log('WebSocket connected for participant:', this.participantId);
      this.reconnectAttempts = 0;
      this.ws?.send(
        JSON.stringify({
          roomId: this.roomId,
          senderId: this.participantId,
          type: 'new-participant',
        })
      );
    };

    this.ws.onmessage = async (event) => {
      try {
        const data = event.data;
        if (typeof data !== 'string' || data.trim() === '') {
          console.warn('Received empty or invalid WebSocket message:', data);
          return;
        }

        let signal;
        try {
          signal = JSON.parse(data);
        } catch (err) {
          console.error('Error parsing WebSocket message:', data, err);
          return;
        }

        console.log('Received signal:', signal);

        if (signal.roomId !== this.roomId) {
          console.log('Ignoring signal for different room:', signal.roomId);
          return;
        }

        const peerId = signal.senderId;
        if (peerId === this.participantId) {
          console.log('Ignoring signal from self');
          return;
        }

        // Ignore signals from disconnected peers
        if (this.disconnectedPeers.has(peerId)) {
          console.log(`Ignoring signal from disconnected peer: ${peerId}, type: ${signal.type}`);
          return;
        }

        let peerConnection = this.peerConnections.get(peerId);
        if (!peerConnection && signal.type !== 'new-participant' && signal.type !== 'participant-left' && signal.type !== 'status-update') {
          console.log('Creating new peer connection for:', peerId);
          peerConnection = this.createPeerConnection(peerId);
          this.peerConnections.set(peerId, peerConnection);
        }

        if (signal.type === 'offer' || signal.type === 'answer') {
          if (!this.signalQueue.has(peerId)) {
            this.signalQueue.set(peerId, []);
          }
          this.signalQueue.get(peerId)!.push({ type: signal.type, signal });
          await this.processSignalQueue(peerId);
        } else if (signal.type === 'ice-candidate') {
          console.log('Received ICE candidate from:', peerId);
          if (peerConnection) {
            if (signal.candidate && signal.candidate.candidate) {
              await peerConnection.addIceCandidate(new RTCIceCandidate(signal.candidate));
            } else {
              console.log('Received empty ICE candidate (end of candidates) for:', peerId);
            }
          } else {
            console.warn('No peer connection for ICE candidate from:', peerId);
          }
        } else if (signal.type === 'new-participant') {
          console.log('New participant joined:', peerId);
          if (!this.peers.some(peer => peer.id === peerId) && !this.disconnectedPeers.has(peerId)) {
            this.peers = [...this.peers, { id: peerId, videoEnabled: true, micEnabled: true }];
            this.cdr.detectChanges();
          }
          if (!this.peerConnections.has(peerId)) {
            peerConnection = this.createPeerConnection(peerId);
            this.peerConnections.set(peerId, peerConnection);
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            this.ws?.send(
              JSON.stringify({
                roomId: this.roomId,
                senderId: this.participantId,
                targetParticipantId: peerId,
                type: 'offer',
                sdp: peerConnection.localDescription,
              })
            );
            console.log('Sent offer to:', peerId);
          }
        } else if (signal.type === 'participant-left') {
          console.log('Participant left:', peerId);
          this.cleanupPeer(peerId);
        } else if (signal.type === 'status-update') {
          console.log('Received status update from:', peerId, signal.status);
          this.peers = this.peers.map(peer =>
            peer.id === peerId
              ? { ...peer, videoEnabled: signal.status.videoEnabled, micEnabled: signal.status.micEnabled }
              : peer
          );
          this.cdr.detectChanges();
        }
      } catch (err) {
        console.error('Error processing WebSocket message:', err);
      }
    };

    this.ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket closed, code:', event.code, 'reason:', event.reason);
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        console.log(`Reconnecting WebSocket, attempt ${this.reconnectAttempts + 1}`);
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connectWebSocket();
        }, 3000);
      } else {
        console.error('Max reconnect attempts reached. Please refresh the page.');
        this.errorMessage = 'Mất kết nối với server. Vui lòng làm mới trang.';
        this.cdr.detectChanges();
      }
    };
  }

  cleanupPeer(peerId: string) {
    console.log(`Cleaning up peer: ${peerId}`);

    // Mark peer as disconnected
    this.disconnectedPeers.add(peerId);

    // Close and remove peer connection
    const peerConnection = this.peerConnections.get(peerId);
    if (peerConnection) {
      peerConnection.close();
      this.peerConnections.delete(peerId);
      console.log(`Closed peer connection for peer: ${peerId}`);
    }

    // Remove from signal queue
    this.signalQueue.delete(peerId);

    // Remove from peers array
    const peerExists = this.peers.some(peer => peer.id === peerId);
    if (peerExists) {
      this.peers = this.peers.filter(peer => peer.id !== peerId);
      console.log(`Removed peer ${peerId} from peers array`);
    } else {
      console.log(`Peer ${peerId} not found in peers array`);
    }

    // Remove video element from DOM
    const videoElement = document.getElementById(`peerVideo-${peerId}`) as HTMLVideoElement;
    if (videoElement) {
      videoElement.srcObject = null;
      videoElement.remove();
      console.log(`Removed video element for peer: ${peerId}`);
    } else {
      console.log(`No video element found for peer: ${peerId}`);
    }

    // Trigger UI update
    this.cdr.detectChanges();
    console.log(`Completed cleanup for peer: ${peerId}`);
  }

  async processSignalQueue(peerId: string) {
    // Skip processing if peer is disconnected
    if (this.disconnectedPeers.has(peerId)) {
      console.log(`Skipping signal queue for disconnected peer: ${peerId}`);
      this.signalQueue.delete(peerId);
      return;
    }

    const queue = this.signalQueue.get(peerId);
    if (!queue || queue.length === 0) return;

    const peerConnection = this.peerConnections.get(peerId);
    if (!peerConnection) {
      console.warn('No peer connection for queue processing:', peerId);
      this.signalQueue.delete(peerId);
      return;
    }

    const { type, signal } = queue[0];

    try {
      if (type === 'offer') {
        console.log('Processing queued offer from:', peerId);
        if (!signal.sdp || !signal.sdp.type || !signal.sdp.sdp || typeof signal.sdp.sdp !== 'string' || !signal.sdp.sdp.startsWith('v=')) {
          console.warn('Invalid SDP in queued offer:', signal);
          queue.shift();
          await this.processSignalQueue(peerId);
          return;
        }
        if (peerConnection.signalingState !== 'stable') {
          console.warn(`Cannot process offer in signaling state: ${peerConnection.signalingState}`);
          return;
        }
        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        this.ws?.send(
          JSON.stringify({
            roomId: this.roomId,
            senderId: this.participantId,
            targetParticipantId: peerId,
            type: 'answer',
            sdp: peerConnection.localDescription,
          })
        );
        console.log('Sent answer to:', peerId);
      } else if (type === 'answer') {
        console.log('Processing queued answer from:', peerId);
        if (!signal.sdp || !signal.sdp.type || !signal.sdp.sdp || typeof signal.sdp.sdp !== 'string' || !signal.sdp.sdp.startsWith('v=')) {
          console.warn('Invalid SDP in queued answer:', signal);
          queue.shift();
          await this.processSignalQueue(peerId);
          return;
        }
        if (peerConnection.signalingState !== 'have-local-offer') {
          console.warn(`Cannot process answer in signaling state: ${peerConnection.signalingState}`);
          return;
        }
        await peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp));
      }
      queue.shift();
      await this.processSignalQueue(peerId);
    } catch (err) {
      console.error('Error processing queued signal:', err);
      queue.shift();
      await this.processSignalQueue(peerId);
    }
  }

  createPeerConnection(peerId: string): RTCPeerConnection {
    // Prevent creating peer connection for disconnected peer
    if (this.disconnectedPeers.has(peerId)) {
      console.log(`Prevented creating peer connection for disconnected peer: ${peerId}`);
      throw new Error(`Peer ${peerId} is disconnected`);
    }

    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ],
    });

    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, this.localStream!);
        console.log('Added track to peer:', peerId, track);
      });
    } else {
      console.warn('No local stream available for peer:', peerId);
      this.errorMessage = 'Không có luồng video cục bộ. Vui lòng kiểm tra camera/microphone.';
      this.cdr.detectChanges();
    }

    if (this.screenStream) {
      this.screenStream.getVideoTracks().forEach((track) => {
        peerConnection.addTrack(track, this.screenStream!);
        console.log('Added screen track to peer:', peerId, track);
      });
    }

    peerConnection.ontrack = (e) => {
      // Skip if peer is disconnected
      if (this.disconnectedPeers.has(peerId)) {
        console.log(`Ignoring ontrack event for disconnected peer: ${peerId}`);
        return;
      }

      console.log('Received remote stream for peer:', peerId, e.streams);
      if (e.streams && e.streams[0]) {
        const remoteStream = e.streams[0];
        let videoElement = document.getElementById(`peerVideo-${peerId}`) as HTMLVideoElement;

        if (!videoElement) {
          console.log('Creating video element for peer:', peerId);
          if (!this.peers.some(peer => peer.id === peerId)) {
            this.peers = [...this.peers, { id: peerId, videoEnabled: true, micEnabled: true }];
            this.cdr.detectChanges();
          }
          setTimeout(() => {
            videoElement = document.getElementById(`peerVideo-${peerId}`) as HTMLVideoElement;
            if (videoElement && !this.disconnectedPeers.has(peerId)) {
              if (videoElement.srcObject !== remoteStream) {
                videoElement.srcObject = remoteStream;
                videoElement.play().catch((err) => {
                  console.error('Error playing video for peer:', peerId, err);
                  if (err.name === 'NotAllowedError') {
                    this.errorMessage = 'Vui lòng tương tác với trang (nhấp chuột) để phát video.';
                    this.cdr.detectChanges();
                  }
                });
                console.log('Assigned stream to video element for peer:', peerId);
              }
            } else {
              console.error('Video element not found or peer disconnected for peer:', peerId);
            }
          }, 500);
        } else if (videoElement.srcObject !== remoteStream && !this.disconnectedPeers.has(peerId)) {
          videoElement.srcObject = remoteStream;
          videoElement.play().catch((err) => {
            console.error('Error playing video for peer:', peerId, err);
            if (err.name === 'NotAllowedError') {
              this.errorMessage = 'Vui lòng tương tác với trang (nhấp chuột) để phát video.';
              this.cdr.detectChanges();
            }
          });
          console.log('Assigned stream to existing video element for peer:', peerId);
        }
      } else {
        console.warn('No remote stream received for peer:', peerId);
      }
    };

    peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        console.log('Sending ICE candidate to:', peerId);
        this.ws?.send(
          JSON.stringify({
            roomId: this.roomId,
            senderId: this.participantId,
            targetParticipantId: peerId,
            type: 'ice-candidate',
            candidate: e.candidate,
          })
        );
      } else {
        console.log('End of ICE candidates for peer:', peerId);
      }
    };

    peerConnection.onconnectionstatechange = () => {
      console.log(`Peer ${peerId} connection state: ${peerConnection.connectionState}`);
      if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'closed') {
        console.log(`Peer ${peerId} connection ${peerConnection.connectionState}, cleaning up`);
        this.cleanupPeer(peerId);
      } else if (peerConnection.connectionState === 'failed') {
        console.error('Connection failed for peer:', peerId);
        this.recreatePeerConnection(peerId);
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      console.log(`Peer ${peerId} ICE connection state: ${peerConnection.iceConnectionState}`);
      if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'closed') {
        console.log(`Peer ${peerId} ICE connection ${peerConnection.iceConnectionState}, cleaning up`);
        this.cleanupPeer(peerId);
      } else if (peerConnection.iceConnectionState === 'failed') {
        console.error('ICE connection failed for peer:', peerId);
        this.recreatePeerConnection(peerId);
      }
    };

    return peerConnection;
  }

  async recreatePeerConnection(peerId: string) {
    // Skip if peer is disconnected
    if (this.disconnectedPeers.has(peerId)) {
      console.log(`Skipping recreate peer connection for disconnected peer: ${peerId}`);
      return;
    }

    console.log('Recreating peer connection for:', peerId);
    let peerConnection = this.peerConnections.get(peerId);
    if (peerConnection) {
      peerConnection.close();
      this.peerConnections.delete(peerId);
    }

    peerConnection = this.createPeerConnection(peerId);
    this.peerConnections.set(peerId, peerConnection);

    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      this.ws?.send(
        JSON.stringify({
          roomId: this.roomId,
          senderId: this.participantId,
          targetParticipantId: peerId,
          type: 'offer',
          sdp: peerConnection.localDescription,
        })
      );
      console.log('Sent new offer to:', peerId);
    } catch (err) {
      console.error('Error recreating peer connection:', err);
    }
  }

  toggleMic() {
    this.micEnabled = !this.micEnabled;
    this.localStream?.getAudioTracks().forEach((track) => {
      track.enabled = this.micEnabled;
      console.log(`Audio track enabled: ${this.micEnabled}`);
    });
    this.sendStatusUpdate();
  }

  toggleVideo() {
    this.videoEnabled = !this.videoEnabled;
    this.localStream?.getVideoTracks().forEach((track) => {
      track.enabled = this.videoEnabled;
      console.log(`Video track enabled: ${this.videoEnabled}`);
    });
    this.sendStatusUpdate();
  }

  sendStatusUpdate() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          roomId: this.roomId,
          senderId: this.participantId,
          type: 'status-update',
          status: {
            videoEnabled: this.videoEnabled,
            micEnabled: this.micEnabled,
          },
        })
      );
      console.log('Sent status update:', { videoEnabled: this.videoEnabled, micEnabled: this.micEnabled });
    }
  }

  copyLink() {
    navigator.clipboard.writeText(this.roomLink);
    alert('Đã sao chép liên kết!');
  }

  disconnect() {
    console.log('Disconnecting from room:', this.roomId);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          roomId: this.roomId,
          senderId: this.participantId,
          type: 'participant-left',
        })
      );
      console.log('Sent participant-left message');
    }

    this.stopScreenShare();
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.peerConnections.forEach((pc) => pc.close());
    this.peerConnections.clear();
    this.peers = [];
    this.disconnectedPeers.clear();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    console.log('Cleaned up resources and disconnected');

    this.router.navigate(['/pages/components/home-main']);
  }

  ngOnDestroy() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          roomId: this.roomId,
          senderId: this.participantId,
          type: 'participant-left',
        })
      );
      console.log('Sent participant-left message');
    }

    this.stopScreenShare();
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.peerConnections.forEach((pc) => pc.close());
    this.peerConnections.clear();
    this.peers = [];
    this.disconnectedPeers.clear();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    console.log('Component destroyed, cleaned up resources');
  }

  trackByPeerId(index: number, peer: { id: string }): string {
    return peer.id;
  }
}