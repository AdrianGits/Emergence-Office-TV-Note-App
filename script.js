const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = document.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                'August', 'September', 'October', 'November', 'December' ];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isEdit = false, editId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
    addBtn.innerText = "Add Note";
    popupTitle.innerText = "Add a new note";
});

closeIcon.addEventListener("click", () => {
    isEdit = false;
    // addBtn.innerText = "Add Note";
    // popupTitle.innerText = "Add a new note";
    titleTag.value = "";
    descTag.value = "";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `        <li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span>${note.description}</span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="note-actions">
                <span onclick="editNote(${index}, '${note.title}', '${note.description}' )"><i class="uil uil-pen"></i></span>
                <span onclick="deleteNote(${index})"><i class="uil uil-trash"></i></span>
            </div>


        </div>
    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

//Place between span note date and last div
            // <div class="settings">
            //     <i onClick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            //     <ul class="menu">
            //         <li onclick="editNote(${index}, '${note.title}', '${note.description}' )"><i class="uil uil-pen"></i>Edit</li>
            //         <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
            //     </ul>
            // </div>

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    })
}

function editNote(noteId, title, desc) {
    isEdit = true;
    editId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "Update Note";
    popupTitle.innerText = "Update note";
}

function deleteNote(noteId) {
    // Delete note confirmation
    // let confirmDel = confirm("Are you sure you want to delete this note?");
    // if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc) {
        let dateObj = new Date(),
        day = dateObj.getDate(),
        month = months[dateObj.getMonth()],
        year = dateObj.getFullYear();
        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${day} ${month}, ${year}`
        }
        if(!isEdit) {
            notes.push(noteInfo);
        } else {
            isEdit = false;
            notes[editId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    }
});