package org.example.meetingbe.service.role;

import org.example.meetingbe.repository.IRoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements IRoleService {
    @Autowired
    private IRoleRepo roleRepo;
}
