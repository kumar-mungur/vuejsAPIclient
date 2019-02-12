<template>
  <main role="main">

    <div class="notes py-5">
      <div class="container">
        <div class="row">
          <div class="col col-lg-2">
            &nbsp;
          </div>
          <div class="col-md-8">
            <h3 class="text-center">
              User Dashboard
            </h3>
            <p
              v-if="!loggedIn"
              class="text-center"
            >
              Please log in to access this page.
            </p>
            <p
              v-if="loggedIn"
              class="text-center"
            >
              Welcome<span>, {{username}}</span>
            </p>
            <ul
              v-if="loggedIn"
              class="nav justify-content-center"
            >
              <li class="nav-item">
                <router-link
                  class="nav-link disabled"
                  v-bind:to="'/dashboard'"
                >Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  v-bind:to="'/my-notes'"
                >My Notes</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  v-bind:to="'/logout'"
                >Logout</router-link>
              </li>
            </ul>
            <home-link></home-link>
          </div>
          <div class="col col-lg-2">
            &nbsp;
          </div>
        </div>
      </div>
    </div>

  </main>
</template>

<script>
import HomeLink from "../components/HomeLink.vue";
import changeCase from "../filters/changeCase";
export default {
  mixins: [changeCase],
  components: {
    "home-link": HomeLink
  },
  computed: {

    loggedIn: function () {
      return this.$store.getters.loggedIn
    },
    username: function () {
      return this.$store.getters.getUserName
    }
  },
  methods: {
  },
  mounted () {

  }
};
</script>

<style scoped>
</style>
