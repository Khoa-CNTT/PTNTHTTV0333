package org.example.meetingbe.service.payment;

import org.example.meetingbe.model.Payment;

import java.time.LocalDateTime;
import java.util.List;

public interface IPaymentService {
    Double getTotalRevenue();
    Long countSuccessfulPayments();
    Double getRevenueBetween(LocalDateTime start, LocalDateTime end);

    Double getTotalSpentByUser(Long userId);
    List<Payment> getRevenueByYear(int year);
    List<Integer> getAllYears();
}
