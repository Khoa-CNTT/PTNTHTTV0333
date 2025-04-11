package org.example.meetingbe.service.chatMessage;

import org.example.meetingbe.repository.IChatMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageService implements IChatMessageService {
    @Autowired
    private IChatMessageRepo chatMessageRepo;
}
