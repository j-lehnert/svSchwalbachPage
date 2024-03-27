function displayRSSFeed() {
    fetch('https://schachverein-schwalbach.de/httpdocs/index.php/feed/')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const items = xml.querySelectorAll('item');
        const feedContainer = document.getElementById('rss-feed');

        let html = '<h2>Neuigkeiten aus dem RSS Feed</h2>';
        html += '<ul>';
        items.forEach(item => {
          const title = item.querySelector('title').textContent;
          const link = item.querySelector('link').textContent;
          const description = item.querySelector('description').textContent;

          html += `<li><a href="${link}"><h3>${title}</h3></a><p>${description}</p></li>`;
        });
        html += '</ul>';

        feedContainer.innerHTML = html;
      })
      .catch(error => {
        console.error('Error fetching RSS feed:', error);
      });
  }

  // Call the function to display the RSS feed
  displayRSSFeed();