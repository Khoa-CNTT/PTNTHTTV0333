package org.example.meetingbe.service.payment;

import org.example.meetingbe.repository.IPaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PaymentService implements IPaymentService {
    @Autowired
    private IPaymentRepo paymentRepo;

    @Override
    public Double getTotalRevenue() {
        Double total = paymentRepo.getTotalRevenue();
        return total != null ? total : 0.0;
    }

    @Override
    public Long countSuccessfulPayments() {
        Long count = paymentRepo.countSuccessfulPayments();
        return count != null ? count : 0L;
    }

    @Override
    public Double getRevenueBetween(LocalDateTime start, LocalDateTime end) {
        Double revenue = paymentRepo.getRevenueBetween(start, end);
        return revenue != null ? revenue : 0.0;
    }
    public Double getRevenueByYear(int year) {
        LocalDateTime start = LocalDateTime.of(year, 1, 1, 0, 0, 0, 0); // Bắt đầu từ 1 tháng 1 năm đó
        LocalDateTime end = LocalDateTime.of(year, 12, 31, 23, 59, 59, 999999999); // Kết thúc vào 31 tháng 12 năm đó
        return getRevenueBetween(start, end);
    }

    @Override
    public Double getTotalSpentByUser(Long userId) {
        Double totalSpent = paymentRepo.getTotalSpentByUser(userId);
        return totalSpent != null ? totalSpent : 0.0;
    }
}
