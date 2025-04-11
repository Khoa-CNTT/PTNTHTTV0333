package org.example.meetingbe.repository;

import org.example.meetingbe.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IChatMessageRepo extends JpaRepository<ChatMessage, Long> {
}
