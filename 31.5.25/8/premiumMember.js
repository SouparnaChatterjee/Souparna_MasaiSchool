import { Member } from './member.js';

function PremiumMember(name) {
  Member.call(this, name);
  this.specialCollectionAccess = true;
}

// Inherit from Member
PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;

// Override borrowBook method
PremiumMember.prototype.borrowBook = function (book) {
  if (this.borrowedBooks.length >= 5) {
    console.log(`${this.name} has reached the borrowing limit (5 books).`);
    return;
  }
  Member.prototype.borrowBook.call(this, book);
};

export { PremiumMember };
