package org.example.meetingbe.dto;

import org.example.meetingbe.model.User;

import java.time.LocalDate;

public class ContactDto {
    private Long id;
    private String content;
    private LocalDate dateSend;
    private Boolean status;
    private User user;

    public ContactDto() {
    }


    public ContactDto(Long id, String content, LocalDate dateSend, Boolean status, User user) {
        this.id = id;
        this.content = content;
        this.dateSend = dateSend;
        this.status = status;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDate getDateSend() {
        return dateSend;
    }

    public void setDateSend(LocalDate dateSend) {
        this.dateSend = dateSend;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
