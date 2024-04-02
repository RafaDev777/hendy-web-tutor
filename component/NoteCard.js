class NoteCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
    this.hideCardListeners()
  }

  render() {
    const title = this.getAttribute("title");
    const body = this.getAttribute("body");
    const createdAt = this.getAttribute("createdAt");
    this.shadowRoot.innerHTML = `
<style>
.note-card {
color:red;
border-width:5px;
border-style:solid;
border-color:gray;
border-radius: 20px;
margin-top:10px;
margin-bottom:10px;
padding: 15px 10px;
display: flex;
flex-direction:row;
align-items: center;

}

.note-card > input{
width:20px;
height:20px;
margin-right:20px;
}

.note-card-content > h2{
margin-top:-10px;
}
</style>
<div class="note-card">
  <input type="checkbox" class="note-checkbox">
  <div class="note-card-content">
  <h2>${title}</h2>
  <p>${body}</p>
  <small>${createdAt}</small>
  </div>
</div>
`;
  }

  hideCardListeners() {
    console.log('event listener set up')
    const noteCheckBox = this.shadowRoot.querySelector('.note-checkbox')
    noteCheckBox.addEventListener('change', () => {
      if (noteCheckBox.checked) {
        this.closest('.note-container').removeChild(this)
      }
    })
  }

}

customElements.define("note-card", NoteCard);
