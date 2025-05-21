package org.example.meetingbe.service.user;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.*;
import org.example.meetingbe.model.Contact;
import org.example.meetingbe.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    void register(Register register) throws MessagingException;

    Boolean exitsByUsername(String username);

    Boolean exitsByEmail(String email);

    Optional<User> findByEmail(String email);
    Page<User> getAllByStatusTrue(Pageable pageable);
    Page<User> getAllByStatusFalse(Pageable pageable);
    User getUserById(Long userId);
    User updateUser(Long id, UserDto updatedUser);
    boolean deleteUser(Long userId);
    Page<User> findBy(Pageable pageable);
    long countTotalUsers(int year);
    long countVipUsers();
    List<User> getVipUsers();
    List<User> getNormalUsers();
    List<Integer> getAllYears();
    List<User> getAllByYear(int year);
    List<MonthlyUserCountDTO> getUserRegistrationsByYear(int year);
    UserEditTO getByUsername(String username);

    User updateProfile(Long id,UserEditTO userEditTO);
}
