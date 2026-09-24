# Yash Shelar — Portfolio

A dark, editorial-style personal portfolio built with plain HTML, CSS and JavaScript (Three.js for the hero particle effect). No build step required.

## Files
```
index.html      – page structure & content
style.css       – theme (colors, layout, animations)
script.js       – scroll reveal, nav highlighting, tilt/magnetic effects, particles
assets/hero.webp   – profile photo
assets/resume.pdf  – downloadable resume
```

## Run locally
Just open `index.html` in a browser, or serve it:
```
npx serve .
```

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset: **Other** (static site) — no build command, output directory is the project root.
4. Deploy.

## Deploy on GitHub Pages
1. Push to GitHub.
2. Repo → Settings → Pages → Source: `main` branch, root folder.
3. Save — your site will be live at `https://<username>.github.io/<repo>/`.

## Customizing
- Colors, fonts and spacing are all controlled by CSS variables at the top of `style.css`.
- To update content, edit the text directly in `index.html`.
- To swap the photo or resume, replace the files in `assets/` (keep the same filenames, or update the `src`/`href` in `index.html`).
