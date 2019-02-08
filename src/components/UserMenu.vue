<template>
  <section class="container mt-4">
    <div class="row">
      <div class="col">
        <ul class="nav justify-content-end">
          <li class="nav-item">
            <router-link
              class="nav-link"
              v-bind:to="'/'"
            >All Notes</router-link>
          </li>
          <li
            v-if="!loggedIn"
            class="nav-item"
          >
            <router-link
              class="nav-link"
              v-bind:to="'/login'"
            >Login</router-link>
          </li>
          <li
            v-if="!loggedIn"
            class="nav-item"
          >
            <router-link
              class="nav-link"
              v-bind:to="'/register'"
            >Register</router-link>
          </li>
          <li
            v-if="loggedIn"
            class="nav-item"
          >
            <router-link
              class="nav-link"
              v-bind:to="'/dashboard'"
            >Dashboard</router-link>
          </li>
          <li
            v-if="loggedIn"
            class="nav-item"
          >
            <router-link
              class="nav-link"
              v-bind:to="'/my-notes'"
            >My Notes</router-link>
          </li>
          <li
            v-if="loggedIn"
            class="nav-item"
          >
            <router-link
              class="nav-link"
              v-bind:to="'/logout'"
            >Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    loggedIn: function () {
      return this.$store.getters.loggedIn
    }
  }
};
</script>

<style scoped>
</style>
