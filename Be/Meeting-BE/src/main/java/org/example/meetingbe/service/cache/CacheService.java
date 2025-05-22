package org.example.meetingbe.service.cache;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class CacheService {
    @CachePut(value = "otpCache", key = "#email")
    public String generateOtp(@Param("email") String email) {
        String otp = String.valueOf(new Random().nextInt(9000) + 1000); // 4-digit
        return otp;
    }

    @Cacheable(value = "otpCache", key = "#email")
    public String getOtp(@Param("email") String email) {
        return null;
    }

    @CacheEvict(value = "otpCache", key = "#email ")
    public void clearOtp(@Param("email") String email) {

    }
}
