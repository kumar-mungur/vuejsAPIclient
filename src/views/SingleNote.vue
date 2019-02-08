<template>
<main role="main">
  <div class="notes py-5 bg-light">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col">
          <edit-note-card v-if="['editNote'].includes($route.name)"></edit-note-card>
          <view-note-card v-if="['viewNote'].includes($route.name)"></view-note-card>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import ViewNoteCard from "../components/ViewNoteCard.vue";
import EditNoteCard from "../components/EditNoteCard.vue";
export default {
  components: {
    "view-note-card": ViewNoteCard,
    "edit-note-card": EditNoteCard
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
</style>
