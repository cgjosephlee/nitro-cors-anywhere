export default eventHandler((event) => {
  const defaultMsg = `
    <html>
      <body>
        <h1>Hello!</h1>
        <p>This is an API that enables cross-origin requests to anywhere.</p>
        <h2>Usage:</h2>
        <ul>
          <li><code>/</code> - This page.</li>
          <li><code>/&lt;url&gt;</code> - Create a request to <code>&lt;url&gt;</code>, and includes CORS headers in the response.</li>
        </ul>
      </body>
    </html>`;
  const msg = useRuntimeConfig(event).welcomeMessage;
  if (msg) {
    return msg;
  } else {
    return defaultMsg;
  }
});
