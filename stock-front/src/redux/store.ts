import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  picture: string | null;
}

const initialState: UserState = { id: null, name: null, email: null, picture: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    logout: () => initialState,
  },
});

export const { setUser, logout } = userSlice.actions;
export const store = configureStore({ reducer: { user: userSlice.reducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
