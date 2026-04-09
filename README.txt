SPOTIFY CLONE - GUIDE
====================

This is a static Spotify clone built with vanilla HTML, CSS, and JavaScript.
No build tools, frameworks, or dependencies required.


HOW IT WORKS
------------

The app has three main files that work together:

1. index.html
   - Contains all the HTML structure of the page
   - Links to the CSS and JS files
   - Uses semantic HTML elements: header, aside, main, section, footer

2. css/style.css
   - Contains all styling using CSS custom properties (variables)
   - Main colors are defined in :root at the top
   - Classes follow BEM-like naming (e.g., .playlist-card, .btn-play)
   - Dark theme with green accent (#1db954)

3. js/script.js
   - Contains all interactivity
   - Uses DOM queries to find elements and attach event listeners
   - State is managed in a simple JavaScript object

File loading order:
index.html -> loads css/style.css -> loads js/script.js


HOW TO MAKE CHANGES
-------------------

HTML (index.html):
- Edit directly in any text editor
- Each section has comments indicating its purpose
- To add new playlist cards, copy an existing .playlist-card div
- To add new tracks, copy an existing .track-item div

CSS (css/style.css):
- Edit directly in any text editor
- Key color variables are at the top in :root
- Main sections: Header, Sidebar, Content, Player Bar
- Use browser DevTools (F12) to inspect elements and find styles

JavaScript (js/script.js):
- Edit directly in any text editor
- DOMContentLoaded ensures code runs after HTML loads
- Each feature has a section with comments:
  * Player controls (play/pause, prev/next)
  * Progress bar
  * Volume
  * Track selection
  * Search
  * Navigation

Adding new interactivity:
1. Add HTML elements in index.html
2. Add styles in css/style.css
3. Add JavaScript in js/script.js:
   - Query the element with document.querySelector()
   - Add event listener with .addEventListener()
   - Modify elements or state as needed


TESTING CHANGES
---------------

Open index.html directly in any browser. No server needed.
Use browser DevTools (F12) to:
- Inspect and debug HTML/CSS
- View console logs from JavaScript
- Modify styles live to test before editing files


PROJECT STRUCTURE
-----------------

spotify-clone/
  index.html      - Main HTML file (open this in browser)
  css/
    style.css     - All styles
  js/
    script.js     - All JavaScript
  assets/         - For image files (currently using inline SVGs)
  CLAUDE.md       - Guidance for Claude Code


TROUBLESHOOTING
---------------

Q: Changes not showing?
A: Clear browser cache or do a hard refresh (Ctrl+Shift+R)

Q: Something broke?
A: Use browser DevTools to check for errors in the Console tab

Q: Want to add a new page?
A: This is a single-page app. To add pages, create new HTML files and link to them.
   For a true multi-page experience, you'd need a server to handle routing.


FURTHER CUSTOMIZATION
---------------------

Colors: Edit the --bg-* and --accent variables in css/style.css :root
Fonts: Add Google Fonts import to index.html <head> and update font-family
Images: Replace inline SVG data URIs with paths to actual images in assets/
Icons: Replace emoji icons (▶, ⏮, etc.) with SVG icons or an icon library
