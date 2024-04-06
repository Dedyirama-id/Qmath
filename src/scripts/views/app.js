import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

// TODO: Add skip to content
// // TODO: Add help button (?)
// // TODO: Add update log button (!)
// // TODO: Optimize app

class App {
  constructor({ content }) {
    this._content = content;
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = '';
    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();
      // const skipLinkElement = document.querySelector('#skip-to-content');
      // skipLinkElement.addEventListener('click', (event) => {
      //   event.preventDefault();
      //   document.querySelector('#main-content').focus();
      // });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('🚀 ~ App ~ renderPage ~ error:', error);
    }
  }
}

export default App;
