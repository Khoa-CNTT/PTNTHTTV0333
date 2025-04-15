package org.example.meetingbe.dto;

import org.example.meetingbe.model.Role;

import java.time.LocalDateTime;
import java.util.Set;
public class UserDto {
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String userName;
    private Boolean isVip;
    private String avatar;
    private LocalDateTime createAt;
    private Set<Role> roleIds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public Set<Role> getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(Set<Role> roleIds) {
        this.roleIds = roleIds;
    }
}
