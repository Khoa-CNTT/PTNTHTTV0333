package org.example.meetingbe.service.contact;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.example.meetingbe.dto.ContactDto;
import org.example.meetingbe.model.Contact;
import org.example.meetingbe.repository.IContactRepo;
import org.example.meetingbe.repository.IUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService implements IContactService {

    @Autowired
    private IContactRepo icontactRepo;
    @Autowired
    private IUserRepo userRepo;


    @Override
    public List<Contact> getContatc() {
        return icontactRepo.getAllContact();
    }

    @Override
    public Contact addNewContact(ContactDto contact) {
        return icontactRepo.save(dtoToObject(contact));
    }

    @Override
    public Page<Contact> findBy(Pageable pageable) {
        Page<Contact> contacts = icontactRepo.findBy(pageable);
        return contacts;
    }

    @Override
    public Contact updateContact(@Valid ContactDto updatedContact) {
        Long id = updatedContact.getId();
       if(icontactRepo.existsById(id)){
          Contact contact = icontactRepo.findById(id).get();
          contact.setStatus(updatedContact.getStatus());
          return icontactRepo.save(contact);
    }  else {
           throw new EntityNotFoundException("Contact with id " + id + " not found");
       }

    }

    @Override
    public Optional<Contact> getById(Long id) {
        return icontactRepo.findById(id);
    }

    public Contact dtoToObject(ContactDto contactDTO){

        return new Contact(contactDTO);
    }
}
