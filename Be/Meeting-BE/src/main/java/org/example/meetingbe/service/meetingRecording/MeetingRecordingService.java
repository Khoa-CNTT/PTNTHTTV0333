package org.example.meetingbe.service.meetingRecording;

import org.example.meetingbe.model.MeetingRecording;
import org.example.meetingbe.repository.IMeetingRecordingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class MeetingRecordingService implements IMeetingRecordingService {
    @Autowired
    private IMeetingRecordingRepo meetingRecordingRepo;

    @Override
    public MeetingRecording findByMeetingId(Long id) {
        MeetingRecording meetingRecording = meetingRecordingRepo.findByMeetingId(id);
        if (meetingRecording == null){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Meeting record does not exist");
        }
        return meetingRecording;
    }

    @Override
    public MeetingRecording addNewRecord(MeetingRecording meetingRecording) {
        MeetingRecording recordTemp = meetingRecordingRepo.findByMeetingId(meetingRecording.getId());
        if (recordTemp == null){
            meetingRecordingRepo.save(meetingRecording);
            return meetingRecording;
        }
        recordTemp.setRecordUrl(meetingRecording.getRecordUrl());
        recordTemp.setUploadAt(LocalDateTime.now());
        meetingRecordingRepo.save(recordTemp);
        return recordTemp;
    }
}
