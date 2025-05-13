package org.example.meetingbe.model;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "varchar(50)")
    private String email;
    @Column(columnDefinition = "varchar(255)")
    private String password;
    @Column(columnDefinition = "varchar(50)")
    private String firstName;
    @Column(columnDefinition = "varchar(50)")
    private String lastName;
    @Column(columnDefinition = "varchar(50)")
    private String userName;
    @Column(name = "is_vip", columnDefinition = "BIT")
    @ColumnDefault("0")
    private Boolean isVip;
    @Column(name = "avater", columnDefinition = "TEXT")
    private String avatar;
    @Column(name = "provider", columnDefinition = "varchar(20)")
    private String provider;
    @Column(name = "create_at", columnDefinition = "DATETIME")
    private LocalDateTime createAt;
    @Column(name = "status", columnDefinition = "BIT")
    private Boolean status = false;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    Set<Role> roles = new HashSet<>();
    public User() {
    }

    public User(String email, String firstName, String password, String lastName, String userName, Set<Role> roles, String provider) {
        this.email = email;
        this.firstName = firstName;
        this.password = password;
        this.lastName = lastName;
        this.userName = userName;
        this.roles = roles;
        this.provider = provider;
    }

    public User(String email, String password, String firstName, String lastName, String userName, Boolean isVip, String avatar, String provider, LocalDateTime createAt, Boolean status, Set<Role> roles) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.isVip = isVip;
        this.avatar = avatar;
        this.provider = provider;
        this.createAt = createAt;
        this.status = status;
        this.roles = roles;
    }

    public User(String provider, Boolean isVip, String userName, String password, String email, Set<Role> roles) {
        this.provider = provider;
        this.isVip = isVip;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.roles = roles;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

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

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
