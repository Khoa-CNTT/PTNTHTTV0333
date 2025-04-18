package org.example.meetingbe.service.meeting;

import org.example.meetingbe.model.ChatMessage;
import org.example.meetingbe.model.Meeting;
import org.example.meetingbe.repository.IMeetingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService implements IMeetingService {
    @Autowired
    private IMeetingRepo meetingRepo;


    @Override
    public Meeting findById(Long id) {
        return meetingRepo.findById(id).get();
    }
}
