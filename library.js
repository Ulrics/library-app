const myLibrary = [];

function Book(title, author, pageNum, haveRead){
    if (!new.target) {
        throw Error ("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.haveRead = haveRead;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pageNum, haveRead){
    const newBook = new Book(title, author, pageNum, haveRead);
    myLibrary.push(newBook);
    // take params, create a book then store it in the array
}

function displayBooks(array){
    
}