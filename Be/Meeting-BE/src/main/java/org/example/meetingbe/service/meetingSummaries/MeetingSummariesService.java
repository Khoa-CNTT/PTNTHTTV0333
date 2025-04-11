package org.example.meetingbe.service.meetingSummaries;

import org.example.meetingbe.repository.IMeetingSummariesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingSummariesService implements IMeetingSummariesService{
    @Autowired
    private IMeetingSummariesRepo meetingSummariesRepo;
}
