import React from "react";
import { Post } from "./Post";
import PostListEmpty from "./PostListEmpty";

export function PostList({ posts = {}, edit = false }) {
  if (Object.keys(posts).length === 0) {
    return <PostListEmpty />;
  } else {
    return Object.keys(posts).map(key => (
      <Post key={key} post={posts[key]} edit={edit} />
    ));
  }
}
