# Todo App — Setup Guide (Simple Steps)

This folder has two parts:
- `backend` — the server (Express + MongoDB)
- `frontend` — the website you see (React)

Follow these steps **in order**. Use the Terminal inside VS Code for all commands.

---

## Step 1 — Put your MongoDB link in place

1. Open the `backend` folder.
2. You'll see a file called `.env.example`.
3. Rename it to exactly `.env` (just remove `.example`).
4. Open `.env` and replace the sample line with your real MongoDB connection string
   (the one you got from MongoDB Atlas — starts with `mongodb+srv://`).

---

## Step 2 — Run the Backend (server)

Open a terminal, then type these commands one by one, pressing Enter after each:

```
cd backend
npm install
npm start
```

Wait until you see:
```
MongoDB connected!
Server running on http://localhost:5000
```

**Leave this terminal open and running.** Do not close it.

---

## Step 3 — Run the Frontend (website)

Open a **second, new terminal** (don't close the first one).
In VS Code: click the `+` button next to the terminal, or go to Terminal → New Terminal.

Then type:

```
cd frontend
npm install
npm run dev
```

Wait until you see something like:
```
Local:   http://localhost:5173/
```

---

## Step 4 — Open the app

1. Copy the link shown (usually `http://localhost:5173/`)
2. Paste it into your browser (Chrome/Edge)
3. You should see your Todo List app — you can now add, edit, complete, and delete tasks!

---

## Troubleshooting

- **"npm not recognized"** → Node.js is not installed properly. Reinstall from nodejs.org.
- **"Cannot find module"** → Run `npm install` again inside the correct folder (`backend` or `frontend`).
- **Frontend loads but tasks don't show** → Make sure the backend terminal (Step 2) is still running.
- **MongoDB connection error** → Double check your `.env` file has the correct connection string with your real password.
