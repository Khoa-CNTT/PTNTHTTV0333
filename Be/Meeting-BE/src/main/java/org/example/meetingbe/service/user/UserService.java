package org.example.meetingbe.service.user;

import org.example.meetingbe.repository.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepo userRepo;
}
