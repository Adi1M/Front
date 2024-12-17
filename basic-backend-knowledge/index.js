function newsBlock() {
  const apiKey = "pp3hmj8Y4sOwEl063rvUgwk8QvOXcGU6";
  const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const articles = data.response?.docs || [];
      console.log("Articles:", articles);

      const list = document.getElementById("list");
      

      articles.map((article) => {
        list.innerHTML += getNews(
          article.byline.original,
          article.section_name,
          article.pub_date,
          article.headline.main,
          article.lead_paragraph,
          articles.map((article) => {
            article.multimedia.map((articleMedia) => {
              return articleMedia[0];
            })
          })
        );
      });
    })
    .catch((error) => {
      console.error("Error fetching news:", error.message);
    });
}

newsBlock();

function getNews(authorName, topic, publishDate, articleTitle, firstParagraph, article_img) {
  return `
    <div class="list-item-content">
    <!-- Left Column -->
    <div class="list-left-column">
      <!-- Left Column Text Content -->
      <div class="left-text-content">
        <!-- Left Column Article Information -->
        <div class="list-item-header">
          <img
            src="team_1.jpg"
            alt="Author"
            class="author-img"
          />
          <p class="author-info">
            ${authorName} <span>in</span> ${topic} <p>•</p> <span>${publishDate}</span>
          </p>
        </div>
        <!-- Article Content -->
        <div class="list-left-content">
          <h1 class="title">${articleTitle}</h1>
          <p class="description">
            ${firstParagraph}
          </p>
        </div>
      </div>

      <div class="left-footer">
        <button type="button" class="left-footer-button">JavaScript</button>
        <p>12 min read</p>
        <span> · </span>
        <p>Selected for you</p>
      </div>
    </div>
    <!-- Right Column -->
    <img
      src="${article_img}"
      class="list-right-column"
      alt="article_img"
    />
  </div>
  `;
}
