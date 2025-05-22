package org.example.meetingbe.dto;

import java.time.LocalDateTime;

public class ScheduleDto {
    private String email;
    private String title;
    private LocalDateTime createAt;

    public ScheduleDto(String email, String title, LocalDateTime createAt) {
        this.email = email;
        this.title = title;
        this.createAt = createAt;
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
