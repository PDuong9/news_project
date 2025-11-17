document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.content');
    container.innerHTML = '<p id="loading">Loading news...</p>';

    // const sources = [
    //     {
    //         // Business
    //         url: 'https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     },
    //     {
    //         // Entertainment
    //         url: 'https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     },
    //     {
    //         // General
    //         url: 'https://newsapi.org/v2/top-headlines?category=general&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     },
    //     {
    //         // Health
    //         url: 'https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     },
    //     {
    //         // Science
    //         url: 'https://newsapi.org/v2/top-headlines?category=science&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     },
    //     {
    //         // Sports
    //         url: 'https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     },
    //     {
    //         // Technology
    //         url: 'https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=54f9eb335aff452192c71a0fdc90c621'
    //     }
    // ];

    const categories = ["business","health","entertainment","general","technology","science","sports"];
    
    // Helper function to safely fetch and return results
    const failedSource = [];
    const safeFetch = (categories) =>
        fetch(`/api/news/${categories}`)
            // .then(res => res.json())
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP Error! Status: ${res.status}`);
                }
                return res.json();
            })
            .catch(err => {
                console.warn(`Fetch failed: `, err);
                failedSource.push(url);
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
                const imgURL = article.urlToImage || 'No Image';
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

                // articleDiv.innerHTML = `
                //     <h2>${article.title}</h2>
                //     <img src="${imgURL}" alt="Article Image" class="news-img" onerror="this.onerror=null; this.src='img/news-image.jpg';">
                //     <p>${article.description || ''}</p>
                //     <p class="news-source">Source: ${publisher}</p>
                //     <p class="news-date">Published at: ${publishedAt}</p>
                //     <a href="${article.url}" target="_blank">Read more</a>
                // `;

                container.appendChild(articleDiv);
            });
        } else {
            container.innerHTML = '<p>No news articles found.</p>';
        }

        if (failedSource.length > 0) {
            const errorNotice = document.createElement('div');
            errorNotice.className = 'error';
            errorNotice.innerHTML = `<p>Failed to fetch news from: ${failedSource.join(', ')}</p>`;
            container.prepend(errorNotice);
        }
    });
});
