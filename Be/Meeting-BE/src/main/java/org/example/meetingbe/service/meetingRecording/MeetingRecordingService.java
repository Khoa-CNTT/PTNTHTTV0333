package org.example.meetingbe.service.meetingRecording;

import org.example.meetingbe.repository.IMeetingRecordingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingRecordingService implements IMeetingRecordingService {
    @Autowired
    private IMeetingRecordingRepo meetingRecordingRepo;
}
