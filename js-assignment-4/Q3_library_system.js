// Q3: Library Management System (Classes + Objects)
class Book {
  constructor(title, author, ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.isIssued = false;
  }

  issueBook() {
    if (this.isIssued) return false;
    this.isIssued = true;
    return true;
  }

  returnBook() {
    if (!this.isIssued) return false;
    this.isIssued = false;
    return true;
  }

  details() {
    return `${this.title} by ${this.author} [ISBN:${this.ISBN}] - ${this.isIssued ? 'Issued' : 'Available'}`;
  }
}

// Example array of books
const library = [
  new Book('Clean Code', 'Robert C. Martin', '9780132350884'),
  new Book('You Don\'t Know JS', 'Kyle Simpson', '9781491904244'),
  new Book('Eloquent JavaScript', 'Marijn Haverbeke', '9781593279509'),
  new Book('Introduction to Algorithms', 'CLRS', '9780262033848')
];

// Display all available books (not issued)
function listAvailableBooks(lib) {
  return lib.filter(b => !b.isIssued);
}

// Issue a book by ISBN
function issueByISBN(lib, isbn) {
  const book = lib.find(b => b.ISBN === isbn);
  if (!book) return { success: false, message: 'ISBN not found' };
  if (book.isIssued) return { success: false, message: 'Book already issued' };
  book.issueBook();
  return { success: true, book };
}

// Return a book by ISBN
function returnByISBN(lib, isbn) {
  const book = lib.find(b => b.ISBN === isbn);
  if (!book) return { success: false, message: 'ISBN not found' };
  if (!book.isIssued) return { success: false, message: 'Book is not issued' };
  book.returnBook();
  return { success: true, book };
}

// Export for Node/browser
if (typeof module !== 'undefined') module.exports = { Book, library, listAvailableBooks, issueByISBN, returnByISBN };
