package org.example.meetingbe.service.meeting;

import org.example.meetingbe.dto.MeetingDto;
import org.example.meetingbe.model.Meeting;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public interface IMeetingService {
    MeetingDto createRoom(Long senderId);
    MeetingDto getRoom(String meetingId);

    void addParticipant(String meetingId, Long userId) ;
}
