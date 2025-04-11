package org.example.meetingbe.service.meeting;

import org.example.meetingbe.repository.IMeetingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingService implements IMeetingService {
    @Autowired
    private IMeetingRepo meetingRepo;
}
