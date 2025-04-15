package org.example.meetingbe.repository;

import org.example.meetingbe.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IScheduleRepo extends JpaRepository<Schedule, Long> {
}
