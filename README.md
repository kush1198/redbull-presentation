# Ananya Hype Site 🪽

A mobile-first hype website built to pump up Ananya before her big Red Bull presentation.

## Live Site
**https://kush1198.github.io/redbull-presentation/**

## Structure

```
├── index.html      # Main HTML with 3 pages
├── style.css       # All styling
├── script.js       # Navigation and interactions
├── ananya.jpg      # Hero photo
└── README.md       # This file
```

## Pages

1. **Page 1 - Takeoff**: Hero intro with photo, wings animation, and hype copy
2. **Page 2 - The Work**: Truck route visualization (unchanged) with supporting text
3. **Page 3 - Final Pump**: Confidence-boosting message before the presentation

## Customizing

### To change the photo:
Replace `ananya.jpg` with a new image (keep the same filename, or update the `src` in index.html)

### To change text:
Edit the text directly in `index.html`:
- Page 1: `.headline`, `.subhead`, `.roast`
- Page 2: `.work-headline`, `.work-subline`, `.work-stats`, `.work-roast`
- Page 3: `.proud-headline`, `.affirmations`, `.final-line`

### To change colors:
Edit the CSS variables at the top of `style.css`:
```css
:root {
    --red: #db0a40;
    --yellow: #ffc906;
    --dark: #0a0a0a;
    ...
}
```

## Visualization

The truck route animation in Page 2 is embedded inside `.visualization-container`.

**DO NOT MODIFY** the visualization logic or structure. Only style the container around it.

## Navigation

- **Tap** the CTA buttons to advance
- **Swipe left/right** on mobile
- **Arrow keys** on desktop
- **Click dots** at the bottom to jump to any page
- **Back button** appears on pages 2 and 3

## Deployment

Hosted on GitHub Pages. Push to `main` branch to deploy:
```bash
git add -A
git commit -m "Update"
git push
```

---

Built with 💪 for Ananya. Go crush it!
