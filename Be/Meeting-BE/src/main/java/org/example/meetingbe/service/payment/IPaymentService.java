package org.example.meetingbe.service.payment;

import org.example.meetingbe.dto.MonthlyTotalDTO;
import org.example.meetingbe.model.Payment;

import java.time.LocalDateTime;
import java.util.List;

public interface IPaymentService {
    Double getTotalRevenue();
    Long countSuccessfulPayments(int year);
    Double getTotalRevenueByYear(int year);

    Double getTotalSpentByUser(Long userId);
    List<MonthlyTotalDTO> getRevenueByYear(int year);
    List<Integer> getAllYears();
}
