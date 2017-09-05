new Vue({
  el: 'app-tasks',
  template: `
    <div className="app-tasks__wrapper">
      <button
        @click="isShowingTasks = true"
        v-if="!isShowingTasks"
        class="app-tasks__button">
        Suchbeispiele anzeigen
      </button>
      <section v-if="isShowingTasks" v-bind:class="{'app-tasks': isShowingTasks}">
        <div @click="isShowingTasks = false" v-if="isShowingTasks" class="app-tasks__close">&times;</div>
        <h3>Mögliche Suchanfragen:</h3>
        <ol>
        <li v-bind:class="{strike: checked[0]}" @click="check(0)">
        Ich suche ein Buch von "Richard David Precht". Irgendwas mit "Liebe".
        </li>
        <li v-bind:class="{strike: checked[1]}" @click="check(1)">
          Haben Sie etwas zum Thema "Kartenkunst" oder "Spielkarten"?
        </li>
        <li v-bind:class="{strike: checked[2]}" @click="check(2)">
          Ich suche eine besonders schöne Bibel auf französisch oder italienisch als Geschenk. Mindestens 200 Euro wert.
        </li>
        <li v-bind:class="{strike: checked[3]}" @click="check(3)">
          Ich suche die "Herr der Ringe" BluRay Special Edition. Ist letztes Jahr erst erschienen.
        </li>
        </ol>
      </section>
    </div>
  `,

  data() {
    return {
      isShowingTasks: false,
      checked: [false, false, false, false],
    };
  },

  methods: {
    check(index) {
      Vue.set(this.checked, index, !this.checked[index]);
    }
  }
});
