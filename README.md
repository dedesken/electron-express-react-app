# electron-express-react-app

**Clone and run for a quick way to see Electron with Express & React in action.**

This is a minimal Electron application based on the [Quick Start Guide](http://electron.atom.io/docs/tutorial/quick-start) within the Electron documentation.

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `electron.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `app.js` - Starts the Express server. 
- `index.html` - A web page to render. This is the app's **renderer process**.


## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/dedesken/electron-express-react-app.git
# Go into the repository
cd electron-express-react-app
# Install dependencies
npm install
# Run the app
npm run dev
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/).
