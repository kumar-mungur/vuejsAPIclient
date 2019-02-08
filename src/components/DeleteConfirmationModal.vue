<template>
  <transition name="fade" tag="div">
    <div class="delete-modal modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm delete</h5>
            <button type="button" class="close" aria-label="Close" v-on:click="onCancel">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>          
          <div class="modal-body">
            <h6>Please confirm that you wish to delete the following record:</h6>
            <p>Title: <strong>{{note.title}}</strong><br /> ID: <strong>{{note.id}}</strong></p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" v-on:click="onConfirm">Delete</button>
            <button type="button" class="btn btn-dark" v-on:click="onCancel" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>  
  </transition>
</template>

<script>
export default {
  props: ["note"],
  methods: {
    onConfirm: function() {
      this.$emit("confirm");
    },
    onCancel: function() {
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped>
.delete-modal {
  margin-top: 10%;
  display: block;
}
</style>
