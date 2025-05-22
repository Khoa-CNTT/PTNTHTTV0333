package org.example.meetingbe.service.schedule;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.ScheduleDto;
import org.example.meetingbe.model.Schedule;
import org.example.meetingbe.repository.IScheduleRepo;
import org.example.meetingbe.repository.IUserRepo;
import org.example.meetingbe.service.mailSender.MailRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService implements IScheduleService {
    @Autowired
    private IScheduleRepo scheduleRepo;
    @Autowired
    private IUserRepo userRepo;
    @Autowired
    private MailRegister mailRegister;
    @Override
    public Schedule addNewSchedule(ScheduleDto schedule, String userName) throws MessagingException {
        Schedule newSchedule = new Schedule();
        newSchedule.setTitle(schedule.getTitle());
        newSchedule.setScheduleTime(schedule.getCreateAt());
        newSchedule.setUser(userRepo.findByUserName(userName));
        mailRegister.sendSchedule(schedule.getEmail());
        return scheduleRepo.save(newSchedule);
    }
}
