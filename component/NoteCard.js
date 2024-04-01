class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    // ini buat narik data dari attribute yang di kasih
    // <note-card title={note.title} body={note.body} createdAt={note.createdAt}
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = this.getAttribute("createdAt");
    // dan ini akhirnya ngerender seperti biasa
    this.shadowRoot.innerHTML = `
<div class="note-card">
  <h1>${title}</h1>
  <p>${body}</p>
  <small>${createdAt}</small>
</div>
`;
  }
}

customElements.define("note-card", NoteCard);
