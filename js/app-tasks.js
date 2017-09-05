new Vue({
  el: 'app-tasks',
  template: `
    <div className="app-tasks__wrapper">
      <button
        @click="isShowingTasks = true"
        v-if="!isShowingTasks"
        class="app-tasks__button">
        {{i18n.button}}
      </button>
      <section v-if="isShowingTasks" v-bind:class="{'app-tasks': isShowingTasks}">
        <div @click="isShowingTasks = false" v-if="isShowingTasks" class="app-tasks__close">&times;</div>
        <h3>{{i18n.headline}}</h3>
        <ol>
          <li v-for="task, index in i18n.tasks" v-bind:class="{strike: checked[index]}" @click="check(index)">{{task}}</li>
        </ol>
      </section>
    </div>
  `,

  data() {
    return {
      isShowingTasks: false,
      checked: [false, false, false, false],
      i18n: i18n.tasks
    };
  },

  methods: {
    check(index) {
      Vue.set(this.checked, index, !this.checked[index]);
    }
  }
});
