<template>
  <div>
    <site-header />
    <router-view></router-view>
    <site-footer />
    <notification-toast></notification-toast>
    <loader></loader>
  </div>
</template>

<script>
import Header from "./layout/Header.vue";
import Footer from "./layout/Footer.vue";
import NotificationToast from "./components/NotificationToast.vue";
import Loader from "./components/Loader.vue";

export default {
  components: {
    "site-header": Header,
    "site-footer": Footer,
    "notification-toast": NotificationToast,
    "loader": Loader
  },
  data () {
    return {};
  },
  methods: {}
};
</script>

<style>
/* Sticky footer styles
-------------------------------------------------- */
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 60px; /* Margin bottom by footer height */
}
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Set the fixed height of the footer here */
  line-height: 60px; /* Vertically center the text there */
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
