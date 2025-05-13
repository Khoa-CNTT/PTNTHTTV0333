package org.example.meetingbe.service.user;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.MonthlyUserCountDTO;
import org.example.meetingbe.dto.Register;
import org.example.meetingbe.dto.UserNameDTO;
import org.example.meetingbe.model.Contact;
import org.example.meetingbe.model.Role;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IRoleRepo;
import jakarta.persistence.EntityNotFoundException;
import org.example.meetingbe.dto.UserDto;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IUserRepo;
import org.example.meetingbe.service.mailSender.MailRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
        User user = new User("local", false, register.getUserName(), passwordEncoder.encode(register.getPassword()),register.getEmail(), role);
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

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    @Override
    public User getUserById(Long userId) {
        return userRepo.findById(userId).get();
    }

    @Override
    public User updateUser(Long id, UserDto updatedUser) {
        if (userRepo.existsById(id)) {
            return userRepo.save(dtoToObject(updatedUser));
        } else {
            throw new EntityNotFoundException("User with id " + id + " not found");
        }
    }

    @Override
    public boolean deleteUser(Long userId) {
        if (userRepo.existsById(userId)){
            userRepo.updateStatusUser(userRepo.findById(userId).get().getId());
            return true;
        }
        return false;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public Page<User> findBy(Pageable pageable) {
        Page<User> users = userRepo.findBy(pageable);
        return users;
    }


    @Override
    public long countTotalUsers(int year) {
        Long count =userRepo.countByYear(year);
        return count != null ? count : 0L;
    }

    @Override
    public long countVipUsers() {
        Long count = userRepo.countByIsVipTrue();
        return count != null ? count : 0L;
    }

    @Override
    public List<User> getVipUsers() {
        return userRepo.getAllByIsVipTrue();
    }

    @Override
    public List<User> getNormalUsers() {
        return userRepo.getAllByIsVipFalse();
    }
    public List<Integer> getAllYears() {
        return userRepo.findAllYears();
    }

    @Override
    public List<User> getAllByYear(int year) {
        return userRepo.getAllByYear(year);
    }
    public List<MonthlyUserCountDTO> getUserRegistrationsByYear(int year) {
        List<Object[]> resultList = userRepo.countRegistrationsByMonth(year);
        List<MonthlyUserCountDTO> monthlyCounts = new ArrayList<>();

        long[] counts = new long[13];

        for (Object[] row : resultList) {
            Integer month = (Integer) row[0];
            Long count = ((Number) row[1]).longValue();
            counts[month] = count;
        }

        for (int i = 1; i <= 12; i++) {
            monthlyCounts.add(new MonthlyUserCountDTO(i, counts[i]));
        }

        return monthlyCounts;
    }

    @Override
    public UserNameDTO getByUsername(String username) {
        User user = userRepo.findByUserName(username);
        UserNameDTO userDto = new UserNameDTO();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setAvatar(user.getAvatar());
        userDto.setVip(user.getVip());
        userDto.setCreateAt(user.getCreateAt());
        return userDto;
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
