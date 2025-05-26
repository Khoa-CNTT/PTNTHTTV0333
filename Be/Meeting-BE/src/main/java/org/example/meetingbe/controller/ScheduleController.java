package org.example.meetingbe.controller;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.ScheduleDto;
import org.example.meetingbe.model.Schedule;
import org.example.meetingbe.response.ResponseMessage;
import org.example.meetingbe.service.schedule.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class ScheduleController {
    @Autowired
    private IScheduleService scheduleService;
    @PostMapping("/submit")
    public ResponseEntity<?> submitSchedule(@RequestBody ScheduleDto schedule) throws MessagingException {
        scheduleService.addNewSchedule(schedule,schedule.getUserName());
        return ResponseEntity.ok(new ResponseMessage("Tạo lịch hẹn thành công"));
    }
}
