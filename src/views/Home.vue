<template>
  <main role="main">

    <div class="notes py-5">
      <div class="container">
        <div class="row">
          <div class="col">
            <pagination
              :data="notes"
              @pagination-change-page="fetchNotes"
              class="justify-content-center"
            ></pagination>
          </div>
        </div>
        <div class="row">
          <div
            v-if="noData"
            class="col"
          >
            <p class="text-center">There are currently no notes on record.</p>
          </div>
          <div
            v-for="note in notes.data"
            v-bind:key="note.id"
            class="col-md-4"
          >
            <note-card v-bind:note="note"></note-card>
          </div>

        </div>
        <div class="row">
          <div class="col">
            <pagination
              :data="notes"
              @pagination-change-page="fetchNotes"
              class="justify-content-center"
            ></pagination>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import NoteCard from "../components/NoteCard.vue";


export default {
  components: {
    "note-card": NoteCard
  },
  computed: {
    ...mapState({
      notes: "notes",
    })
  },
  data () {
    return {
      noData: false
    };
  },
  methods: {
    fetchNotes: function (page = 1) {
      this.$store.dispatch("clearNotes")
      this.$store.dispatch("fetchNotes", page)
        .then((response) => {
          if (response.data.length == 0) {
            this.noData = true;
          }
        })
    }
  },
  created () {
    this.fetchNotes();
  },
  mounted () {

  }
};
</script>

<style scoped>
</style>
