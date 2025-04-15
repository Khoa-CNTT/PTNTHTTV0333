package org.example.meetingbe.repository;

import org.example.meetingbe.model.Participants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IParticipantsRepo extends JpaRepository<Participants, Long> {
}
