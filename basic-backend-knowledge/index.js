function newsBlock() {
  const apiKey = "pp3hmj8Y4sOwEl063rvUgwk8QvOXcGU6";
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}`

  fetch(url)
  .then(response => {
    if(!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
      console.log("Data fetched from the URL:", data);
  });
}

newsBlock();