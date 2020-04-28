<template>
  <div class="container">
    <confirmation-modal
      @confirm-modal="onDeleteNote"
      v-if="showModal"
      :item="note.description"
    />
    <div class="note">
      <button class="delete-button" @click="onShowModal">&times;</button>
      <div class="note-container" @click="onClickNote">
        <h3>{{ note.description }}</h3>
        <ul v-if="sliceTodos.length >= 1">
          <li
            :class="{ 'done-todo': todo.done }"
            v-for="todo in sliceTodos"
            :key="todo.id"
          >
            {{ todo.id }}. {{ todo.todo }}
            <span v-if="todo.id >= 5">...</span>
          </li>
        </ul>
        <span v-else>Todos is empty</span>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  computed: {
    sliceTodos() {
      return this.note.todos.filter(t => t.id <= 5);
    }
  },
  methods: {
    onClickNote() {
      this.$router.push({
        name: "edit-note",
        params: { id: this.note.id, note: this.note }
      });
    },
    onDeleteNote(action) {
      if (action) {
        this.$emit("delete-note", this.note.id);
      }
      this.showModal = false;
    },
    onShowModal() {
      this.showModal = true;
    }
  },
  components: {
    "confirmation-modal": ConfirmationModal
  }
};
</script>

<style scoped lang="scss">
@import "NoteComponent.scss";
</style>
