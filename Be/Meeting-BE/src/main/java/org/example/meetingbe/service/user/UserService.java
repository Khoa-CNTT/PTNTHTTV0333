package org.example.meetingbe.service.user;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.Register;
import org.example.meetingbe.model.Role;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IRoleRepo;
import org.example.meetingbe.repository.IUserRepo;
import org.example.meetingbe.service.mailSender.MailRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepo userRepo;
    @Autowired
    private IRoleRepo roleRepo;
    @Autowired
    private MailRegister mailRegister;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public void register(Register register) throws MessagingException {
        Set<Role> role = roleRepo.findByRoleName("USER");
        User user = new User(register.getEmail(), register.getFirstName(), passwordEncoder.encode(register.getPassword()), register.getLastName(),register.getUserName(), role);
        userRepo.save(user);
        mailRegister.sendEmailRegister(register.getEmail());
    }

    @Override
    public Boolean exitsByUsername(String username) {
        return userRepo.existsByUserName(username);
    }

    @Override
    public Boolean exitsByEmail(String email) {
        return userRepo.existsByEmail(email);
    }
}
