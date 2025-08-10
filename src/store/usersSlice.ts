import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { User, UsersState } from "../types/user";
import * as apiUsers from "../services/apiUsers";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async function (_, { rejectWithValue }) {
    try {
      return await apiUsers.getUsers();
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to load users");
    }
  }
);

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async function (user: User, { rejectWithValue }) {
    try {
      return await apiUsers.createUser(user);
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to create user");
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async function (id: number, { rejectWithValue }) {
    try {
      await apiUsers.deleteUser(id);
      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue("Failed to delete user");
    }
  }
);

export const updateUserAsync = createAsyncThunk<
  User,
  [number, User],
  { rejectValue: string }
>("users/updateUser", async function ([id, user], { rejectWithValue }) {
  try {
    return await apiUsers.updateUser(id, user);
  } catch (error) {
    console.log(error);
    return rejectWithValue("Failed to update user");
  }
});

const initialState: UsersState = {
  users: [],
  currentUser: { username: "", city: "" },
  userToUpdate: { username: "", city: "" },
  isLoading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setUserToUpdate: (state, action: PayloadAction<User>) => {
      state.userToUpdate = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetCurrentUser: (state) => {
      state.currentUser = { username: "", city: "" };
    },
    resetUserToUpdate: (state) => {
      state.userToUpdate = { username: "", city: "" };
    },
  },
  extraReducers: (builder) =>
    builder
      // Get users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Create user
      .addCase(createUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload && action.payload.id) {
          state.users.push(action.payload);
          state.currentUser = { username: "", city: "" };
        }
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Delete user
      .addCase(deleteUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);

        if (state.userToUpdate.id === action.payload) {
          state.userToUpdate = { username: "", city: "" };
        }
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Update user
      .addCase(updateUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.userToUpdate = { username: "", city: "" };
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      }),
});

export const {
  setCurrentUser,
  setUserToUpdate,
  setError,
  clearError,
  resetCurrentUser,
  resetUserToUpdate,
} = usersSlice.actions;

export default usersSlice.reducer;
