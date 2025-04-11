package org.example.meetingbe.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class MeetingRecording {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime uploadAt;
    @Column(columnDefinition = "TEXT")
    private String recordUrl;
    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    public MeetingRecording() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getUploadAt() {
        return uploadAt;
    }

    public void setUploadAt(LocalDateTime uploadAt) {
        this.uploadAt = uploadAt;
    }

    public String getRecordUrl() {
        return recordUrl;
    }

    public void setRecordUrl(String recordUrl) {
        this.recordUrl = recordUrl;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }
}
