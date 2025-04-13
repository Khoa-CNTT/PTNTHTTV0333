package org.example.meetingbe.repository;

import org.example.meetingbe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IUserRepo extends JpaRepository<User, Long> {
    long countByIsVipTrue();
    List<User> getAllByIsVipTrue();
    List<User> getAllByIsVipFalse();
}
