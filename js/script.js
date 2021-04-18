//getting elements
book_form = document.querySelector('#bookadd');
title = document.getElementById('title');
author = document.getElementById('author');
isbn = document.getElementById('isbn');
alert_area = document.getElementById('alert_area');
alert_area.style.display = 'none';

//class for new book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

//class for display list of books
class Display{
    constructor() {}
    addBooklist(book) {
        let list = document.querySelector("#list_body");
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;
        list.appendChild(row);
    }

    clearFields(){
        title.value='';
        author.value='';
        isbn.value='';
    }
}

// class of alerts
class Alert{
    constructor(){}

    timeout() {
        setTimeout(() => {
            alert_area.style.display = 'none';
        }, 3000);
    }

    warning(){
        alert_area.style.display = "block";
        alert_area.style.backgroundColor  = "red";
        alert_area.innerText = 'Please fill all the fields!!!';
        this.timeout();
    }

    Success(type){
        alert_area.style.display = "block";
        alert_area.style.backgroundColor  = "green";
        if (type == 'add'){
            alert_area.innerText = 'Book Added Successfully!';
        }
        else{
            alert_area.innerText = 'Book Deleted Successfully!';
        }
        this.timeout();
    }
}
alrt = new Alert();

//event listener for book add
book_form.addEventListener('submit', add_book);
function add_book(e){
    title_text = title.value;
    author_text = author.value;
    isbn_text = isbn.value;

    if (title_text.length > 0 && author_text.length > 0 && isbn_text.length > 0) {
        book = new Book(title_text,author_text,isbn_text);
        let disp = new Display();
        disp.addBooklist(book);
        disp.clearFields();

        alrt.Success('add')
    }
    else {
        alrt.warning();   
    }  
    e.preventDefault();
}

class DeleteBook{
    constructor(element){
        this.element = element
    }
    delete(){
        if (this.element.hasAttribute('href')){
            this.element.parentElement.parentElement.remove();
            alrt.Success('del')
        }
    }
}

//event listener for book add
del = document.querySelector('#list_body')
del.addEventListener('click', delete_book);
function delete_book(e){
    del_book = new DeleteBook(e.target);
    del_book.delete();
}
