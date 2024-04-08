const ScrollTo = {
  element(element) {
    element.scrollIntoView({ behavior: 'smooth' });
  },

  top() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
};

export default ScrollTo;
