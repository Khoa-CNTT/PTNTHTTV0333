package org.example.meetingbe.controller;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.example.meetingbe.dto.MonthlyTotalDTO;
import org.example.meetingbe.model.Payment;
import org.example.meetingbe.repository.IPaymentRepo;
import org.example.meetingbe.service.mailSender.MailRegister;
import org.example.meetingbe.service.payment.IPaymentService;
import org.example.meetingbe.service.user.IUserService;
import org.example.meetingbe.service.vnpay.VNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
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
    @Autowired
    private IUserService userService;

    @GetMapping("/revenue")//Tong doanh thu
    public Double getTotalRevenue(){
        return paymentService.getTotalRevenue();
    }
        @GetMapping("/countSuccessful")//Dem so giao dich thanh cong
    public int countSuccessfulPayments(@RequestParam("Year") int year){
        return paymentService.countSuccessfulPayments(year).intValue();
    }
    @GetMapping("/revenue/total")//Tong doanh thu theo nam
    public Double getRevenueBetween(@RequestParam("year") int year) {
        return paymentService.getTotalRevenueByYear(year);
    }
    @GetMapping("/revenue/getByYear") // danh sach thanh toan theo nam
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
    public ResponseEntity<Map<String, String>> submidOrder(HttpServletRequest request,
                                                           @RequestParam(value = "amount", defaultValue = "1000000") int orderTotal,
                                                           @RequestParam("orderInfo") String orderInfo,
                                                           @RequestParam("userName") String userName){
        String modifiedOrderInfo = orderInfo + "|userName=" + userName;
        String vnpayUrl = vnPayService.createOrder(orderTotal, modifiedOrderInfo);
        Map<String, String> response = new HashMap<>();
        response.put("redirectUrl", vnpayUrl);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/vnpay-payment")
    public ResponseEntity<Boolean> GetMapping(HttpServletRequest request) throws MessagingException {
        request.getParameterMap().forEach((k, v) -> System.out.println(k + " = " + Arrays.toString(v)));
        int paymentStatus =vnPayService.orderReturn(request);
        String userName = (String) request.getAttribute("userName");
        if(paymentStatus == 1){
            userService.updateUserVip(userName);
            paymentService.addNewPayment(userName);
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.ok(false);
    }

}
