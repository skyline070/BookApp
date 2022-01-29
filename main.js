//Book Class: Represent a Book
class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}
// let book = new Book("RD sharma","RS Agarwal","1234")
// // console.log(book)

//UI Class: Handle UI Tasks
class UI{

    static addBookToList(book){
      
            let list = document.querySelector("#book-list"); //<tbody></tbody>
            let row = document.createElement("tr"); //<tr></tr>
            row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger delete">X</a></td>
            `;
           // console.log(row)
            list.appendChild(row); //<tbody><tr></tr></tbody>

    }

    static showAlert(message,className){
        let div1 = document.createElement('div'); //<div></div>
        div1.className = `alert alert-${className }`;
        div1.appendChild(document.createTextNode(message)); //<div>Please Fill All The Fields</div>
        let container = document.querySelector(".container");
        let form = document.querySelector("#book-form");
        container.insertBefore(div1,form);
        // Vanish in 3 Seconds
        setTimeout(function(){
            document.querySelector(".alert").remove();    //find in which has alert class
        },3000)

    }

    static displayBooks(){
        
        // const storedBooks = [
        //     {
        //         title:"Book one",
        //         author:"John Doe",
        //         isbn:"1234"
        //     },
        //     {
        //         title:"Book two",
        //         author:"John Doe",
        //         isbn:"890"
        //     }
        // ];
        // let books = storedBooks;
        let books = Store.getBooks()
        books.forEach((sumi) => UI.addBookToList(sumi))

    }

    static clearFields(){
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';

    }

    static deleteBook(del){
        if(del.classList.contains("delete")){
            if(confirm("Are U Sure You Want To Delete This"))
               del.parentElement.parentElement.remove();
        }

    }

}
// Store Class : Handles Storage
class Store{
    static addBooks(book){
        const books = Store.getBooks();
        books.push(book)
        // console.log(typeof books,books)
        localStorage.setItem("books",JSON.stringify(books))  //Convert array into string format

    }
    static getBooks(){
        let books;         //Make a Variable   
        if(localStorage.getItem("books") == null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"))  //Give string in array format
        }
        return books
    }
    static removeBooks(isbn){
        let books = this.getBooks();
        // console.log(books)
        books.forEach((book,idx) => {
            if(book.isbn == isbn)
            books.splice(idx,1)
        })
       localStorage.setItem("books",JSON.stringify(books))

    }
}

//Event : Display Book 

document.addEventListener("DOMContentLoaded",()=>{  //means webpage is loading...
UI.displayBooks()
})
// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit",function(e){
    
    // Prevent Default Values
    e.preventDefault()
    // Get Form Values
    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    let isbn = document.querySelector("#isbn").value

    // Validate
    if(title == '' || author == '' || isbn == ""){
        // alert("Please Fill All The Fields")
        UI.showAlert("Please Fill All The Fields","danger")
    }
    else{
        // Instatiate(Creation of Object) a Book 
    let book = new Book(title,author,isbn);
    
    // Add Book to UI
    UI.addBookToList(book)        //static method calls by class name without making a object
    
    // Add a Book to localStorage
    Store.addBooks(book)

    // Clear Fields
    UI.clearFields();

    // Show success message
    UI.showAlert("Book Added Successfully","success")
    }
})


// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
    
    // Delete Book From UI
    UI.deleteBook(e.target);

    // console.log(e.target.parentElement.previousElementSibling.innerText)
    // Delete Book From localStorage
    Store.removeBooks(e.target.parentElement.previousElementSibling.innerText)
    // // Show Delete Alert Message
     UI.showAlert("Book Deleted Successfully","success")

})