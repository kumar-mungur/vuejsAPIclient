<template>
  <footer class="text-muted">
    <div class="container">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>Need help? <a v-bind:href="siteVars.repositoryLink">Visit the repository</a> and <a v-bind:href="siteVars.issueReportingLink">report an issue</a> to get help.</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      siteVars: this.$store.state.siteVars
    };
  }
};
</script>

<style scoped>
</style>
