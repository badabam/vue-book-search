new Vue({
  el: 'app-header',
  template: `
  <header class="header">
    <img class="logo" src="img/logo.png" alt="Libri">
    <div class="links">
      <a class="selected">Bibliografie</a>
      <a>Warenkörbe</a>
    </div>
    <div class="login">
      <a>Thomas</a>
      <img class="head" src="img/icon-doerte.svg" alt="">
    </div>
  </header>
  `
});
