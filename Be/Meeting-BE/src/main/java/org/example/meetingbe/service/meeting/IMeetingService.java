package org.example.meetingbe.service.meeting;

import org.example.meetingbe.dto.MeetingDto;
import org.example.meetingbe.dto.ScheduleDto;
import org.example.meetingbe.model.Meeting;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public interface IMeetingService {
    MeetingDto createRoom(Long hostId, String title);
    MeetingDto getRoom(String meetingId);

    void addParticipant(String meetingId, Long userId) ;
    String createRoomSchedule(Long hostId, ScheduleDto schedule);
}
