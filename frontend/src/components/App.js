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
        <Route
          path="/:category/:id"
          exact
          render={({ match }) => (
            <PostList edit posts={postsFilterId(posts, match.params.id)} />
          )}
        />
        <Route
          path="/:category"
          exact
          render={({
            match: {
              params: { category }
            }
          }) => {
            switch (category) {
              case "new":
                return <PostEdit />;
              default:
                return (
                  <PostList posts={postsFilterCategory(posts, category)} />
                );
            }
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
