interface State {
  note: Note;
}

interface Note {
  id: number;
  description: string;
  todos: Array<Todos>;
}

interface Todos {
  id: number;
  todo: string;
  done: boolean;
}

export default {
  state: {
    note: {}
  },
  getters: {
    currentNote(state: State): Note {
      return state.note;
    }
  },
  mutations: {
    uploadCurrentNote(state: State, note: Note): void {
      state.note = { ...note };
    },
    editNoteName(state: State, description: string): void {
      state.note.description = description;
    },
    addNewTodo(state: State, todoInput: string): void {
      const lastTodoId: number =
        state.note.todos.length >= 1
          ? state.note.todos[state.note.todos.length - 1].id + 1
          : 1;
      const newTodo: Todos = {
        id: lastTodoId,
        todo: todoInput,
        done: false
      };
      const condition: boolean = state.note.todos.some(todo => {
        return todo.todo === todoInput;
      });

      if (condition) {
        state.note.todos.filter(todo => {
          todo.todo !== todoInput;
        });
      } else {
        state.note.todos.push(newTodo);
      }
    },
    deleteTodo(state: State, id: number): void {
      state.note.todos = state.note.todos.filter(
        (t: { id: number }) => t.id !== id
      );
    },
    emptyState(state: State): void {
      // @ts-ignore
    }
  }
};
