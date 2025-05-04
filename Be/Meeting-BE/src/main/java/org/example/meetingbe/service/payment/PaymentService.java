package org.example.meetingbe.service.payment;

import org.example.meetingbe.dto.MonthlyTotalDTO;
import org.example.meetingbe.model.Payment;
import org.example.meetingbe.repository.IPaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<MonthlyTotalDTO> getRevenueByYear(int year) {
        List<Object[]> resultList = paymentRepo.getMonthlyTotalsByYear(year);
        List<MonthlyTotalDTO> monthlyTotals = new ArrayList<>();
        for (Object[] row : resultList) {
            Integer month = (Integer) row[0];
            Double total = (Double) row[1];
            MonthlyTotalDTO dto = new MonthlyTotalDTO(month, total);
            monthlyTotals.add(dto);
        }
        return monthlyTotals;
    }

    @Override
    public List<Integer> getAllYears() {
        return paymentRepo.findAllYears();
    }

    @Override
    public Double getTotalSpentByUser(Long userId) {
        Double totalSpent = paymentRepo.getTotalSpentByUser(userId);
        return totalSpent != null ? totalSpent : 0.0;
    }
}
