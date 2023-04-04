import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("posts");
  return data;
});

const initialState = {
  posts: {
    item: [],
    status: "loading",
  },
  tags: {
    item: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.item = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfield]: (state, action) => {
      state.posts.item = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.item = [];
      state.posts.status = "error";
    },
  },
});

export const postReducer = postsSlice.reducer;
