export function postsFilterCategory(posts, category) {
  return Object.keys(posts)
    .filter(key => posts[key].category === category)
    .map(key => posts[key]);
}

export function postsFilterId(posts, id) {
  return Object.keys(posts)
    .filter(key => posts[key].id === id)
    .map(key => posts[key]);
}
