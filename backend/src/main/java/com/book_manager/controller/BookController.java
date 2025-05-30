package com.book_manager.controller;

import com.book_manager.model.Book;
import com.book_manager.repository.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository repo) {
        this.bookRepository = repo;
    }

    @GetMapping
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<String> addBook(@RequestBody Book book) {
        Optional<Book> existingBook = bookRepository.findByAuthorAndTitle(
                book.getAuthor(), book.getTitle()
        );

        if (existingBook.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Book already exists with this author and title.");
        }

        bookRepository.save(book);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Book saved successfully.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return bookRepository.findById(id)
                .map(book -> {
                    book.setTitle(bookDetails.getTitle());
                    book.setAuthor(bookDetails.getAuthor());
                    return ResponseEntity.ok(bookRepository.save(book));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.ok("Book deleted");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}