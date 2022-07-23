shownotes();

let btn = document.getElementById("addBtn");
btn.addEventListener('click', function () {
    let txtarea = document.querySelector('#addTxt');
    let note_title_area = document.querySelector("#titletxt");
    // let text = txtarea.innerHTML;
    let notesobj =[];
    let titleobj =[];
    let notes = localStorage.getItem('note');
    let titles = localStorage.getItem('title');
    if (notes == null, titles == null) {
        notesobj = [];
        titleobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }
    notesobj.push(txtarea.value);
    titleobj.push(note_title_area.value);
    localStorage.setItem("note", JSON.stringify(notesobj));
    localStorage.setItem("title", JSON.stringify(titleobj));
    txtarea.value = " ";
    note_title_area.value = " ";
    console.log(notesobj);
    console.log(titleobj);
    shownotes();
})

// Function to show/read elements from the local storage and display on the screen.
function shownotes() {
    let notes = localStorage.getItem('note');
    let titles = localStorage.getItem('title');
    if (notes == null, titles == null) {
        notesobj = [];
        titleobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="noteCards my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Note ${index + 1}:${titleobj[index]}</h5>
        <p class="card-text">${element}</p>
        <button id = ${index} onclick= "deletenote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesobj != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show,You cannot add any note.Please add.`;
    }
}

// function to delete a note:
function deletenote(index) {
    // console.log("Delete this note", index);
    let notes = localStorage.getItem('note');
    let titles = localStorage.getItem('title');
    if (notes == null, titles == null) {
        notesobj = [];
        titleobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }
    notesobj.splice(index, 1);
    titleobj.splice(index, 1);
    localStorage.setItem("note", JSON.stringify(notesobj));
    localStorage.setItem("title", JSON.stringify(titleobj));
    shownotes();
}

// To make the filter in the search button:
let srcbtn = document.querySelector('.frm #sbtn');
console.log(srcbtn);
srcbtn.addEventListener("click", function (e) {
    let search = document.querySelector('.frm #itxt');
    let inputTxt = search.value;
    // console.log(inputTxt);
    let cards = document.querySelectorAll(".noteCards");

    Array.from(cards).forEach(function (element) {
        // console.log(cards);
        // console.log("Input event Run.");
        let tag = element.getElementsByTagName('p')[0].innerText;
        // console.log(tag)
        if (tag.includes(inputTxt)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
    
    e.preventDefault();
})

