package org.example.meetingbe.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.example.meetingbe.dto.ContactDto;
import org.example.meetingbe.model.Contact;
import org.example.meetingbe.service.contact.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/page")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*")
public class ContactController {
    @Autowired
    private IContactService icontactService;
    @PostMapping("/addNewContact")
    public ResponseEntity<Contact> addNewContact(@RequestBody @Valid ContactDto contact) {
        Contact saveContact = icontactService.addNewContact(contact);
        return new ResponseEntity<>(saveContact, HttpStatus.CREATED);
    }
    @GetMapping("/getPageContact")
    public ResponseEntity<Page<Contact>> getPageContact(
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size",defaultValue = "5") int size,
            @RequestParam(name = "sort",defaultValue = "dateSend,asc") String[] sort
    ) {
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort[0]));

        Page<Contact> contacts = icontactService.findBy(pageable);
        return ResponseEntity.ok(contacts);
    }
    @GetMapping("/getPageContactTrue")
    public ResponseEntity<Page<Contact>> getPageContactTrue(
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size",defaultValue = "5") int size,
            @RequestParam(name = "sort",defaultValue = "dateSend,asc") String[] sort
    ) {
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort[0]));

        Page<Contact> contacts = icontactService.getAllByStatusTrue(pageable);
        return ResponseEntity.ok(contacts);
    }
    @GetMapping("/getPageContactFalse")
    public ResponseEntity<Page<Contact>> getPageContactFalse(
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size",defaultValue = "5") int size,
            @RequestParam(name = "sort",defaultValue = "dateSend,asc") String[] sort
    ) {
        Sort.Direction direction = Sort.Direction.fromString(sort[1]);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort[0]));

        Page<Contact> contacts = icontactService.getAllByStatusFalse(pageable);
        return ResponseEntity.ok(contacts);
    }

    @PutMapping("/updateContact")
    public ResponseEntity<String> updateContact(@RequestBody  ContactDto contactDto) {
        try {
            icontactService.updateContact(contactDto);
            return new ResponseEntity<>("updated successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(" not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
