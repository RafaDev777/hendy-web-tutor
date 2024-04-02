class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" })
  }

  connectedCallback() {
    this.render()
    this.addNoteListener()
  }

  render() {
    this.shadowRoot.innerHTML = `
      <form id="note-form">
        <label for="title">Title:</label></br>
        <input type="text" id="title" name="title"></br>
        <label for="body">Description:</label></br>
        <textarea type="text" id="body" name="body"></textarea></br>
        <button type="submit">Add Note</button>
      </form>
    `
  }

  addNoteListener() {
    console.log("noteform listener")
    const noteForm = this.shadowRoot.querySelector("#note-form");
    noteForm.addEventListener("submit", (event) => {
      console.log("click")
      event.preventDefault();
      const formData = new FormData(noteForm);
      console.log("form data:", formData)
      const newNote = {};
      for (const [key, value] of formData.entries()) {
        newNote[key] = value;
      }
      console.log("newNote:", newNote)

      this.dispatchEvent(new CustomEvent("noteAdded", { detail: { note: newNote } }))
      noteForm.reset();
    })
  }
}

customElements.define("note-form", NoteForm)
