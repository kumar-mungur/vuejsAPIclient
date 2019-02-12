<template>

  <section
    class="container mt-4"
    v-if="loggedIn"
  >
    <div class="row">
      <div class="col text-right">
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="openAddNote"
        >Add Note</button>
      </div>
    </div>
    <modal-overlay v-if="showAddNoteModal"></modal-overlay>
    <transition
      name="fade"
      tag="div"
    >
      <div
        v-if="showAddNoteModal"
        class="add-modal modal"
        tabindex="-1"
        role="dialog"
      >
        <div
          class="modal-dialog"
          role="document"
        >
          <div class="modal-content">
            <div
              v-if="processSave"
              class="modal-process-spinner"
            >
              <div class="lds-dual-ring"></div>
            </div>
            <div class="modal-header">
              <h5 class="modal-title">Create new note</h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                v-on:click="closeAddNote"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <ul
                v-if="validationErrors.length"
                class="alert alert-danger form-errors"
              >
                <li
                  v-for="(validationError, index) in validationErrors"
                  v-bind:key="index"
                >{{validationError}}</li>
              </ul>
              <ul
                class="nav nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="pills-form-tab"
                    data-toggle="pill"
                    href="#pills-form"
                    role="tab"
                    aria-controls="pills-form"
                    aria-selected="true"
                  >Add new note</a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="pills-preview-tab"
                    data-toggle="pill"
                    href="#pills-preview"
                    role="tab"
                    aria-controls="pills-preview"
                    aria-selected="false"
                  >Note preview</a>
                </li>
              </ul>
              <div
                class="tab-content"
                id="pills-tabContent"
              >
                <div
                  class="tab-pane fade show active"
                  id="pills-form"
                  role="tabpanel"
                  aria-labelledby="pills-form-tab"
                >

                  <form>
                    <div class="form-group">
                      <input
                        class="form-control"
                        v-model="note.title"
                        type="text"
                        placeholder="Note Title"
                      >
                    </div>
                    <div class="form-group">
                      <input
                        class="form-control"
                        v-model="note.body"
                        type="text"
                        placeholder="Note Body"
                      >
                    </div>
                    <div class="form-group">

                      <button
                        type="button"
                        class="btn btn-sm float-right ml-1"
                        v-bind:class="note.theme"
                      >Current Theme</button>

                      <div class="dropdown float-right">
                        <button
                          type="button"
                          class="btn btn-sm btn-light dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Select Theme
                        </button>
                        <div class="dropdown-menu dropdown-menu-right fade">
                          <theme-picker
                            v-bind:themes="['default', 'dark', 'blue', 'midnight', 'blood', 'forest', 'lemon', 'sky', 'lavender']"
                            v-bind:currentTheme="note.theme"
                            v-on:applytheme="applyTheme"
                          />
                          <input
                            class="form-control"
                            v-model="note.theme"
                            type="hidden"
                          >
                        </div>
                      </div>
                    </div>
                  </form>

                </div>
                <div
                  class="tab-pane fade"
                  id="pills-preview"
                  role="tabpanel"
                  aria-labelledby="pills-preview-tab"
                >

                  <div
                    class="card shadow-sm mt-4"
                    v-bind:class="note.theme"
                  >
                    <div class="card-body">
                      <h5 class="card-title">
                        {{note.title}}
                      </h5>
                      <p class="card-text">{{note.body}}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                v-on:click="saveNote"
              >Save</button>
              <button
                type="button"
                class="btn btn-dark"
                v-on:click="closeAddNote"
                data-dismiss="modal"
              >Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>

</template>

<script>
import { mapState } from "vuex";
import ThemePicker from "./ThemePicker.vue";
import ModalOverlay from "./ModalOverlay.vue";
import formErrorHandler from '../mixins/formErrorHandler';
export default {
  mixins: [formErrorHandler],
  components: {
    "theme-picker": ThemePicker,
    "modal-overlay": ModalOverlay
  },
  data () {
    return {
      note: {
        title: "",
        body: "",
        theme: ""
      },
      validationErrors: [

      ],
      processSave: false
    };
  },
  computed: {
    ...mapState(["showAddNoteModal"]),
    loggedIn: function () {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    openAddNote: function () {
      this.$store.dispatch("openAddNote");
    },
    closeAddNote: function () {
      this.$store.dispatch("closeAddNote");
      this.note = {
        title: "",
        body: "",
        theme: ""
      }
    },
    applyTheme: function (theme) {
      this.note.theme = theme;
    },
    saveNote: function () {
      this.validationErrors = []

      if (!this.note.title) {
        this.validationErrors.push("Title is required.")
      }

      if (!this.note.body) {
        this.validationErrors.push("Body is required.")
      }

      if (!this.note.theme) {
        this.validationErrors.push("Theme is required.")
      }

      if (!this.validationErrors.length) {
        this.processSave = true
        this.$store.dispatch("saveNote", this.note)
          .then(() => {
            this.note = {
              title: "",
              body: "",
              theme: ""
            }
            this.$store.dispatch("notify", {
              type: "success",
              message: "New note added successfully!"
            });
            this.$router.push({ name: "userNotes" })
            this.$store.dispatch("userDataPresent", 1)
            this.processSave = false
            this.$store.dispatch("hideLoader");
          })
          .catch((error) => {

            this.errorHandler(error, this.validationErrors)

          });
      }
    }
  }
};
</script>

<style scoped>
.add-modal {
  margin-top: 10%;
  display: block;
}
.modal-process-spinner {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #444;
  z-index: 999999;
  opacity: 0.5;
}

.lds-dual-ring {
  width: 64px;
  height: 64px;
  margin: 30% auto;
  display: block;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.form-errors li {
  margin-left: 10px;
}
</style>
