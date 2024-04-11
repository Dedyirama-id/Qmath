class HowTo extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <button class="btn btn-md btn-ghost text-lg aspect-square" onclick="how_to_modal.showModal()"><i class="fa-regular fa-circle-question"></i></button>
      <dialog id="how_to_modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box flex flex-col gap-2">
          <div>
            <h3 class="font-bold text-xl">🚀 How To Start?</h3>
            <div class="divider"></div>
          </div>
          <ul class="list-decimal pl-4">
            <li>Click <b>configuration button</b> (<i>gear icon</i>) on the top-right.</li>
            <li>Select your counting option.</li>
            <li>Select your level.</li>
            <li>Click <b>Start Counting</b> button.</li>
            <li>Answer the question with typing the correct answer. If your answer is correct the question will change to the next question automatically.</li>
            <li>Click <b>Finish Counting</b> or Enter to stop counting.</li>
          </ul>
          <p>Tips: Mathematical equation questions are answered with calculated numbers. If the question is a letter/character, answer with the sequence number of the letter in the alphabet. For example, A = 1, J = 10.</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    `;

    const howToModal = document.getElementById('how_to_modal');
    howToModal.addEventListener('click', (event) => {
      event.preventDefault();
      howToModal.close();
    });
  }
}

customElements.define('how-to', HowTo);
