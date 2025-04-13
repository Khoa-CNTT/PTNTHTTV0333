package org.example.meetingbe.repository;

import org.example.meetingbe.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IRoleRepo extends JpaRepository<Role, Long> {
    Set<Role> findByRoleName(String name);
}
