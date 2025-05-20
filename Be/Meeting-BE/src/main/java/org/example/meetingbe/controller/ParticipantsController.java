package org.example.meetingbe.controller;

import org.example.meetingbe.model.Contact;
import org.example.meetingbe.model.Participants;
import org.example.meetingbe.repository.IMeetingRepo;
import org.example.meetingbe.repository.IUserRepo;
import org.example.meetingbe.service.meeting.MeetingService;
import org.example.meetingbe.service.participants.ParticipantsService;
import org.example.meetingbe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/participants")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ParticipantsController {
    @Autowired
    private ParticipantsService participantsService;
    @Autowired
    private IUserRepo userService;
    @Autowired
    private IMeetingRepo meetingService;
    @PutMapping("/leave")
    public Participants leaveMeeting(@RequestParam Long userId, @RequestParam Long meetingId) {
        Participants participant =  participantsService.findByUserIdAndMeetingId(userId, meetingId);
        participant.setLeftAt(LocalDateTime.now());
        participantsService.save(participant);
        return participant;
    }

    @GetMapping("/getPageParticipants")
    public ResponseEntity<Page<Participants>> getPageContactTrue(
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size",defaultValue = "5") int size,
            @RequestParam(name = "sort",defaultValue = "join_at,asc") String[] sort
    ) {
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort[0]));

        Page<Participants> participants = participantsService.getAll(pageable);
        return ResponseEntity.ok(participants);
    }

    @PostMapping
    public Participants addNew(@RequestParam("userName") String userName, @RequestParam("meetingCode") String meetingCode){
        Participants participants = new Participants(LocalDateTime.now(),LocalDateTime.now(),meetingService.findByCode(meetingCode),userService.findByUserName(userName));
        participantsService.save(participants);
        return participants;
    }

}
