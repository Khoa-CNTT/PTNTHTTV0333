package org.example.meetingbe.controller;

import org.example.meetingbe.dto.UserDto;
import org.example.meetingbe.model.User;
import org.example.meetingbe.service.user.IUserService;
import org.example.meetingbe.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class UserController {
    @Autowired
    private IUserService userService;
    // Lấy tất cả người dùng
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Lấy thông tin người dùng theo ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Cập nhật người dùng
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody UserDto userDTO) {
        return userService.updateUser(id, userDTO);
    }

    // Xoá người dùng
    @DeleteMapping("/{id}")
    public boolean deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }

    // Đếm tổng số người dùng
    @GetMapping("/count")
    public long countTotalUsers() {
        return userService.countTotalUsers();
    }

    // Đếm số người dùng VIP
    @GetMapping("/count/vip")
    public long countVipUsers() {
        return userService.countVipUsers();
    }
    @GetMapping("/vip")
    public List<User> getVipUsers() {
        return userService.getVipUsers();
    }
    @GetMapping("/normal")
    public List<User> getNormalUsers() {
        return userService.getNormalUsers();
    }

}
