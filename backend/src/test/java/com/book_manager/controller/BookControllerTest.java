package com.book_manager.controller;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.HttpStatus.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.book_manager.model.Book;
import com.book_manager.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

public class BookControllerTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookController bookController;

    private Book existingBook;

    private Book book1;
    private Book book2;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        existingBook = new Book();
        existingBook.setId(1L);
        existingBook.setTitle("Original Title");
        existingBook.setAuthor("Original Author");

        book1 = new Book();
        book1.setId(1L);
        book1.setTitle("Book One");
        book1.setAuthor("Author A");

        book2 = new Book();
        book2.setId(2L);
        book2.setTitle("Book Two");
        book2.setAuthor("Author B");
    }

    @Test
    public void updateBook_whenBookExists_shouldUpdateAndReturnOk() {
        Book updatedDetails = new Book();
        updatedDetails.setTitle("New Title");
        updatedDetails.setAuthor("New Author");

        when(bookRepository.findById(1L)).thenReturn(Optional.of(existingBook));
        when(bookRepository.save(any(Book.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity<Book> response = bookController.updateBook(1L, updatedDetails);

        assertThat(response.getStatusCode()).isEqualTo(OK);
        assertThat(response.getBody().getTitle()).isEqualTo("New Title");
        assertThat(response.getBody().getAuthor()).isEqualTo("New Author");

        verify(bookRepository).findById(1L);
        verify(bookRepository).save(existingBook);
    }

    @Test
    public void updateBook_whenBookDoesNotExist_shouldReturnNotFound() {
        when(bookRepository.findById(2L)).thenReturn(Optional.empty());

        Book updatedDetails = new Book();
        updatedDetails.setTitle("New Title");
        updatedDetails.setAuthor("New Author");

        ResponseEntity<Book> response = bookController.updateBook(2L, updatedDetails);

        assertThat(response.getStatusCode()).isEqualTo(NOT_FOUND);
        verify(bookRepository).findById(2L);
        verify(bookRepository, never()).save(any());
    }

    @Test
    public void deleteBook_whenBookExists_shouldDeleteAndReturnOk() {
        when(bookRepository.existsById(1L)).thenReturn(true);
        doNothing().when(bookRepository).deleteById(1L);

        ResponseEntity<String> response = bookController.deleteBook(1L);

        assertThat(response.getStatusCode()).isEqualTo(OK);
        assertThat(response.getBody()).isEqualTo("Book deleted");

        verify(bookRepository).existsById(1L);
        verify(bookRepository).deleteById(1L);
    }

    @Test
    public void deleteBook_whenBookDoesNotExist_shouldReturnNotFound() {
        when(bookRepository.existsById(99L)).thenReturn(false);

        ResponseEntity<String> response = bookController.deleteBook(99L);

        assertThat(response.getStatusCode()).isEqualTo(NOT_FOUND);

        verify(bookRepository).existsById(99L);
        verify(bookRepository, never()).deleteById(anyLong());
    }

    @Test
    public void getBooks_shouldReturnListOfBooks() {
        List<Book> books = Arrays.asList(book1, book2);

        when(bookRepository.findAll()).thenReturn(books);

        List<Book> response = bookController.getBooks();

        assertThat(response).isNotNull();
        assertThat(response.size()).isEqualTo(2);
        assertThat(response).containsExactly(book1, book2);

        verify(bookRepository).findAll();
    }

    // ---- addBook() tests ----

    @Test
    public void addBook_whenBookDoesNotExist_shouldSaveAndReturnCreated() {
        Book newBook = new Book();
        newBook.setTitle("New Book");
        newBook.setAuthor("New Author");

        when(bookRepository.findByAuthorAndTitle(newBook.getAuthor(), newBook.getTitle()))
                .thenReturn(Optional.empty());
        when(bookRepository.save(newBook)).thenReturn(newBook);

        ResponseEntity<String> response = bookController.addBook(newBook);

        assertThat(response.getStatusCode()).isEqualTo(CREATED);
        assertThat(response.getBody()).isEqualTo("Book saved successfully.");

        verify(bookRepository).findByAuthorAndTitle(newBook.getAuthor(), newBook.getTitle());
        verify(bookRepository).save(newBook);
    }

    @Test
    public void addBook_whenBookExists_shouldReturnConflict() {
        Book duplicateBook = new Book();
        duplicateBook.setTitle("Book One");
        duplicateBook.setAuthor("Author A");

        when(bookRepository.findByAuthorAndTitle(duplicateBook.getAuthor(), duplicateBook.getTitle()))
                .thenReturn(Optional.of(book1));

        ResponseEntity<String> response = bookController.addBook(duplicateBook);

        assertThat(response.getStatusCode()).isEqualTo(CONFLICT);
        assertThat(response.getBody()).isEqualTo("Book already exists with this author and title.");

        verify(bookRepository).findByAuthorAndTitle(duplicateBook.getAuthor(), duplicateBook.getTitle());
        verify(bookRepository, never()).save(any());
    }
}


