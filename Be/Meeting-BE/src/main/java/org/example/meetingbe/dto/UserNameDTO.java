package org.example.meetingbe.dto;

import org.example.meetingbe.model.User;

import java.time.LocalDateTime;

public class UserNameDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String userName;
    private Boolean isVip;
    private String avatar;
    private LocalDateTime createAt;

    public UserNameDTO(Long id, String email, String firstName, String lastName, String userName, Boolean isVip, String avatar, LocalDateTime createAt) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.isVip = isVip;
        this.avatar = avatar;
        this.createAt = createAt;
    }

    public UserNameDTO() {
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Boolean getVip() {
        return isVip;
    }

    public void setVip(Boolean vip) {
        isVip = vip;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }
}
