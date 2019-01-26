import React, { useEffect } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { BrowserRouter, Route } from "react-router-dom";
import { TopBar, BottomBar } from "./bars";
import { PostList } from "./post/PostList";
import { PostEdit } from "./post/PostEdit";
import { postsFilterCategory, postsFilterId } from "../utils/post";

function App({ dispatch, posts }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <>
        <Route
          path="/"
          render={({ location }) => (
            <TopBar hideButtons={location.pathname === "/new"} />
          )}
        />
        <Route path="/" exact render={() => <PostList posts={posts} />} />
        <Route path="/new" exact component={PostEdit} />
        <Route
          exact
          path="/edit/:id"
          render={({
            match: {
              params: { id }
            }
          }) => <PostEdit post={postsFilterId(posts, id)} />}
        />
        <Route
          exact
          path="/:category"
          render={({
            match: {
              params: { category }
            }
          }) => <PostList posts={postsFilterCategory(posts, category)} />}
        />
        <Route
          exact
          path="/:category/:id"
          render={({
            match: {
              params: { category }
            }
          }) => {
            if (category === "edit") return null;
            return (
              <PostList edit posts={postsFilterCategory(posts, category)} />
            );
          }}
        />
        <Route path="/" component={BottomBar} />
      </>
    </BrowserRouter>
  );
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps)(App);
