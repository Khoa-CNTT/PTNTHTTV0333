package org.example.meetingbe.repository;

import org.example.meetingbe.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepo extends JpaRepository<User, Long> {
    User findByUserName(String userName);

    Boolean existsByUserName(String userName);
    Boolean existsByEmail(String email);
}
