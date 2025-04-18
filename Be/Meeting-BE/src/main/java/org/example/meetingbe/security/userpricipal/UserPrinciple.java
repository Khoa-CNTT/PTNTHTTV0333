package org.example.meetingbe.security.userpricipal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.example.meetingbe.dto.Login;
import org.example.meetingbe.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public class UserPrinciple implements UserDetails {
    private Long id;
    @JsonIgnore
    private String userName;
    @JsonIgnore
    private String password;
    private User user;
    public UserPrinciple(Login login) {}
    public UserPrinciple(User user) {}
    public Collection<? extends GrantedAuthority> authorities;
    public UserPrinciple(Long id, String userName, String password, Collection<? extends GrantedAuthority> authorities) {
        super();
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.authorities = authorities;
    }
    public static UserPrinciple create(Login login) {
        List<GrantedAuthority> authorities = login.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());
        return new UserPrinciple(
                login.getId(),
                login.getUsername(),
                login.getPassword(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        if("google".equals(user.getProvider())){
            return "";
        }
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
