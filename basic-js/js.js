const posts = fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((posts) => {
    console.log(posts);

    const list = document.getElementById("list");
    
    posts.map((post) => {
        list.innerHTML += getLi(post.title, post.body)
    })
  });



function getLi(title, body) {
  return `
        <li>
            <h4>${title}</h4>
            <p>${body}</p>
        </li>
`;
}
