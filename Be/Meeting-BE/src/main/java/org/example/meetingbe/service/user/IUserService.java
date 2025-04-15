package org.example.meetingbe.service.user;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.Register;

import org.example.meetingbe.dto.UserDto;
import org.example.meetingbe.model.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface IUserService {
    void register(Register register) throws MessagingException;

    Boolean exitsByUsername(String username);

    Boolean exitsByEmail(String email);
    User getUserById(Long userId);
    User updateUser(Long userId, UserDto updatedUser);
    boolean deleteUser(Long userId);
    List<User> getAllUsers();

    long countTotalUsers();
    long countVipUsers();
    List<User> getVipUsers();
    List<User> getNormalUsers();

}
