package org.example.meetingbe.model;

import jakarta.persistence.*;
import org.example.meetingbe.dto.MeetingDto;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "varchar(12)")
    private String code;
    @Column(columnDefinition = "varchar(50)")
    private String title;
    @Column(name = "is_active", columnDefinition = "BIT")
    @ColumnDefault("0")
    private Boolean isActive;
    @Column(name = "start_time", columnDefinition = "DATETIME")
    private LocalDateTime startTime;
    @Column(name = "end_time", columnDefinition = "DATETIME")
    private LocalDateTime endTime;
    @Column(name = "create_at", columnDefinition = "DATETIME")
    private LocalDateTime createAt;
    @ManyToOne
    @JoinColumn(name = "host_id")
    private User user;

    public Meeting() {
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
