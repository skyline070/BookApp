document.querySelector("#book-form").addEventListener("submit",function(x){
 x.preventDefault()

    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    let isbn = document.querySelector("#isbn").value

    if(title == '' || author == '' || isbn == ""){
        alert("Please Fill All The Fields")
    }else{
        let list = document.querySelector("#book-list")
        let row = document.createElement("tr") //<tr></tr>
        row.innerHTML = `
        <td>${title}</td>
        <td>${author}</td>
        <td>${isbn}</td>
        <td><a href="#" class="btn btn-danger delete">X</a></td>
        `
       // console.log(row)
        list.appendChild(row)
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = ''
        document.querySelector("#isbn").value = ''
    }
})
document.querySelector("#book-list").addEventListener("click",function(sumi){
    if(sumi.target.classList.contains("delete")){
        const response = confirm("Are U Sure You Want To Delete This")
        if(response){
        let element = sumi.target.parentElement.parentElement
        let list = document.querySelector("#book-list")  
        list.removeChild(element)
        alert("BooK Deleted Successfully");
        }
    }
})