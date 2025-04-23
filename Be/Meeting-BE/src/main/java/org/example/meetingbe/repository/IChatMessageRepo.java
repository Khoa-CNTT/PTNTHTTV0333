package org.example.meetingbe.repository;

import org.example.meetingbe.model.ChatMessage;
import org.example.meetingbe.model.Meeting;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IChatMessageRepo extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findAllByMeeting(Meeting meeting);


}
