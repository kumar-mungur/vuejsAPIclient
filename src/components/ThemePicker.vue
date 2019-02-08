<template>
  <div class="dropdown-item">
    <div class="current-theme-wrapper"><span class="current-theme-text">Current theme: </span><span
        class="theme-picker-item current-theme"
        v-bind:class="selectedTheme"
      >Aa</span></div>
    <div
      v-for="(theme, index) in themes"
      v-bind:key="index"
    >
      <div
        v-on:click="changeTheme(theme)"
        class="theme-picker-item"
        v-bind:class="theme"
      >Aa</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["themes", "currentTheme"],
  data () {
    return {
      selectedTheme: this.currentTheme
    };
  },
  methods: {
    changeTheme: function (theme) {
      this.selectedTheme = theme;
      this.$emit("applytheme", this.selectedTheme);
    }
  },
  mounted () { }
};
</script>
<style scoped>
.dropdown-item {
  overflow: hidden;
}
.theme-picker-item {
  width: 20px;
  height: 20px;
  font-size: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  margin: 3px;
  float: left;
  cursor: pointer;
}
.current-theme-wrapper {
  clear: both;
  margin-bottom: 10px;
}
.current-theme {
  float: none;
  clear: both;
  padding: 3px;
  cursor: default;
}
</style>
<style>
.default {
  background-color: inherit;
  color: inherit;
}
.dark {
  background-color: #000 !important;
  color: #fff !important;
}
.blue {
  background-color: #1c5fcc !important;
  color: #fff !important;
}
.midnight {
  background-color: #090e16 !important;
  color: #fff !important;
}
.blood {
  background-color: #7a0a00 !important;
  color: #fff !important;
}
.forest {
  background-color: #014203 !important;
  color: #fff !important;
}
.lemon {
  background-color: #f0ff84 !important;
  color: #000 !important;
}
.sky {
  background-color: #b5fff7 !important;
  color: #000 !important;
}
.lavender {
  background-color: #f2b4ff !important;
  color: #000 !important;
}
</style>
