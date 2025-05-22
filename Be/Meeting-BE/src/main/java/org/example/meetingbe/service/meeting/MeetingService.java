package org.example.meetingbe.service.meeting;

import org.example.meetingbe.dto.MeetingDto;
import org.example.meetingbe.model.Meeting;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IMeetingRepo;
import org.example.meetingbe.model.Participants;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IMeetingRepo;
import org.example.meetingbe.repository.IUserRepo;
import org.example.meetingbe.repository.IParticipantsRepo;
import org.example.meetingbe.repository.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MeetingService implements IMeetingService {
    @Autowired
    private IMeetingRepo meetingRepo;
    @Autowired
    private IParticipantsRepo participantsRepo;
    @Autowired
    private IUserRepo userRepo;

    private final Map<String, MeetingDto> meetings = new HashMap<>();
    @Override
    public MeetingDto createRoom(Long hostId, String title) {
        Meeting meeting = new Meeting();
        meeting.setCode(UUID.randomUUID().toString().substring(0, 12));
        meeting.setTitle(title);
        meeting.setCreateAt(LocalDateTime.now());
        meeting.setStartTime(LocalDateTime.now());

        User host = userRepo.findById(hostId)
                .orElseThrow(() -> new RuntimeException("Host not found"));
        meeting.setUser(host);

        // Lưu vào cơ sở dữ liệu
        Meeting savedMeeting = meetingRepo.save(meeting);

        // Chuyển entity sang DTO
        MeetingDto meetingDto = new MeetingDto();
        meetingDto.setId(savedMeeting.getId());
        meetingDto.setCode(savedMeeting.getCode());
        meetingDto.setTitle(savedMeeting.getTitle());
        meetingDto.setStartTime(savedMeeting.getStartTime());
        meetingDto.setEndTime(savedMeeting.getEndTime());
        meetingDto.setCreateAt(savedMeeting.getCreateAt());
        meetingDto.setHostId(savedMeeting.getUser().getId());

        meetings.put(savedMeeting.getCode(), meetingDto);

        // Thêm host vào danh sách người tham gia
        addParticipant(savedMeeting.getCode(), hostId);

        return meetingDto;

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


    public Meeting convertToEntity(MeetingDto dto) {
        Set<User> users = dto.getUser().stream()
                .map(id -> userRepo.findById(id)
                        .orElseThrow(() -> new RuntimeException("User not found: " + id)))
                .collect(Collectors.toSet());

        Meeting meeting = new Meeting();
        meeting.setId(dto.getId());
        meeting.setCode(dto.getCode());
        meeting.setTitle(dto.getTitle());
        meeting.setActive(dto.getActive());
        meeting.setStartTime(dto.getStartTime());
        meeting.setEndTime(dto.getEndTime());
        meeting.setCreateAt(dto.getCreateAt());
        return meeting;
    }

}
