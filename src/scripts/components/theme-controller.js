class ThemeController extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="dropdown dropdown-end relative aspect-square">
        <div tabindex="0" role="button" class="btn btn-ghost">
          <i class="fa-solid fa-fill-drip"></i>
        </div>
        <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Auto" value="default"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="light"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Cupcake" value="cupcake"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Lofi" value="lofi"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Corporate" value="corporate"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Pastel" value="pastel"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Wireframe" value="wireframe"/></li>
          <li><input type="radio" name="theme-dropdown" class="btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/></li>
        </ul>
      </div>
    `;

    const themeDropdown = document.getElementsByName('theme-dropdown');
    themeDropdown.forEach((theme) => {
      theme.addEventListener('change', (event) => {
        this.setTheme(event.target.value);
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      const theme = localStorage.getItem('theme');
      if (theme) {
        this.querySelector(`input[value="${theme}"]`).checked = true;
      } else {
        this.querySelector('input[value="default"]').checked = true;
      }
    });
  }

  setTheme(themeValue) {
    document.documentElement.setAttribute('data-theme', themeValue);
    localStorage.setItem('theme', themeValue);
  }
}

customElements.define('theme-controller', ThemeController);
