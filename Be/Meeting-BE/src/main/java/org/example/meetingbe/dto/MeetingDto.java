package org.example.meetingbe.dto;

import jakarta.persistence.*;
import org.example.meetingbe.model.User;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

public class MeetingDto {
    private Long id;
    private String code;
    private String title;
    private Boolean isActive;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long hostId;
    private LocalDateTime createAt = LocalDateTime.now();
    private Set<Long> user = new HashSet<>();

    public MeetingDto() {
    }

    public MeetingDto(Long id, String code, String title, Boolean isActive, LocalDateTime startTime, LocalDateTime endTime, LocalDateTime createAt, Set<Long> user) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.isActive = isActive;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createAt = createAt;
        this.user = user;
    }

    public Long getHostId() {
        return hostId;
    }

    public void setHostId(Long hostId) {
        this.hostId = hostId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public Set<Long> getUser() {
        return user;
    }

    public void setUser(Set<Long> user) {
        this.user = user;
    }
}
