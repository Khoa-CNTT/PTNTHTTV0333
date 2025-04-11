package org.example.meetingbe.repository;

import org.example.meetingbe.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPaymentRepo extends JpaRepository<Payment, Long> {
}
