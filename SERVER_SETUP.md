# How to Start the Server

Your project is using the latest tools which require an updated version of Node.js to properly handle ES Modules (ESM) when running the local development server. Because you are on Node.js version `22.11.0`, you encountered an `[ERR_REQUIRE_ESM]` error.

This happens because the native support for `require()` on ES Modules is only enabled by default in Node.js version **22.12.0** and above.

Here are two options to fix this and start your server:

## Option 1: The Quick Fix (Run with an environment flag)
You can run the server right now without upgrading by telling Node.js to enable the experimental module feature. 

Since you are using Windows PowerShell, run this exact command:

```powershell
$env:NODE_OPTIONS="--experimental-require-module"; npm run dev
```

This will set the environment variable temporarily and start the Vite development server. You should see it start up on `http://localhost:8080/`.

## Option 2: The Permanent Fix (Upgrade Node.js)
To avoid having to use the long command above every time, you should upgrade Node.js to version `22.12.0` or higher (or the latest LTS version).

1. Go to the [Node.js Official Website](https://nodejs.org/).
2. Download and install the latest LTS version (which is currently higher than 22.12).
3. Once installed, restart your terminal/VS Code so it recognizes the new Node version.
4. Verify the version by running:
   ```powershell
   node -v
   ```
5. You can now simply run the server normally:
   ```powershell
   npm run dev
   ```

### Important Notes
- The server will be accessible at `http://localhost:8080/` in your browser.
- Any changes you make to the code will automatically be reloaded in the browser.
- To stop the server at any time, click in the terminal where it's running and press `Ctrl + C`.
