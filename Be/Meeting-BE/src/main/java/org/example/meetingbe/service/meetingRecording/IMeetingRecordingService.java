package org.example.meetingbe.service.meetingRecording;

import org.example.meetingbe.dto.MeetingRecordingDto;
import org.example.meetingbe.model.MeetingRecording;

public interface IMeetingRecordingService {
    MeetingRecording findByMeetingId(Long id);
    MeetingRecording addNewRecord(MeetingRecording meetingRecording);
    public MeetingRecording addOrUpdateMeetingRecord(MeetingRecordingDto dto);

}
