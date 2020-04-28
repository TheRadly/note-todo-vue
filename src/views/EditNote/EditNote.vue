<template>
  <div class="edit-page">
    <confirmation-modal
      @confirm-modal="onDeleteTodoAction"
      @cancel-edit="onCancelEditAction"
      @delete-note="onDeleteNoteAction"
      :item="currentItem"
      :delete="deleteNote"
      :cancel="cancelEdit"
      v-if="showModal"
    />
    <h1>Edit "{{ note.description }}" note</h1>
    <hr />
    <div class="edit-fields">
      <div>
        <button :disabled="!canUndo" @click="undoChanges">&#8592; Undo</button>
        <button :disabled="!canRedo">Redo &#8594;</button>
      </div>
      <div class="edit-note-name">
        <span>Note name: </span>
        <span v-if="!onEditNoteName">{{ currentNote.description }}</span>
        <input
          v-else
          @keyup.enter="onClickEditNoteName"
          v-model="currentNote.description"
          type="text"
        />
        <button @click="onEditNoteName = !onEditNoteName">
          &#9998;
        </button>
      </div>
      <div class="edit-todos">
        <h3>ToDo's:</h3>
        <ul v-if="currentNote.todos.length >= 1">
          <li
            :class="{ 'done-todo': todo.done }"
            v-for="todo in currentNote.todos"
            :key="todo.id"
          >
            <input class="checkbox-todo" type="checkbox" v-model="todo.done" />
            <input
              class="edit-todo-input"
              v-if="editedTodoId === todo.id"
              type="text"
              v-model="todo.todo"
              @keyup.enter="editedTodoId = !todo.id"
            />
            <span v-else>{{ todo.id }}. {{ todo.todo }}</span>
            <button @click="editCurrentTodo(todo.id)" class="change-button">
              &#9998;
            </button>
            <button @click="onShowModal(todo.id)" class="delete-button">
              &times;
            </button>
          </li>
        </ul>
        <span v-else>ToDo's is empty</span>
        <div class="add-todo-fields">
          <span class="input-error" v-if="emptyInput"
            >Input is empty, try again</span
          >
          <div>
            <input
              @keyup.enter="onClickAddTodoButton"
              v-model="todoInput"
              type="text"
            />
            <button @click="onClickAddTodoButton">Add todo</button>
          </div>
        </div>
      </div>
      <div class="action-buttons">
        <button @click="onSaveEdit">Save</button>
        <button @click="onCancelEdit">Cancel</button>
        <button @click="onDeleteNote">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VuexUndoRedo from "vuex-undo-redo";
import ConfirmationModal from "@/components/modals/ConfirmationModal/ConfirmationModal";
import { mapGetters, mapMutations } from "vuex";

Vue.use(VuexUndoRedo);

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      todoInput: "",
      currentItem: null,
      emptyInput: false,
      editedTodoId: null,
      deletedTodoId: null,
      showModal: false,
      cancelEdit: false,
      deleteNote: false,
      onEditNoteName: false
    };
  },
  created() {
    if (this.note === undefined) {
      this.$router.push("/");
    } else {
      this.uploadCurrentNote(this.note);
    }
  },
  computed: mapGetters(["currentNote"]),
  methods: {
    ...mapMutations([
      "emptyState",
      "editNoteName",
      "addNewTodo",
      "deleteTodo",
      "uploadCurrentNote"
    ]),
    undoChanges() {
      this.emptyState(this.note);
      this.undo();
    },
    onClickEditNoteName() {
      if (this.currentNote.description.trim()) {
        this.editNoteName(this.currentNote.description);
      }
      this.onEditNoteName = false;
    },
    onClickAddTodoButton() {
      if (this.todoInput.trim()) {
        this.addNewTodo(this.todoInput);
        this.todoInput = "";
        this.emptyInput = false;
      } else {
        this.emptyInput = true;
      }
    },
    onDeleteTodoAction(action) {
      if (action) {
        this.deleteTodo(this.deletedTodoId);
      }
      this.showModal = false;
    },
    editCurrentTodo(id) {
      this.editedTodoId = id === this.editedTodoId ? !id : id;
    },
    onSaveEdit() {
      this.$router.push({
        name: "home",
        params: { editedNote: this.currentNote }
      });
    },
    onCancelEditAction(action) {
      if (action) {
        this.$router.push("/");
      }
      this.cancelEdit = false;
      this.showModal = false;
    },
    onDeleteNoteAction(action) {
      if (action) {
        this.$router.push({
          name: "home",
          params: { deletedNoteId: this.currentNote.id }
        });
      }
      this.deleteNote = false;
      this.showModal = false;
      this.currentItem = null;
    },
    onClickedEditName() {
      this.editName = !this.editName;
    },
    onShowModal(id) {
      this.showModal = true;
      this.deletedTodoId = id;
    },
    onCancelEdit() {
      this.cancelEdit = true;
      this.showModal = true;
    },
    onDeleteNote() {
      this.currentItem = this.note.description;
      this.deleteNote = true;
      this.showModal = true;
    }
  },
  components: {
    "confirmation-modal": ConfirmationModal
  }
};
</script>

<style scoped lang="scss">
@import "EditNote.scss";
</style>
