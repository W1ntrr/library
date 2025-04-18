const modal = document.getElementById('addBookModal');
const form = document.querySelector('.bookForm');
const addButton = document.querySelector('.library__add-button');
const closeForm = document.querySelector('.close-form');
const bookCards = document.querySelector('.book-card__actions');
const libraryList = document.querySelector('.library__book-list');

// stores newly created book objects
const myLibrary = [];

function Book(title,author,pages,read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uuid = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function(){
  this.read = !this.read;
}

form.addEventListener('submit',(e) => {
  e.preventDefault();
  const formData = new FormData(form);
  addBookToLibrary(
    formData.get('book-title'),
    formData.get('book-author'),
    parseInt(formData.get('book-pages')),
    formData.get('book-read') === 'on'
  );
  modal.close();
  form.reset();
})

function addBookToLibrary(title,author,pages,read){
  const newBook = new Book(title,author,pages,read);
  myLibrary.push(newBook);
  displayBookOnCard(newBook);
}

function displayBookOnCard(book){
  const card = document.createElement('div');
  card.classList.add('book-card');
  card.dataset.id = book.uuid;
  
  const bookImage = document.createElement('div');
  bookImage.classList.add('book-card__image');

  const bookDetails = document.createElement('div');
  bookDetails.classList.add('book-card__details');

  const bookInfo = document.createElement('div');
  bookInfo.classList.add('book-card__info');
  bookInfo.innerHTML = `
  <h2 class="book-card__title">${book.title}</h2>
  <h3 class="book-card__author">${book.author}</h3>
  <h4 class="book-card__pages">${book.pages} pages</h4>
  `;

  const bookActions = document.createElement('div');
  bookActions.classList.add('book-card__actions');

  const readButton = document.createElement('button');
  readButton.classList.add('book-card__read-button');
  readButton.textContent = book.read ? 'Not Read' : 'Read';

  libraryList.addEventListener('click', e =>{
    if(e.target.matches('.book-card__read-button')){
      const card = e.target.closest('.book-card');
      const bookId = card.dataset.id;
      const book = myLibrary.find(b => b.uuid === bookId);
      if(book){
        book.toggleReadStatus();
        e.target.textContent = book.read ? 'Not Read' : 'Read';
        e.target.classList.toggle('selected');
      }
    }
  })

  const deleteButton = document.createElement('input');
  deleteButton.classList.add('book-card__delete-button');
  deleteButton.type = "image";
  deleteButton.src = "assets/trash-solid.svg"
  deleteButton.addEventListener('click', () => {
    deleteBook(book.uuid);
    card.remove();
  })

  card.appendChild(bookImage);
  card.appendChild(bookDetails);

  bookDetails.appendChild(bookInfo);
  bookDetails.appendChild(bookActions);

  bookActions.appendChild(readButton);
  bookActions.appendChild(deleteButton);

  libraryList.appendChild(card);
}

function deleteBook(uuid){
  const index = myLibrary.findIndex((book) => book.uuid === uuid);
  if(index !== -1){
    myLibrary.splice(index,1);
  }
}


addButton.addEventListener('click',()=>{
  modal.showModal();
})

closeForm.addEventListener('click',()=>{
  modal.close();
})

// Demo Books
addBookToLibrary('Great Gatsby', 'F. Scott Fitzgerald',208,false);