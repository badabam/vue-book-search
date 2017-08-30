Vue.component('hintbar', {
  template: `
  <div class="hintbar" v-html="text"></div>
  `,
  props: ['text']
});
