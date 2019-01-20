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
        <Route path="/new" exact render={() => <PostEdit />} />
        <Route
          path="/react"
          exact
          render={() => (
            <PostList posts={postsFilterCategory(posts, "react")} />
          )}
        />
        <Route
          path="/redux"
          exact
          render={() => (
            <PostList posts={postsFilterCategory(posts, "redux")} />
          )}
        />
        <Route
          path="/udacity"
          exact
          render={() => (
            <PostList posts={postsFilterCategory(posts, "udacity")} />
          )}
        />
        <Route
          path="/posts/:id"
          exact
          render={({ match }) => (
            <PostList edit posts={postsFilterId(posts, match.params.id)} />
          )}
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
