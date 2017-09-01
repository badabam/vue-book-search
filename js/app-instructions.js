new Vue({
  el: 'app-instructions',
  template: `
  <aside
    class="instructions"
    v-bind:class="{fadeout: fadeout}"
    v-html="i18n.instructions.htmlText">
  </aside>
  `,
  data: {
    i18n: i18n,
    fadeout: false
  },
  mounted() {
    setTimeout(() => this.fadeout = true);
  }
});
