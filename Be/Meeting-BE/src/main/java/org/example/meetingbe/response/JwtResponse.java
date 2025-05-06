package org.example.meetingbe.response;

import org.example.meetingbe.model.Role;
import org.springframework.security.core.GrantedAuthority;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Set;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String name;
    private Collection<? extends GrantedAuthority> roles;
    private LocalDateTime createdTime;
    public JwtResponse() {
    }



    public JwtResponse(String token, String name, Collection<? extends GrantedAuthority> roles) {
        this.token = token;

        this.name = name;

        this.roles = roles;
    }

    public JwtResponse(String token, String name, Collection<? extends GrantedAuthority> roles, LocalDateTime createdTime) {
        this.token = token;
        this.name = name;
        this.roles = roles;
        this.createdTime = createdTime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Collection<? extends GrantedAuthority> getRoles() {
        return roles;
    }

    public void setRoles(Collection<? extends GrantedAuthority> roles) {
        this.roles = roles;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }
}
