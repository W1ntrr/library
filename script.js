const readButtons = document.querySelector('.book-card__read-button');
const modal = document.getElementById('addBookModal');
const addButton = document.querySelector('.library__add-button')
const closeForm = document.querySelector('.close-form');

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

function addBookToLibrary(title,author,pages,read){
  const newBook = new Book(title,author,pages,read);
  myLibrary.push(newBook);
  return newBook;
}

function toggleBookReadStatus(uuid){
  const book = myLibrary.find((book) => book.uuid === uuid);
  if(book){
    book.toggleReadStatus();
  }
}

readButtons.addEventListener('click',()=>{
  
})

addButton.addEventListener('click',()=>{
  modal.showModal();
})

closeForm.addEventListener('click',()=>{
  modal.close();
})

const newBook = addBookToLibrary('Great Gatsby', 'Scitzer', 123, false);

console.log(myLibrary[0]);
toggleBookReadStatus(newBook.uuid);
console.log(myLibrary[0]);

