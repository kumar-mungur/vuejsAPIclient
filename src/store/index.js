import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.getItem("access_token") || null,
    u: localStorage.getItem("u") || null,
    axios: {
      baseUrl: "http://notes.local/api"
      //baseUrl: "https://laravel.a-sandbox.com/api"
    },
    themes: [
      "default",
      "dark",
      "blue",
      "midnight",
      "blood",
      "forest",
      "lemon",
      "sky",
      "lavender"
    ],
    siteVars: {
      siteName: "Notes",
      aboutMessage:
        "Notes is a simple client api application built with Vue.js and Bootstrap 4",
      contactEmail: "vurghus.minar@outlook.com",
      repositoryLink: "https://github.com/vurghus-minar",
      issueReportingLink: "https://github.com/vurghus-minar"
    },
    showLoader: false,
    notification: {
      show: false,
      object: {
        cssClass: "",
        type: "",
        message: ""
      }
    },
    showDeleteConfirmationModal: false,
    selectedIdForDeletion: null,
    showAddNoteModal: false,
    dataReady: false,
    userDataPresent: 0,
    notes: {},
    userNotes: {},
    selectedNote: {},
    selectedNoteForDeletion: {}
  },
  getters: {
    loggedIn(state) {
      return state.token != null;
    },
    getNotificationObject(state) {
      switch (state.notification.object.type) {
        case "success":
          state.notification.object.cssClass = "bg-success";
          break;
        case "error":
          state.notification.object.cssClass = "bg-danger";
          break;
        case "warning":
          state.notification.object.cssClass = "bg-warning";
          break;
        case "info":
          state.notification.object.cssClass = "bg-primary";
          break;
        default:
          state.notification.object.cssClass = "";
          break;
      }
      return state.notification;
    },
    getUserId(state) {
      if (state.u !== null) {
        const user = JSON.parse(state.u);
        return parseInt(user.id);
      }
      return null;
    },
    getUser(state) {
      if (state.u !== null) {
        const user = JSON.parse(state.u);
        return user;
      }
      return null;
    },
    getUserName(state) {
      if (state.u !== null) {
        const user = JSON.parse(state.u);
        const username = user.name;
        return username;
      }
      return null;
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
      state.u = null;
    },
    getUser(state, u) {
      state.u = u;
    },
    fetchNotes(state, notes) {
      state.notes = notes;
    },
    fetchUserNotes(state, notes) {
      state.userNotes = notes;
    },
    dataReady(state, arg) {
      state.dataReady = arg;
    },
    userDataPresent(state, arg) {
      state.userDataPresent = arg;
    },
    saveNote(state) {
      state.showAddNoteModal = false;
    },
    openAddNote(state) {
      state.showAddNoteModal = true;
    },
    closeAddNote(state) {
      state.showAddNoteModal = false;
    },
    clearNotes(state) {
      state.notes = {};
    },
    clearUserNotes(state) {
      state.userNotes = {};
    },
    clearSelectedNote(state) {
      state.selectedNote = {};
      state.dataReady = false;
    },
    cancelEditNote(state) {
      state.selectedNote = {};
      state.dataReady = false;
    },
    closeDeleteNote(state) {
      state.showDeleteConfirmationModal = false;
      state.selectedIdForDeletion = null;
    },
    openDeleteNote(state, id) {
      state.showDeleteConfirmationModal = true;
      state.selectedIdForDeletion = id;
    },
    openDeleteUserNote(state, note) {
      state.showDeleteConfirmationModal = true;
      state.selectedNoteForDeletion = note;
      state.selectedIdForDeletion = note.id;
    },
    closeDeleteUserNote(state) {
      state.showDeleteConfirmationModal = false;
      state.selectedNoteForDeletion = {};
      state.selectedIdForDeletion = null;
    },
    notify(state, args) {
      state.notification.show = true;
      state.notification.object = args;
    },
    hideNotification(state) {
      state.notification.show = false;
      state.notification.object.type = "";
      state.notification.object.message = "";
    },
    showLoader(state) {
      state.showLoader = true;
    },
    hideLoader(state) {
      state.showLoader = false;
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        context.dispatch("showLoader");
        axios
          .post(
            "/login",
            {
              username: credentials.username,
              password: credentials.password
            },
            {
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }
          )
          .then(response => {
            const token = response.data.access_token;
            localStorage.setItem("access_token", token);
            context.commit("retrieveToken", token);
            context.dispatch("getUser");
            context.dispatch("hideLoader");
            context.dispatch("notify", {
              type: "success",
              message: "You have successfully logged in!"
            });
            resolve(response);
          })
          .catch(error => {
            context.dispatch("notify", {
              type: "error",
              message: "Oops! There was an error logging in!"
            });
            context.dispatch("hideLoader");
            reject(error);
          });
      });
    },
    destroyToken(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          context.dispatch("showLoader");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .post("/logout", {
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("u");
              context.commit("destroyToken");

              context.dispatch("hideLoader");
              context.dispatch("notify", {
                type: "success",
                message: "You have successfully logged out!"
              });
              resolve(response);
            })
            .catch(error => {
              localStorage.removeItem("access_token");
              context.commit("destroyToken");

              context.dispatch("hideLoader");
              context.dispatch("notify", {
                type: "error",
                message: "Oops! There was an error logging out!"
              });
              reject(error);
            });
        });
      }
    },
    getUser(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          context.dispatch("showLoader");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .get("/user")
            .then(response => {
              const u = JSON.stringify(response.data);
              localStorage.setItem("u", u);
              context.commit("getUser", u);
              context.dispatch("hideLoader");
              resolve(response);
            })
            .catch(error => {
              context.dispatch("notify", {
                type: "error",
                message: "Oops! There was an error fetching the note"
              });
              context.dispatch("hideLoader");
              reject(error);
            });
        });
      }
    },
    registerUser(context, args) {
      return new Promise((resolve, reject) => {
        context.dispatch("showLoader");
        axios
          .post(
            "/register",
            {
              name: args.name,
              email: args.email,
              password: args.password
            },
            {
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }
          )
          .then(response => {
            context.dispatch("hideLoader");
            context.dispatch("notify", {
              type: "success",
              message: "You have successfully registered!"
            });
            resolve(response);
          })
          .catch(error => {
            context.dispatch("notify", {
              type: "error",
              message: "Oops! There was an error registering!"
            });
            context.dispatch("hideLoader");
            reject(error);
          });
      });
    },
    fetchUserNotes(context, page = 1) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          context.dispatch("showLoader");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .get("/user/notes?page=" + page)
            .then(response => {
              context.commit("fetchUserNotes", response.data);
              resolve(response.data);
            })
            .catch(error => {
              context.dispatch("notify", {
                type: "error",
                message: "Oops! There was an error fetching notes"
              });
              context.dispatch("hideLoader");
              reject(error);
            });
        });
      }
    },
    fetchNotes(context, page = 1) {
      return new Promise((resolve, reject) => {
        context.dispatch("showLoader");
        axios
          .get("/notes?page=" + page)
          .then(response => {
            context.commit("fetchNotes", response.data);
            context.dispatch("hideLoader");
            resolve(response.data);
          })
          .catch(error => {
            context.dispatch("notify", {
              type: "error",
              message: "Oops! There was an error fetching notes"
            });
            context.dispatch("hideLoader");
            reject(error);
          });
      });
    },
    fetchNote(context, id) {
      return new Promise((resolve, reject) => {
        context.dispatch("showLoader");
        axios
          .get("/note/" + id)
          .then(response => {
            context.dispatch("hideLoader");
            resolve(response);
          })
          .catch(error => {
            context.dispatch("notify", {
              type: "error",
              message: "Oops! There was an error fetching the note"
            });
            context.dispatch("hideLoader");
            reject(error);
          });
      });
    },
    saveNote(context, note) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          context.dispatch("showLoader");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .post("/note", note, {
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => {
              context.commit("saveNote");
              context.dispatch("fetchUserNotes");
              resolve(response);
            })
            .catch(error => {
              context.dispatch("notify", {
                type: "error",
                message: "Oops! There was an error adding new note."
              });
              context.dispatch("hideLoader");
              reject(error);
            });
        });
      }
    },
    closeAddNote(context) {
      context.commit("closeAddNote");
    },
    openAddNote(context) {
      context.commit("openAddNote");
    },
    updateNote(context, note) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          context.dispatch("showLoader");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .put("/note", note, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              }
            })
            .then(response => {
              context.dispatch("hideLoader");
              resolve(response);
            })
            .catch(error => {
              context.dispatch("notify", {
                type: "error",
                message: "Oops! There was an error editing this note."
              });
              context.dispatch("hideLoader");
              reject(error);
            });
        });
      }
    },
    cancelEditNote(context) {
      context.commit("cancelEditNote");
    },
    deleteNote(context, id) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          context.commit("closeDeleteNote");
          context.dispatch("showLoader");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .delete("/note/" + id)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              context.dispatch("notify", {
                type: "error",
                message: "Oops! There was an error deleting this note."
              });
              context.dispatch("hideLoader");
              reject(error);
            });
        });
      }
    },
    closeDeleteNote(context) {
      context.commit("closeDeleteNote");
    },
    openDeleteNote(context, id) {
      context.commit("openDeleteNote", id);
    },
    openDeleteUserNote(context, note) {
      context.commit("openDeleteUserNote", note);
    },
    closeDeleteUserNote(context) {
      context.commit("closeDeleteUserNote");
    },
    applyTheme(context, note) {
      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          context.dispatch("showLoader");
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + context.state.token;
          axios
            .put("/note", note, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              }
            })
            .then(response => {
              context.dispatch("hideLoader");
              context.dispatch("notify", {
                type: "success",
                message: "Theme successfully changed!"
              });
              resolve(response);
            })
            .catch(error => {
              context.dispatch("notify", {
                type: "error",
                message: "Oops! There was an error changing the theme."
              });
              reject(error);
            });
        });
      }
    },
    dataReady(context, arg) {
      context.commit("dataReady", arg);
    },
    userDataPresent(context, arg) {
      context.commit("userDataPresent", arg);
    },
    clearNotes(context) {
      context.commit("clearNotes");
    },
    clearUserNotes(context) {
      context.commit("clearUserNotes");
    },
    clearSelectedNote(context) {
      context.commit("clearSelectedNote");
    },
    notify(context, args) {
      context.commit("notify", args);
    },
    hideNotification(context) {
      context.commit("hideNotification");
    },
    showLoader(context) {
      context.commit("showLoader");
    },
    hideLoader(context) {
      context.commit("hideLoader");
    }
  }
});
