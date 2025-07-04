let myLibrary = [];

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
    libraryGrid.innerHTML = "";

    for(let i = 0; i < array.length; i++){
        const book = document.createElement("div");
        book.classList.add("book");
        libraryGrid.appendChild(book);

        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        book.appendChild(bookInfo);

        const bookTitle = document.createElement("div");
        bookTitle.classList.add("book-title")
        bookTitle.textContent = `${array[i].title}`;
        bookInfo.appendChild(bookTitle);

        const author = document.createElement("p");
        author.textContent = `by ${array[i].author}`;
        bookInfo.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = `${array[i].pageNum} pages`;
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
        deleteContainer.classList.add("rightside-button-container");

        const deleteBtn = document.createElement("div");
        deleteBtn.id = array[i].id;
        deleteBtn.addEventListener("click", removeBook);
        deleteBtn.classList.add("delete");

        const trashIcon = document.createElement("img");
        trashIcon.src = "images/TrashSimple.svg";
        trashIcon.alt = "trash icon";

        deleteBtn.appendChild(trashIcon);
        deleteContainer.appendChild(deleteBtn);
        book.appendChild(deleteContainer);
    }
}



const addBookBtn = document.querySelector(".primary-button");
const dialog = document.getElementById("addBookModal");
const form = document.querySelector("dialog form");

function addGlobalEventListener(type, selector, callback, parent = document){
    parent.addEventListener(type, c => {
        if (c.target.matches(selector)){
            callback(c)
        }
    })
}

addGlobalEventListener("click", ".primary-button", () => dialog.showModal())

const emptyState = document.querySelector(".empty-state");
function submitNewBook(event) {
    event.preventDefault();

    const title = document.getElementById("book-title").value;
    const author = document.getElementById("author").value;
    const pageNum = document.getElementById("page-num").value;
    const haveRead = document.getElementById("ifRead").checked;

    addBookToLibrary(title, author, pageNum, haveRead);
    displayBooks(myLibrary);

    form.reset();
    dialog.close();
    emptyState.remove();
}

addGlobalEventListener("submit", "dialog form", submitNewBook);

/*
function removeBook(item){
    const bookID = item.target.id;
    const newLibrary = myLibrary.filter(book => book.id !== bookID);
    myLibrary = newLibrary;
    displayBooks(myLibrary);
}
*/

function removeBook(event) {
    console.log("delete registered")
    const target = event.target;
    const deleteBtn = target.closest(".delete");

    if (!deleteBtn) return; 

    const bookID = deleteBtn.id;
    const newLibrary = myLibrary.filter(book => book.id !== bookID);
    myLibrary = newLibrary;
    displayBooks(myLibrary);
}


addGlobalEventListener("click", ".delete", removeBook);