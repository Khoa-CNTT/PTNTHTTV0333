package org.example.meetingbe.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Entity
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(columnDefinition = "DATE")
    private LocalDate dateSend;
    @Column(columnDefinition = "BIT")
    @ColumnDefault("0")
    private Boolean status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Contact() {
    }

    public Contact(Long id, String content, LocalDate dateSend, Boolean status, User user) {
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
