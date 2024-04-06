import QmathConfig from '../data/qmath-config';

// // TODO: Change button style

class ConfigurationDrawer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  get config() {
    return QmathConfig.getAllConfig();
  }

  set error(error) {
    this._error = error;
    this._refreshErrorElement();
    this.querySelector('#configuration-drawer').checked = true;
  }

  render() {
    this.innerHTML = `
      <div class="drawer drawer-end">
        <input id="configuration-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <label id="configuration-button" for="configuration-drawer" class="drawer-button btn btn-ghost btn-md text-lg"><i class="fa-solid fa-gear"></i></label>
        </div>
        <div class="drawer-side z-10">
          <label for="configuration-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
          ${this._getSidebarTemplate()}
        </div>
      </div>
    `;

    this.configurationButton = this.querySelector('#configuration-button');

    this.configurationForm = this.querySelector('#configuration-form');
    this.configurationForm.addEventListener('change', this.pushConfig.bind(this));
    this.addEventListener('click', this.querySelector('#configuration-drawer').click.bind(this));

    this.pullConfig();
  }

  disabled() {
    this.configurationForm.addition.disabled = true;
    this.configurationForm.substraction.disabled = true;
    this.configurationForm.multiplication.disabled = true;
    this.configurationForm.division.disabled = true;
    this.configurationForm.character.disabled = true;
    this.configurationForm.level.disabled = true;
    this.configurationButton.classList.replace('btn-ghost', 'btn-disabled');
    this.setAttribute('class', 'pointer-events-none');
  }

  enabled() {
    this.configurationForm.addition.disabled = false;
    this.configurationForm.substraction.disabled = false;
    this.configurationForm.multiplication.disabled = false;
    this.configurationForm.division.disabled = false;
    this.configurationForm.character.disabled = false;
    this.configurationForm.level.disabled = false;
    this.configurationButton.classList.replace('btn-disabled', 'btn-ghost');
    this.removeAttribute('class');
  }

  _refreshErrorElement() {
    const errorMessageElement = this.querySelector('#error-message');
    if (this._error) {
      errorMessageElement.classList.remove('hidden');
      errorMessageElement.innerText = this._error;
    } else {
      errorMessageElement.classList.add('hidden');
    }
  }

  pushConfig() {
    this._config = {
      options: {
        addition: this.configurationForm.addition.checked,
        substraction: this.configurationForm.substraction.checked,
        multiplication: this.configurationForm.multiplication.checked,
        division: this.configurationForm.division.checked,
        character: this.configurationForm.character.checked,
      },
      level: this.configurationForm.level.value,
    };
    QmathConfig.saveConfig(this._config);
  }

  pullConfig() {
    this._config = QmathConfig.getAllConfig();

    if (this._config.error) { return; }
    this.configurationForm.addition.checked = this._config.options.addition;
    this.configurationForm.substraction.checked = this._config.options.substraction;
    this.configurationForm.multiplication.checked = this._config.options.multiplication;
    this.configurationForm.division.checked = this._config.options.division;
    this.configurationForm.character.checked = this._config.options.character;
    this.configurationForm.level.value = this._config.level;
  }

  _getSidebarTemplate() {
    return `
      <form id="configuration-form"
        class="form-control flex flex-col gap-4 *:h-fit items-center menu w-80 min-h-full bg-base-200 text-base-content p-8">
        <div class="w-full items-center flex">
          <h2 class="flex-grow text-xl font-bold">Configuration</h2>
          <label for="configuration-drawer" class="drawer-button btn btn-outline btn-sm" aria-label="close sidebar">Close</label>
        </div>
        <div> 
          <p id="error-message" class="hidden text-error"></p>
        </div>
        <div class="divider">Mode </div>
        <div class="flex gap-4">
          <label class="flex items-center cursor-pointer aspect-square btn-neutral">
            <input id="addition" type="checkbox" class="hidden" />
            <span class="label-text block select-none h-fit aspect-square">+</span>
          </label>
          <label class="flex items-center cursor-pointer aspect-square btn-neutral">
            <input id="substraction" type="checkbox" class="hidden" />
            <span class="label-text block select-none h-fit aspect-square">-</span>
          </label>
          <label class="flex items-center cursor-pointer aspect-square btn-neutral">
            <input id="multiplication" type="checkbox" class="hidden" />
            <span class="label-text block select-none h-fit aspect-square">x</span>
          </label>
          <label class="flex items-center cursor-pointer aspect-square btn-neutral">
            <input id="division" type="checkbox" class="hidden" />
            <span class="label-text block select-none h-fit aspect-square">/</span>
          </label>
          <label class="flex items-center cursor-pointer aspect-square btn-neutral">
            <input id="character" type="checkbox" class="hidden" />
            <span class="label-text block select-none h-fit aspect-square">A</span>
          </label>
        </div>
        <div class="divider">Level </div>
        <div class="flex flex-col gap-4 items-center justify-center">
          <input id="level" type="range" min="1" max="4" value="1" class="range" step="1" />
          <div class="w-full flex justify-between text-xs px-2 gap-6">
            <span>easy</span>
            <span>normal</span>
            <span>medium</span>
            <span>hard</span>
          </div>
        </div>
      </form>
    `;
  }
}
customElements.define('configuration-drawer', ConfigurationDrawer);
