const modal = document.getElementById('addBookModal');
const form = document.querySelector('.bookForm');
const addButton = document.querySelector('.library__add-button');
const closeForm = document.querySelector('.close-form');
const bookCards = document.querySelector('.book-card__actions');
const libraryList = document.querySelector('.library__book-list');

class Book{
  constructor(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uuid = crypto.randomUUID();
  }

  toggleReadStatus(){
    this.read = !this.read;
  }
}

class Library {
  constructor(){
    this.books = []
  }
  
  addBook(book){
    this.books.push(book);

    const bookCard = new BookCard(book);
    const cardElement = bookCard.createCard();
    libraryList.appendChild(cardElement);
  }

  deleteBook(uuid) {
    const index = this.books.findIndex((book) => book.uuid === uuid);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  toggleReadStatus(bookId){
    const book = this.books.find((b) => b.uuid === bookId);
    if (!book) return null;

    book.toggleReadStatus();
    return book;
  }
}

class BookCard {
  constructor(book){
    this.book = book;
  }

  createCard(){
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.dataset.id = this.book.uuid;
  
    const bookImage = document.createElement('div');
    bookImage.classList.add('book-card__image');
  
    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-card__details');
  
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('book-card__info');
    bookInfo.innerHTML = `
    <h2 class="book-card__title">${this.book.title}</h2>
    <h3 class="book-card__author">${this.book.author}</h3>
    <h4 class="book-card__pages">${this.book.pages} pages</h4>
    `;
  
    const bookActions = document.createElement('div');
    bookActions.classList.add('book-card__actions');
  
    const readButton = document.createElement('button');
    readButton.classList.add('book-card__read-button');
    readButton.textContent = this.book.read ? 'Not Read' : 'Read';
    readButton.classList.toggle('selected', this.book.read);

    if (!libraryList.hasClickListener) {
      libraryList.addEventListener('click', (e) => {
        if (e.target.matches('.book-card__read-button')) {
          const card = e.target.closest('.book-card');
          const bookId = card.dataset.id;
          const updateBook = library.toggleReadStatus(bookId);
          
          if(updateBook){
            e.target.textContent = updateBook.read ? 'Not Read' : 'Read';
            e.target.classList.toggle('selected',updateBook.read);
          }
        }
      });
      libraryList.hasClickListener = true;
    }

    const deleteButton = document.createElement('input');
    deleteButton.classList.add('book-card__delete-button');
    deleteButton.type = 'image';
    deleteButton.src = 'assets/trash-solid.svg';
    deleteButton.addEventListener('click', () => {
      library.deleteBook(this.book.uuid);
      card.remove();
    });
  
    card.appendChild(bookImage);
    card.appendChild(bookDetails);
  
    bookDetails.appendChild(bookInfo);
    bookDetails.appendChild(bookActions);
  
    bookActions.appendChild(readButton);
    bookActions.appendChild(deleteButton);
  
    libraryList.appendChild(card); 

    return card;
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newBook = new Book(
    formData.get('book-title'),
    formData.get('book-author'),
    parseInt(formData.get('book-pages')),
    formData.get('book-read') === 'on'
  );
  library.addBook(newBook);
  modal.close();
  form.reset();
});

addButton.addEventListener('click', () => {
  modal.showModal();
});

closeForm.addEventListener('click', () => {
  modal.close();
});

const library = new Library();

// Demo Books
library.addBook(new Book('Great Gatsby', 'F. Scott Fitzgerald', 208, false));
