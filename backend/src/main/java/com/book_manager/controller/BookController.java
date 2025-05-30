package com.book_manager.controller;

import com.book_manager.model.Book;
import com.book_manager.repository.BookRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookController {

    private final BookRepository repo;

    public BookController(BookRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/api/books")
    public List<Book> getBooks() {
        return repo.findAll();
    }
}