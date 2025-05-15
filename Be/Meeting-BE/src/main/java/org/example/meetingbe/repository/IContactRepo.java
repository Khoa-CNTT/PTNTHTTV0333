package org.example.meetingbe.repository;

import org.example.meetingbe.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IContactRepo extends JpaRepository<Contact, Long> {
    @Query(value = "select * from contact", nativeQuery = true)
    List<Contact> getAllContact();
    Page<Contact> findBy(Pageable pageable);
    Page<Contact> getAllByStatusTrue(Pageable pageable);
    Page<Contact> getAllByStatusFalse(Pageable pageable);
    @Query(value = "UPDATE Contact as b SET b.status = false WHERE b.id =:id ", nativeQuery = true)
    void updateContact(@Param("id") Integer id);
}
