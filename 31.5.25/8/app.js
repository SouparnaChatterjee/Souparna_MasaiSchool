import { Book } from './book.js';
import { Member } from './member.js';
import { PremiumMember } from './premiumMember.js';

// Create some books
const book1 = new Book("Atomic Habits", "James Clear");
const book2 = new Book("The Alchemist", "Paulo Coelho");
const book3 = new Book("1984", "George Orwell");
const book4 = new Book("Deep Work", "Cal Newport");
const book5 = new Book("Sapiens", "Yuval Noah Harari");
const book6 = new Book("The Great Gatsby", "F. Scott Fitzgerald");

// Create regular and premium members
const alice = new Member("Alice");
const bob = new PremiumMember("Bob");

// Demonstrate borrowing
alice.borrowBook(book1); // Allowed
alice.borrowBook(book2); // Allowed
alice.borrowBook(book3); // Allowed
alice.borrowBook(book4); // Should not be allowed

bob.borrowBook(book4); // Allowed
bob.borrowBook(book5); // Allowed
bob.borrowBook(book6); // Allowed

// Bind example: pre-set the member for borrowing
const borrowForAlice = alice.borrowBook.bind(alice);
borrowForAlice(new Book("Start With Why", "Simon Sinek")); // Should not allow if already 3 borrowed

// Show borrowed books
console.log(`${alice.name}'s borrowed books:`, alice.borrowedBooks);
console.log(`${bob.name}'s borrowed books:`, bob.borrowedBooks);
