package org.example.meetingbe.controller;

import org.example.meetingbe.model.ChatMessage;
import org.example.meetingbe.service.chatMessage.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class ChatMessageController {

    @Autowired
    private ChatMessageService chatService;
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

//    @MessageMapping("/chat.addUser")
//    @SendTo("/topic/public")
//    public ChatMessage addUser(@Payload ChatMessage chatMessage,
//                               SimpMessageHeaderAccessor headerAccessor) {
//        // Add username in web socket session
//        headerAccessor.getSessionAttributes().put("username", chatMessage.getUser());
//        return chatMessage;
//    }



    @GetMapping("/{roomId}")
    public List<ChatMessage> getChatHistory(@PathVariable String roomId) {
        return chatService.getChatHistory(roomId);
    }
}
