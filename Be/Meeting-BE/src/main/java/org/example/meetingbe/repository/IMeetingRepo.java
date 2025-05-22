package org.example.meetingbe.repository;

import org.example.meetingbe.model.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IMeetingRepo extends JpaRepository<Meeting, Long> {

    Meeting findByCode(String code);
}
