package org.example.meetingbe.service.meeting;

import org.example.meetingbe.model.ChatMessage;
import org.example.meetingbe.model.Meeting;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IMeetingService {
    Meeting findById(Long id);
}
