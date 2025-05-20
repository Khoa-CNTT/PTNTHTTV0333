package org.example.meetingbe.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.meetingbe.dto.MonthlyTotalDTO;
import org.example.meetingbe.model.Payment;
import org.example.meetingbe.repository.IPaymentRepo;
import org.example.meetingbe.service.payment.IPaymentService;
import org.example.meetingbe.service.vnpay.VNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class PaymentController {
    @Autowired
    private IPaymentService paymentService;
    @Autowired
    private VNPayService vnPayService;

    @GetMapping("/revenue")//Tong doanh thu
    public Double getTotalRevenue(){
        return paymentService.getTotalRevenue();
    }
        @GetMapping("/countSuccessful")//Dem so giao dich thanh cong
    public int countSuccessfulPayments(@RequestParam("Year") int year){
        return paymentService.countSuccessfulPayments(year).intValue();
    }
    @GetMapping("/revenue/between")//Tong doanh thu tu ngay start - end
    public Double getRevenueBetween(
            @RequestParam @DateTimeFormat (iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return paymentService.getRevenueBetween(start, end);
    }
    @GetMapping("/revenue/getByYear")
    public List<MonthlyTotalDTO> getRevenueByYear(@RequestParam(name = "year") int year) {
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

    @PostMapping("/submitOrder")
    public ResponseEntity<Map<String, String>> submidOrder(@RequestParam(value = "amount", defaultValue = "1000000") int orderTotal,
                                                           @RequestParam("orderInfo") String orderInfo,
                                                           HttpServletRequest request){
//        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String baseUrl = "http://localhost:4200/pages/components/payment";
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        Map<String, String> response = new HashMap<>();
        response.put("redirectUrl", vnpayUrl);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/vnpay-payment")
    public ResponseEntity<Boolean> GetMapping(HttpServletRequest request){
        int paymentStatus =vnPayService.orderReturn(request);
        return ResponseEntity.ok(paymentStatus == 1 ? true : false);
    }

}
