const readButtons = document.querySelectorAll('.book-card__read-button');

readButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isSelected = button.classList.contains('selected');
    if(isSelected){
      button.classList.remove('selected');
      button.innerHTML = "Read";
    } else {
      button.classList.add('selected');
      button.innerHTML = "Not Read";
    }
  })
})

// stores newly created book objects
const myLibrary = [];

function Book(title,author,pages,read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uuid = crypto.randomUUID();
}

function addBookToLibrary(){
  // take pararms, create a book there store it in the array
}