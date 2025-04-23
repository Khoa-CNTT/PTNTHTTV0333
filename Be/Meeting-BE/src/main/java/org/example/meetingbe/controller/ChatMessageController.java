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
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class ChatMessageController {

    @MessageMapping("chat.sendMessage")  // Maps messages sent to "chat.sendMessage" WebSocket destination
    @SendTo("/topic/public")  // Specifies that the return message will be sent to "/topic/public"
    public WsChatMessage sendMessage(@Payload WsChatMessage msg) {
        // Log the sender and content of the message for debugging
        System.out.println("Message received from " + msg.getSender() + ": " + msg.getContent());

        // Broadcast the message to all subscribers on the "/topic/public" topic
        return msg;
    }

    @MessageMapping("chat.addUser")  // Maps messages sent to "chat.addUser" WebSocket destination
    @SendTo("/topic/chat")  // Specifies that the return message will be sent to "/topic/chat"
    public WsChatMessage addUser(@Payload WsChatMessage msg, SimpMessageHeaderAccessor headerAccessor) {
        // Store the username in the WebSocket session attributes
        headerAccessor.getSessionAttributes().put("username", msg.getSender());

        // Log when a user joins the chat
        System.out.println("User joined: " + msg.getSender());

        // Broadcast the user join event to all subscribers on the "/topic/chat" topic
        return msg;
    }

}
