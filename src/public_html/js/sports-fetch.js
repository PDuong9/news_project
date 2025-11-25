document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.content');
    container.innerHTML = '<p id="loading">Loading news...</p>';

    const categories = ['"sports"'];
    
    // Helper function to safely fetch and return results
    const failedSource = [];
    const safeFetch = async (category) => {
        try {
            const res = await fetch(`api/news/query/${encodeURIComponent(category)}`);
            if (!res.ok) {
                throw new Error(`HTTP Error! Status: ${res.status}`);
            }
            const data = await res.json();
            return data;
        } catch (err) {
            console.warn(`Fetch failed: `, err);
            failedSource.push(category);
            return null;
        }
    }

    Promise.all(categories.map(safeFetch)).then(results => {
        container.innerHTML = '';
        const articles = [];

        results.forEach((data) => {
            if (!data || !data.articles) return;
            articles.push(...data.articles);
        });

        // Remove duplicate articles by URL
        const validArticles = articles.filter(a => a.url);
        const seen = new Set();
        const uniqueArticles = validArticles.filter(a => {
            if (seen.has(a.url)) return false;
            seen.add(a.url);
            return true;
        });

        if (uniqueArticles.length > 0) {
            uniqueArticles.forEach(article => {
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
