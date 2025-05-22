package org.example.meetingbe.service.schedule;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.ScheduleDto;
import org.example.meetingbe.model.Schedule;

public interface IScheduleService {
    Schedule addNewSchedule(ScheduleDto schedule, String userName) throws MessagingException;
}
