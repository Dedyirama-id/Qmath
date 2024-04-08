class UpdateLogs extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getUpdateLogs();
  }

  async render() {
    this.innerHTML = `
      <button class="btn btn-md btn-ghost text-lg" onclick="update_logs_modal.showModal()"><i class="fa-solid fa-circle-info"></i></button>
      <dialog id="update_logs_modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box flex flex-col gap-4">
          <h3 class="font-bold text-xl">🌟 What's New?</h3>
          <div id="update-logs-container" >
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    `;

    const updateLogsModal = document.getElementById('update_logs_modal');
    updateLogsModal.addEventListener('click', (event) => {
      event.preventDefault();
      updateLogsModal.close();
    });

    const updateLogsData = await this.getUpdateLogs();
    const updateLogsContainer = document.getElementById('update-logs-container');

    updateLogsContainer.innerHTML = this._updateLogsInitiator(updateLogsData.updates);
  }

  async getUpdateLogs() {
    const response = await fetch('./data/update-logs.json');
    const data = await response.json();
    return data;
  }

  _updateLogsInitiator(updateLogs) {
    return updateLogs.map((updateLog) => this._updateItemInitiator(updateLog)).join('');
  }

  _updateItemInitiator(updateLog) {
    return `
      <div id="update-logs-container" class="divider divider-start mb-2 mt-8"><p class="text-lg font-semibold">Version: ${updateLog.version}</p></div>
      <div class="flex flex-col gap-2">
        <div>
          <h4 class="font-semibold">${updateLog.title}</h4>
          <p class="text-xs">${updateLog.date}</p>
        </div>
        <ul class="list-disc pl-4">
          ${(updateLog.descriptions) ? updateLog.descriptions.map((item) => `<li>${item}</li>`).join('') : ''}
        </ul>
      </div>
    `;
  }
}

customElements.define('update-logs', UpdateLogs);
