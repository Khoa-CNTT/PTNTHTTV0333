package org.example.meetingbe.service.participants;

import org.example.meetingbe.repository.IParticipantsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParticipantsService implements IParticipantsService {
    @Autowired
    private IParticipantsRepo participantsRepo;
}
