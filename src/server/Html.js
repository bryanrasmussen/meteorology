/**
 * Html
 * This Html.js file acts as a template that we insert all our generated
 * application strings into before sending it to the client.
 */
const Html = ({ body, title, data }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      <title>${title}</title>
    </head>
    <body>
      <noscript><div id="app">${body}</div></noscript>
      <div id="clientSideApp"></div>
      <script>var weatherData = ${data}</script>
      <script src="/script/client.js"></script>
    </body>
  </html>
`;

export default Html;
