package org.example.meetingbe.service.meeting;

import org.example.meetingbe.dto.MeetingDto;
import org.example.meetingbe.model.Meeting;
import org.example.meetingbe.model.Participants;
import org.example.meetingbe.repository.IMeetingRepo;
import org.example.meetingbe.repository.IParticipantsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class MeetingService implements IMeetingService {
    @Autowired
    private IMeetingRepo meetingRepo;
    @Autowired
    private IParticipantsRepo participantsRepo;

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
        Optional<Meeting> mt = meetingRepo.findById(meeting.getId());
        if (meeting != null) {
            meeting.getUser().add(userId);
            Participants p = new Participants(LocalDateTime.now(),null,mt.get(),mt.get().getUser());
        }
    }
}
