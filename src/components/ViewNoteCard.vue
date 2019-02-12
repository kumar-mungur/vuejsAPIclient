<template>
  <div>
    <div class="col p-0 clearfix">
      <div
        v-if="belongsToUser"
        class="btn-group float-right"
        role="group"
        aria-label="Menu"
      >
        <router-link
          class="btn btn-secondary"
          v-bind:to="'/'"
        >Home</router-link>
        <router-link
          v-on="openEditNote"
          class="btn btn-secondary"
          v-bind:to="'/note/edit/' + note.id"
        >Edit</router-link>
        <div class="dropdown-divider"></div>
        <router-link
          v-on:click.native="openDeleteNote(note.id)"
          v-bind:title="note.title"
          class="btn btn-secondary"
          v-bind:to="'/note/' + note.id"
        >Delete</router-link>
      </div>
      <router-link
        v-if="!belongsToUser"
        class="btn btn-secondary float-right"
        v-bind:to="'/'"
      >Home</router-link>
    </div>
    <transition name="zoom">
      <div
        v-if="dataReady"
        class="card shadow-sm mt-4"
        v-bind:class="note.theme"
      >
        <div class="card-body">

          <h5 class="card-title">
            {{ note.title }}
          </h5>
          <p class="card-text">{{ note.body }}</p>
          <p><small>Created: {{note.created_at}} | Last Updated: {{note.updated_at}}</small></p>

        </div>
      </div>
    </transition>

    <modal-overlay v-if="showDeleteConfirmationModal"></modal-overlay>
    <delete-confirmation-modal
      v-if="showDeleteConfirmationModal"
      v-bind:note="note"
      v-on:cancel="closeDeleteNote"
      v-on:confirm="deleteNote"
    ></delete-confirmation-modal>

  </div>
</template>

<script>
import { mapState } from "vuex";
import DeleteConfirmationModal from "./DeleteConfirmationModal.vue";
import ModalOverlay from "./ModalOverlay.vue";
export default {
  components: {
    "delete-confirmation-modal": DeleteConfirmationModal,
    "modal-overlay": ModalOverlay
  },
  computed: {
    ...mapState({
      dataReady: "dataReady",
      showDeleteConfirmationModal: "showDeleteConfirmationModal"
    }),
    loggedIn: function () {
      return this.$store.getters.loggedIn
    },
    getUserId: function () {
      return this.$store.getters.getUserId
    }
  },
  data () {
    return {
      id: this.$route.params.id,
      note: {},
      belongsToUser: false
    };
  },
  methods: {
    fetchNote: function (id) {
      this.$store.dispatch("fetchNote", id).then(response => {
        this.note = response.data.data;
        const noteId = parseInt(this.note.user_id)
        if (noteId === this.getUserId) {
          this.belongsToUser = true
        } else {
          this.belongsToUser = false
        }
        this.$store.dispatch("dataReady", true)
      });
    },
    openEditNote: function () {
      this.$store.dispatch("dataReady", false)
    },
    openDeleteNote: function (id) {
      this.$store.dispatch('openDeleteNote', id)
    },
    closeDeleteNote: function () {
      this.$store.dispatch('closeDeleteNote')
    },
    deleteNote: function () {
      this.$store.dispatch('deleteNote', this.$store.state.selectedIdForDeletion)
        .then(() => {
          this.$store.dispatch("notify", {
            type: "success",
            message: "Note successfully! deleted"
          });
          this.$store.dispatch("hideLoader")
          this.$router.push({ name: 'userNotes' })
        });
    }
  },
  beforeCreate () {
    this.$store.dispatch('dataReady', false)
  },
  mounted () {
    this.fetchNote(this.id);
  },
  updated () {
    this.$store.dispatch("hideLoader");
  }
};
</script>

<style scoped>
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
</style>
