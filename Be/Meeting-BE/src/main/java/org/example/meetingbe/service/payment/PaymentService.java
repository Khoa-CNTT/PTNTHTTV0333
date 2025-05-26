package org.example.meetingbe.service.payment;

import jakarta.mail.MessagingException;
import org.example.meetingbe.dto.MonthlyTotalDTO;
import org.example.meetingbe.model.Payment;
import org.example.meetingbe.model.User;
import org.example.meetingbe.repository.IPaymentRepo;
import org.example.meetingbe.repository.IUserRepo;
import org.example.meetingbe.service.mailSender.MailRegister;
import org.example.meetingbe.service.user.IUserService;
import org.hibernate.validator.constraints.URL;
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
    @Autowired
    private IUserRepo userRepo;
    @Autowired
    private MailRegister mailRegister;
    @Override
    public Double getTotalRevenue() {
        Double total = paymentRepo.getTotalRevenue();
        return total != null ? total : 0.0;
    }

    @Override
    public Long countSuccessfulPayments(int year) {
        Long count = paymentRepo.countByYear(year);
        return count != null ? count : 0L;
    }

    @Override
    public Double getTotalRevenueByYear(int year) {
        Double revenue = paymentRepo.getTotalRevenueByYear(year);
        return revenue != null ? revenue : 0.0;
    }
    public List<MonthlyTotalDTO> getRevenueByYear(int year) {
        List<Object[]> resultList = paymentRepo.getMonthlyTotalsByYear(year);
        List<MonthlyTotalDTO> monthlyTotals = new ArrayList<>();

        double[] totals = new double[13]; // index 1–12, mặc định 0.0

        for (Object[] row : resultList) {
            Integer month = (Integer) row[0];
            Double total = (Double) row[1];
            totals[month] = total;
        }

        for (int i = 1; i <= 12; i++) {
            monthlyTotals.add(new MonthlyTotalDTO(i, totals[i]));
        }

        return monthlyTotals;
    }


    @Override
    public List<Integer> getAllYears() {
        return paymentRepo.findAllYears();
    }

    @Override
    public Payment addNewPayment(String userName){
        User user = userRepo.findByUserName(userName);
        Payment payment = new Payment(1000000d, true, LocalDateTime.now(), user);
        paymentRepo.save(payment);
        return payment;
    }

    @Override
    public Double getTotalSpentByUser(Long userId) {
        Double totalSpent = paymentRepo.getTotalSpentByUser(userId);
        return totalSpent != null ? totalSpent : 0.0;
    }
}
