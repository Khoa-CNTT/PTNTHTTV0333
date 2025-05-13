package org.example.meetingbe.service.meeting;

import org.example.meetingbe.dto.MeetingDto;
import org.example.meetingbe.model.Meeting;
import org.example.meetingbe.repository.IMeetingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class MeetingService implements IMeetingService {
    @Autowired
    private IMeetingRepo meetingRepo;

    private final Map<String, MeetingDto> meetings = new HashMap<>();
    @Override
    public MeetingDto createRoom() {
        MeetingDto meeting = new MeetingDto();
        meeting.setCode(UUID.randomUUID().toString());
        meetings.put(meeting.getCode(), meeting);
        return meeting;
    }
    @Override
    public MeetingDto getRoom(String meetingId) {
        return meetings.get(meetingId);
    }
    @Override
    public void addParticipant(String meetingId, Long userId) {
        MeetingDto meeting = meetings.get(meetingId);
        if (meeting != null) {
            meeting.getUser().add(userId);
        }
    }
}
