<template>
  <transition name="zoom">
    <div
      class="card mb-4 shadow-sm"
      v-bind:class="currentNote.theme"
    >

      <div class="card-body">

        <div
          v-if="['userNotes'].indexOf($route.name) > -1"
          class="dropdown float-right"
        >
          <button
            type="button"
            class="btn btn-sm btn-light dropdown-toggle"
            data-toggle="dropdown"
          >
            <img
              src="../assets/settings.png"
              alt="Settings"
            >
          </button>
          <div class="dropdown-menu dropdown-menu-right fade">
            <theme-picker
              v-bind:themes="themes"
              v-bind:currentTheme="currentNote.theme"
              v-on:applytheme="applyTheme"
            />
            <div class="dropdown-divider"></div>
            <router-link
              class="dropdown-item"
              v-bind:to="'/note/' + currentNote.id"
            >View</router-link>
            <router-link
              class="dropdown-item"
              v-bind:to="'/note/edit/' + currentNote.id"
            >Edit</router-link>
            <div class="dropdown-divider"></div>
            <router-link
              v-on:click.native="onDelete"
              class="dropdown-item"
              v-bind:to="'/my-notes'"
            >Delete</router-link>
          </div>
        </div>

        <h5 class="card-title">
          <router-link
            class="note-view-link"
            v-bind:to="'/note/' + currentNote.id"
          >
            {{ currentNote.title | truncateText(20) }}
          </router-link>
        </h5>
        <p class="card-text">
          <router-link
            class="note-view-link"
            v-bind:to="'/note/' + currentNote.id"
          >
            {{ currentNote.body | truncateText(70) }}
          </router-link>
        </p>
        <p><small>Created: {{note.created_at}} <br /> Last Updated: {{note.updated_at}}</small></p>

      </div>

    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import ThemePicker from "./ThemePicker.vue";
import textTruncate from "../filters/truncate";

export default {
  components: {
    "theme-picker": ThemePicker
  },
  mixins: [textTruncate],
  props: ["note"],
  computed: {
    ...mapState({
      themes: "themes"
    })
  },
  data () {
    return {
      currentNote: this.note,
    };
  },
  methods: {
    onDelete () {
      this.$emit("openDeleteUserNote");
    },
    applyTheme (theme) {
      const newNote = JSON.parse(JSON.stringify(this.currentNote));
      newNote.theme = theme
      this.currentNote = newNote
      this.$store.dispatch("applyTheme", newNote)
    }
  }
};
</script>

<style scoped>
a.note-view-link {
  text-decoration: none;
  color: inherit;
}
.btn-light {
  border-radius: 15px;
  padding: 0 4px;
}
.btn-light:hover {
  background: #ffffff;
}
.btn-light::after {
  display: none;
}
.btn-light img {
  width: 12px;
  margin-top: -3px;
}
.dropdown {
  top: -18px;
  right: -15px;
}
.dropdown-menu.fade {
  display: block;
  opacity: 0;
  pointer-events: none;
}
.dropdown-item {
  font-size: 12px;
}
.show > .dropdown-menu.fade {
  pointer-events: auto;
  opacity: 1;
}
</style>
