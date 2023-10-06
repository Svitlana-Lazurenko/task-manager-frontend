import { createSlice } from '@reduxjs/toolkit';
import { logOut } from 'redux/auth/operations';
import { fetchTasks, addTask, deleteTask, changeTask } from './operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const tasksInitialState = {
  tasksArr: [],
  isLoading: false,
  error: null,
  currentTaskId: null,
  currentTask: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksInitialState,

  reducers: {
    setCurrentTaskId(state, action) {
      state.currentTaskId = action.payload;
    },
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, handlePending)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasksArr = action.payload.tasks;
      })
      .addCase(fetchTasks.rejected, handleRejected)

      .addCase(addTask.pending, handlePending)
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasksArr.push(action.payload);
      })
      .addCase(addTask.rejected, handleRejected)

      .addCase(deleteTask.pending, handlePending)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.tasksArr.findIndex(
          task => task.id === action.payload.id
        );
        state.tasksArr.splice(index, 1);
      })
      .addCase(deleteTask.rejected, handleRejected)

      .addCase(changeTask.pending, handlePending)
      .addCase(changeTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const currentTask = action.payload;
        const newTasks = state.tasksArr.map(task =>
          task.id === currentTask.id ? currentTask : task
        );
        state.tasksArr = newTasks;
      })
      .addCase(changeTask.rejected, handleRejected)

      .addCase(logOut.fulfilled, state => {
        state.tasksArr = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const {
  turnOnEditMode,
  turnOffEditMode,
  setCurrentTaskId,
  setCurrentTask,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;