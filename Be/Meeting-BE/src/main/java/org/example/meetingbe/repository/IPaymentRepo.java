package org.example.meetingbe.repository;

import org.example.meetingbe.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface IPaymentRepo extends JpaRepository<Payment, Long> {
    @Query("SELECT SUM(p.total) FROM Payment p WHERE p.status = true")
    Double getTotalRevenue();

    @Query("SELECT COUNT(p) FROM Payment p WHERE p.status = true")
    Long countSuccessfulPayments();
    @Query("SELECT SUM(p.total) FROM Payment p WHERE p.status = true AND p.createAt BETWEEN :start AND :end")
    Double getRevenueBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT SUM(p.total) FROM Payment p WHERE p.status = true AND p.user.id = :userId")
    Double getTotalSpentByUser(@Param("userId") Long userId);
}
