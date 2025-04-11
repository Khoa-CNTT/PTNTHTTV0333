package org.example.meetingbe.repository;

import org.example.meetingbe.model.MeetingSummaries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMeetingSummariesRepo extends JpaRepository<MeetingSummaries, Long> {
}
