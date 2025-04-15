package org.example.meetingbe.service.user;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.Register;

public interface IUserService {
    void register(Register register) throws MessagingException;

    Boolean exitsByUsername(String username);

    Boolean exitsByEmail(String email);
}
