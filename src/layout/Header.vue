<template>
  <div>
    <header>
      <div
        class="collapse bg-dark"
        id="navbarHeader"
      >
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">About</h4>
              <p class="text-muted">{{siteVars.aboutMessage}}</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Contact</h4>
              <ul class="list-unstyled">
                <li><a
                    v-bind:href="`mailto:${siteVars.contactEmail}`"
                    class="text-white"
                  >Email me</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar navbar-dark bg-dark shadow-sm">
        <div class="container d-flex justify-content-between">
          <router-link
            v-bind:to="'/'"
            class="navbar-brand d-flex align-items-center"
          >
            <img
              class="mr-2"
              src="../assets/logo.png"
              alt="Notes"
              focusable="false"
              aria-hidden="true"
              width="50"
              height="50"
            >
            <strong>{{siteVars.siteName}}</strong>
          </router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </header>
    <user-menu></user-menu>
    <add-note-modal v-if="['home', 'dashboard', 'userNotes'].includes($route.name)"></add-note-modal>
  </div>
</template>

<script>
import AddNoteModal from "../components/AddNoteModal.vue";
import UserMenu from "../components/UserMenu.vue";
export default {
  components: {
    "add-note-modal": AddNoteModal,
    "user-menu": UserMenu
  },
  data () {
    return {
      siteVars: this.$store.state.siteVars
    };
  },
  methods: {}
};
</script>

<style scoped>
</style>
