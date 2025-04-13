package org.example.meetingbe.service.user;

import jakarta.persistence.EntityNotFoundException;
import org.example.meetingbe.dto.UserDto;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepo userRepo;

    @Override
    public User getUserById(Long userId) {
        return userRepo.findById(userId).get();
    }

    @Override
    public User updateUser(Long userId, UserDto updatedUser) {
        if (userRepo.existsById(userId)) {
            return userRepo.save(dtoToObject(updatedUser));
        } else {
            throw new EntityNotFoundException("Product with id " + userId + " not found");
        }
    }

    @Override
    public boolean deleteUser(Long userId) {
        if (userRepo.existsById(userId)){
            userRepo.delete(userRepo.findById(userId).get());
            return true;
        }
        return false;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }


    @Override
    public long countTotalUsers() {
        return userRepo.count();
    }

    @Override
    public long countVipUsers() {
        return userRepo.countByIsVipTrue();
    }

    @Override
    public List<User> getVipUsers() {
        return userRepo.getAllByIsVipTrue();
    }

    @Override
    public List<User> getNormalUsers() {
        return userRepo.getAllByIsVipFalse();
    }

    public User dtoToObject(UserDto dto){
        User user = new User();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setUserName(dto.getUserName());
        user.setVip(dto.getVip());
        user.setAvatar(dto.getAvatar());
        user.setCreateAt(dto.getCreateAt() != null ? dto.getCreateAt() : LocalDateTime.now());
        user.setRoles(dto.getRoleIds());
        return user;
    }

}
