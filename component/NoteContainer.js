import "./NoteCard.js";
// ini import untuk ngambil data, makanya di data kita export constnya
import { notes } from "../data/data.js";

class NoteContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    // nah di sini notes tadi di masukin layaknya function javascript pada
    // umumnya
    this.render(notes);
  }

  render(notes) {
    // nah di sini lo render pertama div containernya
    this.shadowRoot.innerHTML = `
      <div class="note-container">
      </div>
      `;
    // nah ini di siapin sebagai selector nanti
    // ini kita milih element yang punya kelas "note-container"
    const noteContainer = this.shadowRoot.querySelector(".note-container");
    // nah di sini proses mulai kita ngerender si note-card
    // nah di sini si notes ini kan isinya array, kita bisa pake forEach buat
    // breakdown setiap object di array,
    notes.forEach((note) => {
      // nah d sini kita kasih function untuk setiap note yang ada, kita mau
      // ngapain
      // nah ini kita mau createElement <note-card>
      const noteCard = document.createElement("note-card");
      // di sini ktia tambahin attribut untuk si note card
      // <note-card title={note.title}>
      noteCard.setAttribute("title", note.title);
      // <note-card title={note.title} body={note.body}>
      noteCard.setAttribute("body", note.body);
      // <note-card title={note.title} body={note.body} createdAt={note.createdAt}>
      noteCard.setAttribute("createdAt", note.createdAt);
      // nah di sini kita minta noteContainer yang kita pilih di atas tadi,
      // untuk masukin si element yang baru kita buat ini <note-card att...>
      noteContainer.appendChild(noteCard);
    });
  }
}

customElements.define("note-container", NoteContainer);
