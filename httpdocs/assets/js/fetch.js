function displayRSSFeed() {
  fetch('https://schachverein-schwalbach.de/httpdocs/index.php/feed/')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'application/xml');
      const items = xml.querySelectorAll('item');
      const feedContainer = document.getElementById('rss-feed');

      let html = '<h2>Aktuellste Blog-Einträge</h2>';
      html += '<ul>';
      items.forEach(item => {
        const title = item.querySelector('title').textContent;
        const link = item.querySelector('link').textContent;
        const description = item.querySelector('description').textContent;
        const pubDate = new Date(item.querySelector('pubDate').textContent).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

        html += `<li><a href="${link}"><h3>${title}</h3></a><p>${description}</p><p>Veröffentlicht am: ${pubDate}</p></li>`;
      });
      html += '</ul>';

      feedContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('Error fetching RSS feed:', error);
    });
}

displayRSSFeed();
