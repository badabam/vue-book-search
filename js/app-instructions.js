new Vue({
  el: 'app-instructions',
  template: `
  <aside
    class="instructions"
    v-bind:class="{fadeout: fadeout}"
    v-html="i18n.htmlText">
  </aside>
  `,
  data: {
    i18n: i18n.instructions,
    fadeout: false
  },
  mounted() {
    setTimeout(() => this.fadeout = true);
  }
});
