package org.example.meetingbe.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.LoginForm;
import org.example.meetingbe.dto.Register;
import org.example.meetingbe.dto.UserDto;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IUserRepo;
import org.example.meetingbe.response.JwtResponse;
import org.example.meetingbe.response.ResponseMessage;
import org.example.meetingbe.security.jwt.JwtTokenProvider;
import org.example.meetingbe.security.userpricipal.UserPrinciple;
import org.example.meetingbe.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class UserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Value("${google.client-id}")
    private String googleClientId;
    @Autowired
    private IUserRepo userRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Register register) throws MessagingException {
        if (userService.exitsByUsername(register.getUserName()) || userService.exitsByEmail(register.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Tài khoản hoặc Email đã tồn tại"), HttpStatus.CONFLICT);
        }
        userService.register(register);
        return new ResponseEntity<>(new ResponseMessage("Tạo tài khoản thành công"), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm login) {
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

    @PostMapping("/google")
    public ResponseEntity<?> loginOrRegisterWithGoogle(@RequestBody Map<String, String> body) {
        String idTokenString = body.get("idToken");

        GoogleIdToken idToken = verifyGoogleToken(idTokenString);
        if (idToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Google token");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        System.out.println("name:" + name);
        // Kiểm tra user
        Optional<User> optionalUser = userService.findByEmail(email);
        Boolean existsEmail = userService.exitsByEmail(email);
        User user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            if (!"google".equals(user.getProvider())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email này đã được đăng ký bằng tài khoản mật hkẩu");
            }
        }
        user = new User();
        if(!existsEmail){
            user.setEmail(email);
            user.setUserName(name);
            user.setPassword("");
            user.setProvider("google");
            user = userRepo.save(user);
        }

        try {
//            Authentication authentication = new UsernamePasswordAuthenticationToken(user.getUserName(), null);
            UserPrinciple userPrinciple = new UserPrinciple(user);

            Authentication authentication = new UsernamePasswordAuthenticationToken(userPrinciple, null, userPrinciple.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.generateToken(authentication);

//            UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
            LocalDateTime time = LocalDateTime.now();

            return ResponseEntity.ok(
                    new JwtResponse(token, userPrinciple.getUsername(), userPrinciple.getAuthorities(), time)
            );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ResponseMessage("Tài khoản hoặc mật khẩu không đúng"));
        }
    }


    private GoogleIdToken verifyGoogleToken(String idTokenString) {
        try {
            HttpTransport transport = new NetHttpTransport();
            JacksonFactory jsonFactory = JacksonFactory.getDefaultInstance();

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList("407408718192.apps.googleusercontent.com"))
                    .build();

            return verifier.verify(idTokenString);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
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
