package org.example.meetingbe.controller;

import org.example.meetingbe.model.ChatMessage;
import org.example.meetingbe.model.Meeting;
import org.example.meetingbe.repository.IChatMessageRepo;
import org.example.meetingbe.repository.IMeetingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class ChatMessageController {
    @Autowired
    private SimpMessagingTemplate template;
    @Autowired
    private IChatMessageRepo chatMessageRepo;
    @Autowired
    private IMeetingRepo meetingRepo;

    @MessageMapping("/messages")
    public void handleMessage(ChatMessage message) {
        message.setSendAt(LocalDateTime.now());
        chatMessageRepo.save(message);
        template.convertAndSend("/meeting/chat/" + message.getMeeting().getId(), message);
    }
    @GetMapping(value = "/messages/{channelId}")
    public List<ChatMessage> findMessages(@PathVariable("meetingId") Long meetingId) {
        Meeting meeting = meetingRepo.findById(meetingId).get();
        return chatMessageRepo.findAllByMeeting(meeting);
    }

}
