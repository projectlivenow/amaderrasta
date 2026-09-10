# Amader Rasta — Frontend Demo

A standalone HTML/CSS/JS implementation inspired by the supplied reference image.

## Run
Open `index.html` in a modern browser. No build step, backend, Firebase, or npm package is required.

## Included working logic
- Responsive desktop/mobile UI
- Problem cards + detail modal
- Interactive map-style markers and category filters
- Search overlay and map search
- Report submission with required-field validation
- Image/video size validation (files are not uploaded; this is frontend-only)
- Reports stored in browser `localStorage`
- My Reports table
- Support/vote interaction
- Geolocation button with browser permission
- Local report reset

## Note
Because this version is frontend-only, uploaded media are validated but intentionally not sent to a server. For a production deployment, connect the form to Firebase/Cloudinary/Supabase or another backend.
