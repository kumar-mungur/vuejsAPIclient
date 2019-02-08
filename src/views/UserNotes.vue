<template>
  <main role="main">

    <div class="notes py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col">
            <pagination
              :data="notes"
              @pagination-change-page="fetchUserNotes"
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
            <note-card
              v-bind:note="note"
              v-on:openDeleteUserNote="openDeleteUserNote(note)"
            ></note-card>
          </div>
          <modal-overlay v-if="showDeleteConfirmationModal"></modal-overlay>
          <delete-confirmation-modal
            v-if="showDeleteConfirmationModal"
            v-bind:note="selectedNoteForDeletion"
            v-on:cancel="closeDeleteUserNote"
            v-on:confirm="deleteNote"
          ></delete-confirmation-modal>
        </div>
        <div class="row">
          <div class="col">
            <pagination
              :data="notes"
              @pagination-change-page="fetchUserNotes"
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
import DeleteConfirmationModal from "../components/DeleteConfirmationModal.vue";
import ModalOverlay from "../components/ModalOverlay.vue";

export default {
  components: {
    "note-card": NoteCard,
    "delete-confirmation-modal": DeleteConfirmationModal,
    "modal-overlay": ModalOverlay
  },
  computed: {
    ...mapState({
      dataReady: "dataReady",
      showDeleteConfirmationModal: "showDeleteConfirmationModal",
      notes: "userNotes",
      selectedNoteForDeletion: "selectedNoteForDeletion"
    })
  },
  data () {
    return {
      noData: false
    };
  },
  methods: {
    fetchUserNotes: function (page = 1) {
      this.$store.dispatch("clearUserNotes")
      this.$store.dispatch("fetchUserNotes", page)
        .then((response) => {
          if (response.data.length == 0) {
            this.noData = true;
          }
        })
    },
    openDeleteUserNote: function (note) {
      this.$store.dispatch('openDeleteUserNote', note)
    },
    closeDeleteUserNote: function () {
      this.$store.dispatch('closeDeleteUserNote')
    },
    deleteNote: function () {
      this.$store.dispatch('deleteNote', this.$store.state.selectedIdForDeletion)
        .then(() => {
          this.$store.dispatch("fetchUserNotes");
        })
    }
  },
  created () {
    this.fetchUserNotes();
  },
  mounted () {

  }
};
</script>

<style scoped>
</style>
