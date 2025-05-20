package org.example.meetingbe.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.meetingbe.repository.IUserRepo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private static final Logger logger = LoggerFactory.getLogger(WebSocketHandler.class.getName());
    private final Map<String, Map<String, WebSocketSession>> roomSessions = new ConcurrentHashMap<>();
    private final Map<String, String> sessionToParticipantId = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    IUserRepo userRepo;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        logger.info("New connection established: sessionId=" + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        try {
            String payload = message.getPayload();
            if (payload == null || payload.trim().isEmpty()) {
                logger.warn("Received empty payload from session: " + session.getId());
                return;
            }

            try {
                objectMapper.readTree(payload);
            } catch (Exception e) {
                logger.error("Invalid JSON payload: " + payload + ", error: " + e.getMessage());
                return;
            }

            Map<String, Object> signal = objectMapper.readValue(payload, Map.class);
            String roomId = (String) signal.get("roomId");
            String senderId = (String) signal.get("senderId");
            String targetParticipantId = (String) signal.get("targetParticipantId");
            String type = (String) signal.get("type");

            if ("chat".equals(type)) {
                String chatMessage = (String) signal.get("message");
                String sendAt = (String) signal.get("sendAt");
                

                // Broadcast message to all participants in the room
                roomSessions.getOrDefault(roomId, new ConcurrentHashMap<>()).forEach((participantId, participantSession) -> {
                    if (participantSession.isOpen() && !participantSession.getId().equals(session.getId())) {
                        try {
                            participantSession.sendMessage(new TextMessage(payload));
                            logger.info("Sent chat message to: " + participantId);
                        } catch (Exception e) {
                            logger.error("Error sending chat message: " + e.getMessage());
                        }
                    }
                });
            }


            if (roomId == null || senderId == null || type == null) {
                logger.warn("Missing required fields in signal: " + payload);
                return;
            }

            logger.info("Processing signal: type=" + type + ", roomId=" + roomId + ", senderId=" + senderId + ", targetParticipantId=" + targetParticipantId);

            if (session.isOpen()) {
                roomSessions.computeIfAbsent(roomId, k -> new ConcurrentHashMap<>()).put(senderId, session);
                sessionToParticipantId.put(session.getId(), senderId);
            } else {
                logger.warn("Session not open for senderId: " + senderId);
                return;
            }

            roomSessions.getOrDefault(roomId, new ConcurrentHashMap<>()).entrySet().removeIf(entry -> !entry.getValue().isOpen());

            logger.info("Current sessions in room " + roomId + ": " + roomSessions.get(roomId).keySet());

            if ("new-participant".equals(type)) {
                Map<String, WebSocketSession> sessionsInRoom = roomSessions.getOrDefault(roomId, new ConcurrentHashMap<>());
                for (WebSocketSession s : sessionsInRoom.values()) {
                    if (s.isOpen() && !s.getId().equals(session.getId())) {
                        s.sendMessage(new TextMessage(payload));
                        logger.info("Broadcast new-participant to: " + sessionToParticipantId.get(s.getId()));
                    }
                }
            } else if ("participant-left".equals(type)) {
                Map<String, WebSocketSession> sessionsInRoom = roomSessions.getOrDefault(roomId, new ConcurrentHashMap<>());
                for (WebSocketSession s : sessionsInRoom.values()) {
                    if (s.isOpen() && !s.getId().equals(session.getId())) {
                        s.sendMessage(new TextMessage(payload));
                        logger.info("Broadcast participant-left to: " + sessionToParticipantId.get(s.getId()));
                    }
                }
            } else if ("chat-message".equals(type)) {
                String chatMessage = (String) signal.get("message");
                if (chatMessage == null || chatMessage.trim().isEmpty()) {
                    logger.warn("Empty chat message from: " + senderId);
                    return;
                }
                Map<String, WebSocketSession> sessionsInRoom = roomSessions.getOrDefault(roomId, new ConcurrentHashMap<>());
                for (WebSocketSession s : sessionsInRoom.values()) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(payload));
                        logger.info("Broadcast chat-message to: " + sessionToParticipantId.get(s.getId()));
                    }
                }
            } else if (targetParticipantId != null) {
                WebSocketSession targetSession = roomSessions.getOrDefault(roomId, new ConcurrentHashMap<>()).get(targetParticipantId);
                if (targetSession != null && targetSession.isOpen()) {
                    if ("offer".equals(type) || "answer".equals(type)) {
                        Object sdpObj = signal.get("sdp");
                        if (!(sdpObj instanceof Map)) {
                            logger.warn("Invalid SDP object in signal: " + payload);
                            return;
                        }
                        Map<String, Object> sdpMap = (Map<String, Object>) sdpObj;
                        String sdp = (String) sdpMap.get("sdp");
                        String sdpType = (String) sdpMap.get("type");
                        if (sdp == null || sdpType == null || !sdp.startsWith("v=")) {
                            logger.warn("Invalid SDP in signal: " + payload);
                            return;
                        }
                    }
                    if ("ice-candidate".equals(type)) {
                        Object candidateObj = signal.get("candidate");
                        if (!(candidateObj instanceof Map)) {
                            logger.warn("Invalid candidate object in signal: " + payload);
                            return;
                        }
                        Map<String, Object> candidateMap = (Map<String, Object>) candidateObj;
                        String candidate = (String) candidateMap.get("candidate");
                        if (candidate == null || candidate.trim().isEmpty()) {
                            logger.info("Received empty ICE candidate (end of candidates) from: " + senderId);
                            return;
                        }
                    }
                    targetSession.sendMessage(new TextMessage(payload));
                    logger.info("Sent message to target: " + targetParticipantId);
                } else {
                    logger.warn("Target session not found or closed: " + targetParticipantId + " in room: " + roomId);
                }
            }
        } catch (Exception e) {
            logger.error("Error handling message: " + e.getMessage(), e);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String participantId = sessionToParticipantId.get(session.getId());
        if (participantId != null) {
            String foundRoomId = null;
            for (Map.Entry<String, Map<String, WebSocketSession>> entry : roomSessions.entrySet()) {
                if (entry.getValue().containsKey(participantId)) {
                    foundRoomId = entry.getKey();
                    break;
                }
            }

            roomSessions.values().forEach(sessions -> sessions.remove(participantId));
            sessionToParticipantId.remove(session.getId());

            if (foundRoomId != null) {
                final String roomId = foundRoomId;
                Map<String, WebSocketSession> sessionsInRoom = roomSessions.getOrDefault(roomId, new ConcurrentHashMap<>());
                String payload = objectMapper.writeValueAsString(new HashMap<String, Object>() {{
                    put("roomId", roomId);
                    put("senderId", participantId);
                    put("type", "participant-left");
                }});


                for (WebSocketSession s : sessionsInRoom.values()) {
                    if (s.isOpen()) {
                        s.sendMessage(new TextMessage(payload));
                        logger.info("Notified participant-left to: " + sessionToParticipantId.get(s.getId()));
                    }
                }
            }


            logger.info("Connection closed: sessionId=" + session.getId() + ", participantId=" + participantId + ", status=" + status);
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        String participantId = sessionToParticipantId.get(session.getId());
        logger.error("Transport error: sessionId=" + session.getId() + ", participantId=" + participantId + ", error=" + exception.getMessage(), exception);
        if (participantId != null) {
            roomSessions.values().forEach(sessions -> sessions.remove(participantId));
            sessionToParticipantId.remove(session.getId());
        }
    }
}