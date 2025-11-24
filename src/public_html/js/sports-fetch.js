document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.content');
    container.innerHTML = '<p id="loading">Loading news...</p>';

    const categories = ["sports"];
    // const sources = [
    //     {
    //         url: 'https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     },
    //     // {
    //     //     url: 'https://newsapi.org/v2/everything?q=sports&language=en&sortBy=popularity&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     // },
    //     // {
    //     //     url: 'https://newsapi.org/v2/top-headlines?everything?q=la+liga&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     // }
    //     // {
    //     //     url: 'https://newsdata.io/api/1/latest?apikey=pub_5c72a3e232cb4395b37553a5c9765d2d&q=sports&language=en&category=sports'
    //     // }
    // ];
    
    // Helper function to safely fetch and return results
    const failedSource = [];
    const safeFetch = (category) =>
        fetch(`/api/news/${category}`)
            // .then(res => res.json())
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP Error! Status: ${res.status}`);
                }
                return res.json();
            })
            .catch(err => {
                console.warn(`Fetch failed: `, err);
                failedSource.push(category);
                return null;
            });

    Promise.all(categories.map(safeFetch)).then(results => {
        container.innerHTML = '';
        const articles = [];

        results.forEach((data) => {
            if (!data || !data.articles) return;
            articles.push(...data.articles);
        });

        // Filter out articles without valid URLs
        const validArticles = articles.filter(article => article.url);

        if (validArticles.length > 0) {
            validArticles.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'news-card';
                
                const cleanTitle = article.title.split('-').slice(0, -1).join('-').trim();
                const publisher = article.source?.name?.trim() || 'Unknown';
                const imgURL = article.urlToImage || 'img/news-image.jpg';
                const isVideo = imgURL.match(/\.(mp4|webm|mov|ogg)$/i);
                const publishedAt = article.publishedAt
                    ? new Date(article.publishedAt).toLocaleString()
                    : 'Unknown date';
                                
                if (isVideo) {
                    articleDiv.innerHTML = `
                        <h2>${cleanTitle}</h2>
                        <video controls src="${imgURL}" class="news-img" onerror="this.onerror=null; this.src='img/news-image.jpg';"></video>
                        <p>${article.description || ''}</p>
                        <p class="news-source">Source: ${publisher}</p>
                        <p class="news-date">Published at: ${publishedAt}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    `;
                } else {
                    articleDiv.innerHTML = `
                        <h2>${cleanTitle}</h2>
                        <img src="${imgURL}" alt="Article Image" class="news-img" onerror="this.onerror=null; this.src='img/news-image.jpg';">
                        <p>${article.description || ''}</p>
                        <p class="news-source">Source: ${publisher}</p>
                        <p class="news-date">Published at: ${publishedAt}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    `;
                }
                container.appendChild(articleDiv);
            });
        } else {
            container.innerHTML = '<p>No news articles found.</p>';
        }

        if (failedSource.length > 0) {
            console.warn("Failed to fetch news from: " + failedSource.join(', '));
        }
    });
});
