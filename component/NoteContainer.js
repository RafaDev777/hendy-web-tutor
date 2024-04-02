import "./NoteCard.js";
import "./SearchBar.js";
import { notes } from "../data/data.js";

class NoteContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render(notes);
    this.hideCardListener();
    this.searchListener();
    this.addNoteListener()
  }

  render(notes) {
    this.shadowRoot.innerHTML = `
      <style>
        .note-container {
          border-style: solid;
          border-width: 5px;
          border-color:blue;
          border-radius: 25px;
          padding:20px
        }
      </style>
      <div class="note-container">
        <search-bar></search-bar>
        <div class="note-list-container"></div>
      </div>
    `;
    this.filteredNotes = [...notes];
    this.renderNotes(this.filteredNotes);
  }

  renderNotes(notes) {
    const noteContainer = this.shadowRoot.querySelector(".note-list-container");
    noteContainer.innerHTML = '';
    notes.forEach((note) => {
      const noteCard = document.createElement("note-card");
      noteCard.setAttribute("title", note.title);
      noteCard.setAttribute("body", note.body);
      noteCard.setAttribute("createdAt", note.createdAt);
      noteCard.setAttribute("class", "note-card");
      noteContainer.appendChild(noteCard);
    });
  }

  hideCardListener() {
    this.shadowRoot.addEventListener('hideNoteCard', (event) => {
      const index = event.detail.index;
      const noteCards = this.shadowRoot.querySelectorAll('.note-card');
      noteCards[index].style.display = 'none';
    });

  }

  searchListener() {
    const searchBar = this.shadowRoot.querySelector('search-bar');
    searchBar.addEventListener('search', (event) => {
      const searchTerm = event.detail.searchTerm;
      this.filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm));
      this.renderNotes(this.filteredNotes);
    });

  }

  addNoteListener() {
    console.log("add note listener")
    document.addEventListener("noteAdded", (event) => {
      console.log("add note ready to listen")
      const newNote = event.detail.note;
      console.log("newNote-dettal", newNote)
      notes.push(newNote);
      console.log("notes psuh", notes)
      this.filteredNotes = [...notes]
      this.renderNotes(this.filteredNotes);
    })
  }

}
customElements.define("note-container", NoteContainer);
