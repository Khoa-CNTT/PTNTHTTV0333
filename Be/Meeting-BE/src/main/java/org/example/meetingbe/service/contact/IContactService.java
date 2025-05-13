package org.example.meetingbe.service.contact;

import org.example.meetingbe.dto.ContactDto;
import org.example.meetingbe.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IContactService {
    List<Contact> getContatc();
    Contact addNewContact(ContactDto contact);
    Page<Contact> findBy(Pageable pageable);
    Contact updateContact(Long id) ;
    Optional<Contact> getById(Long id);
}
