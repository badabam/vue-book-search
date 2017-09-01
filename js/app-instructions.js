new Vue({
  el: 'app-instructions',
  template: `
  <aside
    class="instructions"
    v-html="i18n.instructions.htmlText">
  </aside>
  `,
  data: {
    i18n: i18n
  }
});
