package org.example.meetingbe.service.payment;

import org.example.meetingbe.model.Payment;
import org.example.meetingbe.repository.IPaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
    public List<Payment> getRevenueByYear(int year) {

        return paymentRepo.getAllByYear(year);
    }

    @Override
    public Double getTotalSpentByUser(Long userId) {
        Double totalSpent = paymentRepo.getTotalSpentByUser(userId);
        return totalSpent != null ? totalSpent : 0.0;
    }
}
