package org.example.meetingbe.service.schedule;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.ScheduleDto;
import org.example.meetingbe.model.Schedule;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IScheduleRepo;
import org.example.meetingbe.repository.IUserRepo;
import org.example.meetingbe.service.mailSender.MailRegister;
import org.example.meetingbe.service.meeting.IMeetingService;
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
    @Autowired
    private IMeetingService meetingService;
    @Override
    public Schedule addNewSchedule(ScheduleDto schedule, String userName) throws MessagingException {
        User user = userRepo.findByUserName(userName);
        Schedule newSchedule = new Schedule();
        newSchedule.setTitle(schedule.getTitle());
        newSchedule.setScheduleTime(schedule.getCreateAt());
        newSchedule.setUser(user);
        String roomCode = meetingService.createRoomSchedule(user.getId(), schedule);
        String roomLink = "http://localhost:4200/pages/components/meeting-room/" + roomCode;
        mailRegister.sendSchedule(schedule.getEmail(), schedule.getTitle(), schedule.getCreateAt(), roomLink);
        return scheduleRepo.save(newSchedule);
    }
}
