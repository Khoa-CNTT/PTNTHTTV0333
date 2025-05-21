package org.example.meetingbe.controller;

import org.example.meetingbe.model.Contact;
import org.example.meetingbe.model.Meeting;
import org.example.meetingbe.model.Participants;
import org.example.meetingbe.model.User;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public Participants leaveMeeting(@RequestParam("userName") String userName, @RequestParam("meetingCode") String meetingCode) {
        User user = userService.findByUserName(userName);
        Meeting meeting = meetingService.findByCode(meetingCode);
        Participants participant = participantsService.findByUserIdAndMeetingId(user.getId(), meeting.getId());
        if (participant == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Participant does not exist");
        }
        if (participant.getLeftAt() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Participant has already left");
        }
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
    @GetMapping("/getAllByUserId")
    public ResponseEntity<Page<Participants>> getAllByUserId(
            @RequestParam("userId") Long id,
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size",defaultValue = "5") int size,
            @RequestParam(name = "sort",defaultValue = "leftAt,desc") String[] sort
    ) {
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort[0]));

        Page<Participants> participants = participantsService.findAllByUserId(id,pageable);
        return ResponseEntity.ok(participants);
    }

    @PostMapping
    public Participants addNew(@RequestParam("userName") String userName, @RequestParam("meetingCode") String meetingCode){
        User user = userService.findByUserName(userName);
        Meeting meeting = meetingService.findByCode(meetingCode);
        Participants participant =participantsService.findByUserIdAndMeetingId(user.getId(), meeting.getId());
        if (participant != null) {
            return participant;
        }
        participant = new Participants(LocalDateTime.now(),null,meeting,user);
        participantsService.save(participant);
        return participant;
    }

}
