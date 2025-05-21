package org.example.meetingbe.service.meetingRecording;

import org.example.meetingbe.dto.MeetingRecordingDto;
import org.example.meetingbe.model.Meeting;
import org.example.meetingbe.model.MeetingRecording;
import org.example.meetingbe.repository.IMeetingRecordingRepo;
import org.example.meetingbe.repository.IMeetingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class MeetingRecordingService implements IMeetingRecordingService {
    @Autowired
    private IMeetingRecordingRepo meetingRecordingRepo;
    @Autowired
    private IMeetingRepo meetingRepo;

    @Override
    public MeetingRecording findByMeetingId(Long id) {
        Optional<MeetingRecording> meetingRecording = meetingRecordingRepo.findByMeetingId(id);
        if (meetingRecording == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Meeting record does not exist");
        }
        return meetingRecording.get();
    }

    @Override
    public MeetingRecording addNewRecord(MeetingRecording meetingRecording) {
        meetingRecordingRepo.save(meetingRecording);
        return meetingRecording;
    }
    @Transactional
    public MeetingRecording addOrUpdateMeetingRecord(MeetingRecordingDto dto) {
        Meeting meeting = meetingRepo.findById(dto.getMeetingId())
                .orElseThrow(() -> new RuntimeException("Meeting not found"));

        Optional<MeetingRecording> existingRecordOpt = meetingRecordingRepo.findByMeetingId(meeting.getId());

        MeetingRecording record;
        if (existingRecordOpt.isPresent()) {
            record = existingRecordOpt.get();
            record.setRecordUrl(dto.getRecordUrl());
            record.setUploadAt(LocalDateTime.now());
        } else {
            record = new MeetingRecording();
            record.setMeeting(meeting);
            record.setRecordUrl(dto.getRecordUrl());
            record.setUploadAt(LocalDateTime.now());
        }
        return meetingRecordingRepo.save(record);
    }
}
