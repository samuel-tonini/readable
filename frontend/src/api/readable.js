import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import gql from "graphql-tag";

const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

const headers = {
  Authorization: token
};

const restLink = new RestLink({
  uri: api,
  headers
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
});

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

const initialDataQuery = gql`
  query {
    posts @rest(type: "Post", path: "/posts") {
      id
      timestamp
      title
      body
      author
      category
      voteScore
      deleted
      commentCount
    }
  }
`;

export const getInitialData = () =>
  client.query({ query: initialDataQuery }).then(res => {
    return res.data.posts;
  });

const addPostMutation = gql`
  mutation(
    $id: String
    $timestamp: Number
    $title: String
    $body: String
    $author: String
    $category: String
  ) {
    add(
      body: {
        id: $id
        timestamp: $timestamp
        title: $title
        body: $body
        author: $author
        category: $category
      }
    ) @rest(type: "Post", path: "/posts", method: "POST", bodyKey: "body") {
      id
      timestamp
      voteScore
      deleted
      commentCount
    }
  }
`;

export const addPost = (title, body, author, category) =>
  client
    .mutate({
      mutation: addPostMutation,
      variables: {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
        author,
        category
      }
    })
    .then(res => res.data.add);

const votePostMutation = gql`
  mutation($id: String, $option: String) {
    vote(body: { option: $option }, id: $id)
      @rest(
        type: "Post"
        path: "/posts/{args.id}"
        method: "POST"
        bodyKey: "body"
      ) {
      voteScore
    }
  }
`;

export const votePost = (id, option) =>
  client
    .mutate({
      mutation: votePostMutation,
      variables: {
        id,
        option
      }
    })
    .then(res => res.data.vote);

const deletePostMutation = gql`
  mutation($id: String) {
    delete(id: $id)
      @rest(type: "Post", path: "/posts/{args.id}", method: "DELETE") {
      id
    }
  }
`;

export const deletePost = id =>
  client
    .mutate({
      mutation: deletePostMutation,
      variables: {
        id
      }
    })
    .then(res => res.data.delete);

const getCommentQuery = gql`
  query {
    comments(id: $id)
      @rest(type: "Comments", path: "/posts/{args.id}/comments") {
      id
      timestamp
      body
      author
      voteScore
      parentId
    }
  }
`;

export const getPostComment = id =>
  client.query({ query: getCommentQuery, variables: { id } }).then(res => {
    return res.data.comments;
  });

const addCommentMutation = gql`
  mutation(
    $id: String
    $timestamp: Number
    $body: String
    $author: String
    $parentId: String
  ) {
    add(
      body: {
        id: $id
        timestamp: $timestamp
        body: $body
        author: $author
        parentId: $parentId
      }
    )
      @rest(
        type: "Comment"
        path: "/comments"
        method: "POST"
        bodyKey: "body"
      ) {
      id
      timestamp
      voteScore
      parentId
    }
  }
`;

export const addComment = (body, author, parentId) =>
  client
    .mutate({
      mutation: addCommentMutation,
      variables: {
        id: guid(),
        timestamp: Date.now(),
        body,
        author,
        parentId
      }
    })
    .then(res => res.data.add);

const voteCommentMutation = gql`
  mutation($id: String, $option: String) {
    vote(body: { option: $option }, id: $id)
      @rest(
        type: "Comment"
        path: "/comments/{args.id}"
        method: "POST"
        bodyKey: "body"
      ) {
      voteScore
    }
  }
`;

export const voteComment = (id, option) =>
  client
    .mutate({
      mutation: voteCommentMutation,
      variables: {
        id,
        option
      }
    })
    .then(res => res.data.vote);

const deleteCommentMutation = gql`
  mutation($id: String) {
    delete(id: $id)
      @rest(type: "Comment", path: "/comments/{args.id}", method: "DELETE") {
      id
    }
  }
`;

export const deleteComment = id =>
  client
    .mutate({
      mutation: deleteCommentMutation,
      variables: {
        id
      }
    })
    .then(res => res.data.delete);
