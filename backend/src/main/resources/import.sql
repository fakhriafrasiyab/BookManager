CREATE TABLE IF NOT EXISTS BOOK
(
    id
    INT
    PRIMARY
    KEY,
    title
    VARCHAR
(
    255
),
    author VARCHAR
(
    255
)
    );

INSERT INTO BOOK (id, title, author)
VALUES (1, '1984', 'George Orwell');
INSERT INTO BOOK (id, title, author)
VALUES (2, 'Brave New World', 'Aldous Huxley');