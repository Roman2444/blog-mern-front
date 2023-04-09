import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
);

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
    // получение статей
    [fetchPosts.pending]: (state) => {
      state.posts.item = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.item = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.item = [];
      state.posts.status = "error";
    },

    // получение тэгов
    [fetchTags.pending]: (state) => {
      state.tags.item = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.item = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.item = [];
      state.tags.status = "error";
    },

    //   удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.item = state.posts.item.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});

export const postReducer = postsSlice.reducer;
