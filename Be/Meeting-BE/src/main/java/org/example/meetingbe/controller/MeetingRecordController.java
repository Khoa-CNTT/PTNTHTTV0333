package org.example.meetingbe.controller;

import org.example.meetingbe.model.MeetingRecording;
import org.example.meetingbe.repository.IMeetingRecordingRepo;
import org.example.meetingbe.service.meetingRecording.IMeetingRecordingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/meetingRecord")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class MeetingRecordController {
    @Autowired
    IMeetingRecordingService meetingRecordingService;
    @GetMapping("/{meetingId}")
    public MeetingRecording findByMeetingId(@PathVariable("meetingId") Long id){
        return meetingRecordingService.findByMeetingId(id);
    }

    @PostMapping("/")
    public MeetingRecording addNewRecord(@RequestBody MeetingRecording meetingRecording){
        return meetingRecordingService.addNewRecord(meetingRecording);
    }

}
