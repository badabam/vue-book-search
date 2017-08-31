Vue.component('hintbar', {
  template: `
  <div class="hintbar" v-html="htmlText"></div>
  `,
  props: ['text'],
  computed: {
    htmlText() {
      return 'Hint: ' + this.text;
    }
  }
});
