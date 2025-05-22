package org.example.meetingbe.repository;

import org.example.meetingbe.model.Contact;
import org.example.meetingbe.model.Payment;
import org.example.meetingbe.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Transactional
@Repository
public interface IUserRepo extends JpaRepository<User, Long> {
    User findByUserName(String userName);
    Page<User> findBy(Pageable pageable);
    Boolean existsByUserName(String userName);
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    @Query("UPDATE User u SET u.status = true WHERE u.id = :id")
    Boolean updateStatusUser(Long id);
    @Query("SELECT COUNT(u) FROM User u WHERE FUNCTION('YEAR', u.createAt) = :year")
    long countByYear(int year);
    long countByIsVipTrue();
    List<User> getAllByIsVipTrue();
    List<User> getAllByIsVipFalse();
    @Query("SELECT DISTINCT FUNCTION('YEAR', u.createAt) FROM User u ORDER BY FUNCTION('YEAR', u.createAt)")
    List<Integer> findAllYears();

    @Query("SELECT u FROM User u WHERE FUNCTION('YEAR', u.createAt) = :year")
    List<User> getAllByYear(@Param("year") int year);

    @Query("SELECT FUNCTION('MONTH', u.createAt), COUNT(u) " +
            "FROM User u " +
            "WHERE FUNCTION('YEAR', u.createAt) = :year " +
            "GROUP BY FUNCTION('MONTH', u.createAt) " +
            "ORDER BY FUNCTION('MONTH', u.createAt)")
    List<Object[]> countRegistrationsByMonth(@Param("year") int year);

    @Modifying
    @Query("UPDATE User u SET u.isVip = true WHERE u.userName = :userName")
    int updateUserVip(String userName);
}
