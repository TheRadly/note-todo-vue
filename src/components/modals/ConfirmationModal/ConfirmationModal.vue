<template>
  <div class="modal-backdrop">
    <div class="modal-body">
      <h2 v-if="item !== null">
        Are you sure you want to delete "{{ item }}" note?
      </h2>
      <h2 v-else-if="cancel">Are you sure you want to cancel editing?</h2>
      <h2 v-else>Are you sure you want to delete this todo?</h2>
      <div>
        <button class="modal-button" @click="onClickAction(true)">
          Yes
        </button>
        <button class="modal-button" @click="onClickAction(false)">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
      default: null
    },
    cancel: {
      type: Boolean,
      default: false
    },
    delete: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickAction(action) {
      if (this.cancel) {
        this.$emit("cancel-edit", action);
      } else if (this.delete) {
        this.$emit("delete-note", action);
      } else {
        this.$emit("confirm-modal", action);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "ConfirmationModal.scss";
</style>
