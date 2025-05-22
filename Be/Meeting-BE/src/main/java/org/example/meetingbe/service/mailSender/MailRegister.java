package org.example.meetingbe.service.mailSender;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.example.meetingbe.dto.Register;
import org.example.meetingbe.model.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class MailRegister {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmailRegister(String email, String userName) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        // Cấu hình Thymeleaf template resolver
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("/templates/");
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode("HTML");

        // Khởi tạo SpringTemplateEngine với template resolver
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        // Tạo context và truyền dữ liệu (nếu cần)
        Context context = new Context();
        context.setVariable("name", userName); // Truyền biến vào template nếu cần
        context.setVariable("date", LocalDateTime.now());
        context.setVariable("email", email);
        // Render template thành chuỗi HTML
        String htmlContent = templateEngine.process("Register", context); // Tên template không cần phần mở rộng

        // Thiết lập email với nội dung HTML
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Thông báo đăng ký tài khoản thành công");
        mimeMessageHelper.setText(htmlContent, true); // true để chỉ định đây là nội dung HTML

        // Gửi email
        mailSender.send(mimeMessage);
    }

    public void sendOtp(String email, String otp) throws MessagingException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("MÃ OTP THAY ĐỔI MẬT KHẨU");
        message.setText("MÃ XÁC THỨC CỦA BẠN LÀ: " + otp);
        mailSender.send(message);
    }

    public void paymentSuccess(String email, Payment payment) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        // Cấu hình Thymeleaf template resolver
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("/templates/"); // Đường dẫn đến thư mục chứa template
        templateResolver.setSuffix(".html");       // Chỉ định phần mở rộng là .html
        templateResolver.setTemplateMode("HTML");

        // Khởi tạo SpringTemplateEngine với template resolver
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        // Tạo context và truyền dữ liệu (nếu cần)
        Context context = new Context();
        context.setVariable("total", payment.getTotal()); // Truyền biến vào template nếu cần
        context.setVariable("name", payment.getUser().getUserName());
        context.setVariable("time", payment.getCreateAt());
//
        // Render template thành chuỗi HTML
        String htmlContent = templateEngine.process("ordersuccess", context); // Tên template không cần phần mở rộng

        // Thiết lập email với nội dung HTML
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Thông báo đăng ký tài khoản thành công");
        mimeMessageHelper.setText(htmlContent, true); // true để chỉ định đây là nội dung HTML

        // Gửi email
        mailSender.send(mimeMessage);
    }
    public void sendSchedule(String emailList) throws MessagingException {
        String[] emails = emailList.split(",");

        // Xóa khoảng trắng đầu/cuối từng email nếu có
        for (int i = 0; i < emails.length; i++) {
            emails[i] = emails[i].trim();
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emails); // gửi đến nhiều email
        message.setSubject("LỊCH HẸN CUỘC HỌP");
        message.setText("Đây là nội dung lịch hẹn cuộc họp."); // Thêm nội dung nếu cần
        mailSender.send(message);
    }


}
