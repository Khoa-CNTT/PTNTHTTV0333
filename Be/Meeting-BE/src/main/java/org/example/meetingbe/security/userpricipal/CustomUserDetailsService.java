package org.example.meetingbe.security.userpricipal;

import org.example.meetingbe.dto.Login;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private IUserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepo.findByUserName(userName);
        Login login = new Login(user.getId(), user.getUserName(), user.getPassword(), user.getRoles());
        if (login == null) {
            throw new UsernameNotFoundException("Not found user with username " + userName);
        }
        return UserPrinciple.create(login);
    }
}
