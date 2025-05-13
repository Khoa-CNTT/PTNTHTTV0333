package org.example.meetingbe.service.chatMessage;

import org.example.meetingbe.model.ChatMessage;
import org.example.meetingbe.repository.IChatMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatMessageService {
    @Autowired
    private IChatMessageRepo chatMessageRepository;

    public void saveChatMessage(String roomId, String senderId, String message) {
        ChatMessage chatMessage = new ChatMessage(roomId, senderId, message, LocalDateTime.now());
        chatMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getChatHistory(String roomId) {
        return chatMessageRepository.findByRoomIdOrderByTimestampAsc(roomId);
    }
}
