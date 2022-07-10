import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import { authFetch } from "./authFetch";

import type { Task } from "./models";

export interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "failed";
}

const initialState: TaskState = {
  tasks: [],
  status: "idle",
};

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (user_id: number) => {
    const response = await authFetch(`/api/tasks/${user_id}`);
    const data = await response.json();
    return data.data;
  },
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task: Partial<Task>) => {
    const response = await authFetch(`/api/tasks/${task.user_id}`, {
      method: "POST",
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data.data;
  },
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task: Partial<Task>) => {
    const response = await authFetch(`/api/tasks/${task.ID}`, {
      method: "PATCH",
      body: JSON.stringify(task),
    });
    const data = await response.json();
    return data.data;
  },
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.status = "loading";
    }).addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload || [];
      state.status = "idle";
    }).addCase(getTasks.rejected, (state) => {
      state.status = "failed";
    }).addCase(createTask.pending, (state) => {
      state.status = "loading";
    }).addCase(createTask.fulfilled, (state, action) => {
      const tasks = current(state).tasks;
      state.tasks = [action.payload, ...tasks];
      state.status = "idle";
    }).addCase(createTask.rejected, (state) => {
      state.status = "failed";
    }).addCase(updateTask.pending, (state) => {
      state.status = "loading";
    }).addCase(updateTask.fulfilled, (state, action) => {
      const tasks = current(state).tasks;
      state.tasks = tasks.map((task) => (task.ID === action.payload.ID ? action.payload : task));
      state.status = "idle";
    }).addCase(updateTask.rejected, (state) => {
      state.status = "failed";
    })
  },
})

export default taskSlice.reducer;