new Vue({
  el: 'app-header',
  template: `
  <header class="header">
    <img class="logo" src="img/logo.png" alt="Libri">
    <div class="links">
      <a class="selected">{{i18n.bibliography}}</a>
      <a>{{i18n.cart}}</a>
    </div>
    <div class="login">
      <a>{{i18n.name}}</a>
      <img class="head" src="img/icon-doerte.svg" alt="">
    </div>
  </header>
  `,
  data() {
    return {
      i18n: i18n.header
    }
  }
});
