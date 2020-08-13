
//require('html-template-tag')
module.exports = post => `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              <h2>${post.title}</h2>
              <small>(by ${post.name})</small>
            </p>
            ${post.content}
          </div>
    </body>
  </html>
  `
