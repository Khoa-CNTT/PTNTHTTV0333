package org.example.meetingbe.controller;

import org.example.meetingbe.model.Payment;
import org.example.meetingbe.repository.IPaymentRepo;
import org.example.meetingbe.service.payment.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class PaymentController {
    @Autowired
    private IPaymentService paymentService;

    @GetMapping("/revenue")//Tong doanh thu
    public Double getTotalRevenue(){
        return paymentService.getTotalRevenue();
    }
        @GetMapping("/countSuccessful")//Dem so giao dich thanh cong
    public int countSuccessfulPayments(){
        return paymentService.countSuccessfulPayments().intValue();
    }
    @GetMapping("/revenue/between")//Tong doanh thu tu ngay start - end
    public Double getRevenueBetween(
            @RequestParam @DateTimeFormat (iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return paymentService.getRevenueBetween(start, end);
    }
    @GetMapping("/revenue/getByYear")
    public List<Payment> getRevenueByYear(@RequestParam(name = "year") int year) {
        return paymentService.getRevenueByYear(year);
    }

    @GetMapping("/total-spent")//tong chi tieu cua 1 user
    public Double getTotalSpentByUser(@RequestParam Long userId) {
        return paymentService.getTotalSpentByUser(userId);
    }

    @GetMapping("/years")
    public List<Integer> getRegistrationYears() {
        return paymentService.getAllYears();
    }
}
