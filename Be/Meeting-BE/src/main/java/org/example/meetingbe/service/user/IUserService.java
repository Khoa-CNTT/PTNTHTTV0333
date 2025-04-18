package org.example.meetingbe.service.user;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.Register;
import org.example.meetingbe.model.User;

import java.util.Optional;

public interface IUserService {
    void register(Register register) throws MessagingException;

    Boolean exitsByUsername(String username);

    Boolean exitsByEmail(String email);

    Optional<User> findByEmail(String email);
}
