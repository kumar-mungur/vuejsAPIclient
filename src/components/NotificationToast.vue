<template>
  <transition name="fade">
    <div
      v-if="notification.show"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-header">
        <span
          class="rounded mr-2 notification-color"
          v-bind:class="notification.object.cssClass"
        ></span>
        <strong class="mr-auto">{{ notification.object.type | capitalizeText }}</strong>
        <button
          type="button"
          class="ml-2 mb-1 close"
          v-on:click="hideNotification"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{notification.object.message}}
      </div>
    </div>
  </transition>
</template>

<script>
import changeCase from "../filters/changeCase";
export default {
  mixins: [changeCase],
  computed: {
    notification: function () {
      return this.$store.getters.getNotificationObject
    }
  },
  watch: {
    notification: function () {
      setTimeout(() => {
        this.$store.dispatch("hideNotification")
      }, 10000);
    }
  },
  data () {
    return {

    };
  },
  methods: {
    hideNotification: function () {
      this.$store.dispatch("hideNotification")
    }
  },
  mounted () {

  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.fade {
  opacity: 1;
}
.notification-color {
  padding: 10px;
  border: 1px solid #eeeeee;
}
</style>
