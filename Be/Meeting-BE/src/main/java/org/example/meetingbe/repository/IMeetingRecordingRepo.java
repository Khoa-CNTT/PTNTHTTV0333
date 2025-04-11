package org.example.meetingbe.repository;

import org.example.meetingbe.model.MeetingRecording;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMeetingRecordingRepo extends JpaRepository<MeetingRecording, Long> {
}
