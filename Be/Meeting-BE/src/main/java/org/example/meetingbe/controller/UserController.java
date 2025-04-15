package org.example.meetingbe.controller;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.Login;
import org.example.meetingbe.dto.LoginForm;
import org.example.meetingbe.dto.Register;
import org.example.meetingbe.response.JwtResponse;
import org.example.meetingbe.response.ResponseMessage;
import org.example.meetingbe.security.jwt.JwtTokenProvider;
import org.example.meetingbe.security.userpricipal.UserPrinciple;
import org.example.meetingbe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import org.example.meetingbe.dto.UserDto;
import org.example.meetingbe.model.User;
import org.example.meetingbe.service.user.IUserService;
import org.example.meetingbe.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
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




    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Register register) throws MessagingException {
        if(userService.exitsByUsername(register.getUserName()) || userService.exitsByEmail(register.getEmail())){
            return new ResponseEntity<>(new ResponseMessage("Tài khoản hoặc Email đã tồn tại"), HttpStatus.CONFLICT);
        }
        userService.register(register);
        return  new ResponseEntity<>(new ResponseMessage("Tạo tài khoản thành công"), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm login){
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(login.getUserName(), login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);
            UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
            LocalDateTime time = LocalDateTime.now();
            return new ResponseEntity<>(new JwtResponse(token, userPrinciple.getUsername(), userPrinciple.getAuthorities(), time), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Tài khoản hoặc mật khẩu không đúng"), HttpStatus.UNAUTHORIZED);
        }
    }
}
