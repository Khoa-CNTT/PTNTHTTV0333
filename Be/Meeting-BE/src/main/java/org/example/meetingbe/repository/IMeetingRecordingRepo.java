package org.example.meetingbe.repository;

import org.example.meetingbe.model.MeetingRecording;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IMeetingRecordingRepo extends JpaRepository<MeetingRecording, Long> {
    Optional<MeetingRecording> findByMeetingId(Long meetingId);


}
