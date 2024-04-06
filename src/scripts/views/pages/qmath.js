const Qmath = {
  async render() {
    return `
      <div class="hero grow bg-base-200 h-full">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="text-center lg:text-left">
          </div>
          <qmath-panel></qmath-panel>
        </div>
      </div>
    `;
  },

  async afterRender() {
    // Do something
  },

};

export default Qmath;
