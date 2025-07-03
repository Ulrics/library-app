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
}

const libraryGrid = document.querySelector(".library-grid")

function displayBooks(array){
    for(let i = 0; i < array.length; i++){
        const book = document.createElement("div");
        book.classList.add("book");
        libraryGrid.appendChild(book);

        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        book.appendChild(bookInfo);

        const bookTitle = document.createElement("div");
        bookTitle.classList.add("book-title")
        bookTitle.innerHTML(`${array[i].title}`);
        bookInfo.appendChild(bookTitle);

        const author = document.createElement("p");
        author.innerHTML(`by ${array[i].author}`);
        bookInfo.appendChild(author);

        const pages = document.createElement("p");
        pages.innerHTML(`${array[i].pages} pages`);
        bookInfo.appendChild(pages);

        const select = document.createElement("select");
        const haveRead = document.createElement("option");
        haveRead.value = "true";
        haveRead.textContent = "have read";

        const notRead = document.createElement("option");
        notRead.value = "false";
        notRead.textContent = "not read";

        if (array[i].haveRead) {
            haveRead.selected = true;
        } else {
            notRead.selected = true;
        }

        select.appendChild(haveRead);
        select.appendChild(notRead);
        bookInfo.appendChild(select);

        const deleteContainer = document.createElement("div");
        deleteContainer.classList.add("delete-container");

        const deleteBtn = document.createElement("div");
        deleteBtn.classList.add("delete");

        const trashIcon = document.createElement("img");
        trashIcon.src = "images/TrashSimple.svg";
        trashIcon.alt = "trash icon";

        deleteBtn.appendChild(trashIcon);
        deleteContainer.appendChild(deleteBtn);
        book.appendChild(deleteContainer);
    }
}