package org.example.meetingbe.service.user;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.MonthlyUserCountDTO;
import org.example.meetingbe.dto.Register;
import org.example.meetingbe.dto.UserDto;
import org.example.meetingbe.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    void register(Register register) throws MessagingException;

    Boolean exitsByUsername(String username);

    Boolean exitsByEmail(String email);

    Optional<User> findByEmail(String email);

    User getUserById(Long userId);
    User updateUser(Long userId, UserDto updatedUser);
    boolean deleteUser(Long userId);
    List<User> getAllUsers();

    long countTotalUsers(int year);
    long countVipUsers();
    List<User> getVipUsers();
    List<User> getNormalUsers();
    List<Integer> getAllYears();
    List<User> getAllByYear(int year);
    List<MonthlyUserCountDTO> getUserRegistrationsByYear(int year);

}
