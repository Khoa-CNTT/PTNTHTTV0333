package org.example.meetingbe.controller;

import org.example.meetingbe.dto.MeetingDto;
import org.example.meetingbe.service.meeting.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @PostMapping("/meetings")
    public MeetingDto createRoom(@RequestBody Map<String, Long> request) {
        Long hostId = request.get("hostId"); // Lấy hostId từ body request
        return meetingService.createRoom(hostId);
    }

    @GetMapping("/{roomId}")
    public MeetingDto getRoom(@PathVariable String roomId) {
        return meetingService.getRoom(roomId);
    }

    @PostMapping("/{roomId}/join")
    public void joinRoom(@PathVariable String roomId, @RequestBody Long userId) {
        meetingService.addParticipant(roomId, userId);
    }
}
