Vue.component('hintbar', {
  template: `
  <div class="hintbar" v-html="htmlText"></div>
  `,
  props: ['text'],
  computed: {
    htmlText() {
      return i18n.hintbar.prefix + this.text;
    }
  }
});
