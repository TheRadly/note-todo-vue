<template>
  <div class="home">
    <h1>ToDo List Application</h1>
    <h2>For TR Logic LLC</h2>
    <add-note :notes="notes" @add-note="addNote" />
    <div v-if="this.notes.length >= 1" class="note-list">
      <note-component
        v-for="note in notes"
        :key="note.id"
        :note="note"
        @delete-note="deleteNote"
      />
    </div>
    <div v-else class="list-empty">
      Notes list is empty. Please add new note!
    </div>
  </div>
</template>

<script>
import NoteComponent from "@/components/Note/NoteComponent";
import AddNote from "@/components/inputs/AddNote/AddNote";

export default {
  components: {
    "note-component": NoteComponent,
    "add-note": AddNote
  },
  props: {
    editedNote: {
      type: Object,
      default: null
    },
    deletedNoteId: {
      type: Number,
      default: null
    }
  },
  created() {
    if (!localStorage.notes) {
      localStorage.notes = [];
    }

    if (localStorage.notes.length >= 1) {
      this.notes = JSON.parse(localStorage.getItem("notes"));
    }
  },
  mounted() {
    if (this.editedNote !== null) {
      this.editNode(this.editedNote);
    } else if (this.deletedNoteId !== null) {
      this.deleteNote(this.deletedNoteId);
    }
  },
  data() {
    return {
      notes: []
    };
  },
  methods: {
    addNote(newNote) {
      this.notes.push(newNote);
      this.updateNotesInLocalStorage();
    },
    deleteNote(id) {
      this.notes = this.notes.filter(t => t.id !== id);
      this.updateNotesInLocalStorage();
    },
    editNode(note) {
      const newNotes = this.notes.map(item => {
        if (item.id === note.id) {
          return note;
        }
        return item;
      });

      this.notes = newNotes;
      this.updateNotesInLocalStorage();
    },
    updateNotesInLocalStorage() {
      localStorage.setItem("notes", JSON.stringify(this.notes));
    }
  }
};
</script>

<style scoped lang="scss">
@import "Home.scss";
</style>
