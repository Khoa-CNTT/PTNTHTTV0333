package org.example.meetingbe.repository;

import org.example.meetingbe.model.Contact;
import org.example.meetingbe.model.Meeting;
import org.example.meetingbe.model.Participants;
import org.example.meetingbe.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IParticipantsRepo extends JpaRepository<Participants, Long> {
    Participants findByUserIdAndMeetingId(Long userId, Long meetingId);
    Page<Participants> findBy(Pageable pageable);
    Page<Participants> findAllByUserId(Long id,Pageable pageable);

    Optional<Participants> findByMeetingAndUser(Meeting meeting, User user);


}
