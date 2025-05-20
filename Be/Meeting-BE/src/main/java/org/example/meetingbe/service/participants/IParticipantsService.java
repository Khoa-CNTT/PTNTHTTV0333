package org.example.meetingbe.service.participants;

import org.example.meetingbe.model.Participants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IParticipantsService {
    Participants findByUserIdAndMeetingId(Long userId, Long meetingId);
    void save(Participants participants);
    Page<Participants> getAll(Pageable pageable);

}
