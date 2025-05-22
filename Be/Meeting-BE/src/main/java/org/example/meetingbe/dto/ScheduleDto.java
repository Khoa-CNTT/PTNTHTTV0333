package org.example.meetingbe.dto;

import java.time.LocalDateTime;

public class ScheduleDto {
    private String email;
    private String title;
    private LocalDateTime createAt;
    private String userName;

    public ScheduleDto(String email, String title, LocalDateTime createAt, String userName) {
        this.email = email;
        this.title = title;
        this.createAt = createAt;
        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }
}
