# OctoFit Tracker frontend

This React 19 and Vite presentation tier calls the API at:

`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

Create `frontend/.env.local` and define `VITE_CODESPACE_NAME` with the Codespace name before running the app:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

When the variable is unset, the app uses same-origin `/api/[component]/` requests rather than constructing an `https://undefined-8000...` URL. API results can be either arrays or paginated objects with `results`, `data`, or `items` arrays.

Run with `npm install --prefix octofit-tracker/frontend` and `npm run dev --prefix octofit-tracker/frontend`.