package org.example.meetingbe.service.payment;

import java.time.LocalDateTime;

public interface IPaymentService {
    Double getTotalRevenue();
    Long countSuccessfulPayments();
    Double getRevenueBetween(LocalDateTime start, LocalDateTime end);

    Double getTotalSpentByUser(Long userId);
    Double getRevenueByYear(int year);
}
