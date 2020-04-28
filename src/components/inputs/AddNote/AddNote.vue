<template>
  <form @submit.prevent="onSubmit">
    <span class="input-error" v-if="emptyInput">Input is empty, try again</span>
    <div>
      <input
        class="custom-input"
        type="text"
        v-model="inputText"
        placeholder="Note name..."
      />
      <button class="add-button" type="submit">Add note</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      inputText: "",
      emptyInput: false
    };
  },
  methods: {
    onSubmit() {
      if (this.inputText.trim()) {
        const lastNoteId =
          this.notes.length >= 1 ? this.notes[this.notes.length - 1].id + 1 : 1;
        const newNote = {
          id: lastNoteId,
          description: this.inputText,
          todos: []
        };

        this.$emit("add-note", newNote);
        this.inputText = "";
        this.emptyInput = false;
      } else {
        this.emptyInput = true;
      }
    }
  }
};
</script>

<style lang="scss">
@import "AddNote.scss";
</style>
