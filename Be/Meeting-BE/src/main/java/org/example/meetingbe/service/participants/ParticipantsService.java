package org.example.meetingbe.service.participants;

import org.example.meetingbe.model.Contact;
import org.example.meetingbe.model.Participants;
import org.example.meetingbe.repository.IParticipantsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ParticipantsService implements IParticipantsService {
    @Autowired
    private IParticipantsRepo participantsRepo;

    @Override
    public Participants findByUserIdAndMeetingId(Long userId, Long meetingId) {
        return participantsRepo.findByUserIdAndMeetingId(userId,meetingId);
    }

    @Override
    public void save(Participants participants) {
        participantsRepo.save(participants);
    }

    @Override
    public Page<Participants> getAll(Pageable pageable) {
        Page<Participants> participants = participantsRepo.findBy(pageable);
        return participants;
    }

    @Override
    public Page<Participants> findAllByUserId( Long id,Pageable pageable) {
        Page<Participants> participants = participantsRepo.findAllByUserId(id,pageable);
        if (participants == null){
           throw new  ResponseStatusException(HttpStatus.BAD_REQUEST, "Participant cant be null");
        }
        return participants;
    }
}
