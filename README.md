# PhotoMed Tracker — Request Tracker

A clean, minimal request tracking web application where users can submit bugs, feature requests, feedback, partnership inquiries, and other requests. Submitted requests can be viewed, filtered, searched, and managed from a dashboard.

Built as part of a technical assessment.

---

## Live Demo

Deployment Link: photomed-request-tracker-two.vercel.app

---

## Screenshots

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bc834f2a-e21a-4cd4-b340-3dd88eecc1f3" />


---

## What It Does

- Users can submit a request through a slide-in form panel
- Each request captures: name, email, product/company, request type, priority, and message
- Submitted requests appear instantly in the dashboard table
- Admins can change the status of any request (New → In Review → Resolved → Rejected)
- Requests are stored in a real PostgreSQL database via Supabase — they persist across sessions and devices
- Dashboard shows live stat cards for total requests, in review, resolved, and high priority
- Sidebar navigation filters requests by status
- Filter bar supports filtering by priority and type, plus live search by name, email, or message
- Light and dark mode toggle

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Database | Supabase (PostgreSQL) |
| Styling | Plain CSS-in-JS with CSS variables |
| Fonts | Inter + DM Mono (Google Fonts) |
| Deployment | Vercel |

---

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx        # Navigation with live request counts
│   ├── Topbar.jsx         # Page title, dark mode toggle, new request button
│   ├── StatCards.jsx      # Summary cards (total, in review, resolved, high priority)
│   ├── FilterBar.jsx      # Search input and filter dropdowns
│   ├── RequestTable.jsx   # Main requests table with status updater
│   ├── RequestForm.jsx    # Slide-in panel form for new requests
│   ├── StatusBadge.jsx    # Colored pill badge for request status
│   └── PriorityBadge.jsx  # Colored monospace text for priority level
├── lib/
│   └── supabaseClient.js  # Supabase connection setup
├── App.jsx                # Root component — state, filtering, layout
├── index.css              # Global styles and CSS variables (light + dark)
└── main.jsx               # React entry point
```

---

## How To Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/muthoni-prog/Photomed-request-tracker.git
cd request-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

- Go to [supabase.com](https://supabase.com) and create a free account
- Create a new project
- In the SQL Editor run this to create the requests table:

```sql
create table requests (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  product text not null,
  type text not null,
  priority text not null,
  message text not null,
  status text default 'New',
  created_at timestamptz default now()
);
```

- Disable Row Level Security on the requests table (no auth system in this version)

### 4. Add your environment variables

Create a `.env` file in the root of the project:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Start the development server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## What I Completed

- ✅ Request submission form with all required fields (name, email, product/company, type, priority, message)
- ✅ Product/company options: MedScan, PhotoMed, and PhotoMed products
- ✅ Request types: Bug, Feature Request, General Feedback, Partnership, Other
- ✅ Priority levels: Low, Medium, High
- ✅ Status management: New, In Review, Resolved, Rejected
- ✅ Status can be changed per request directly from the table
- ✅ Real database storage using Supabase (PostgreSQL) — data persists across sessions
- ✅ Live stat cards on the dashboard
- ✅ Sidebar navigation filtering by status
- ✅ Filter by priority and request type
- ✅ Live search by name, email, or message
- ✅ Light and dark mode
- ✅ Slide-in form panel with validation and success/error feedback
- ✅ Responsive and readable UI
- ✅ Deployed URL in vercel
---

## What I Did Not Complete

- ❌ User authentication (would use Supabase Auth in a production version)
- ❌ Ability to delete or edit submitted requests
- ❌ Email notifications when a request status changes
- ❌ Pagination for large numbers of requests

---

## Challenges I Faced

- **Supabase 404 errors** — The table was not returning data because i had enabled Row Level Security initially. Disabling RLS resolved this since the app has no authentication layer.
- **Environment variables** — Making sure Vite environment variables used the `VITE_` prefix correctly so they were accessible in the browser.
- **State management** — Keeping the filter, search, and sidebar navigation in sync without a state management library required careful planning in App.jsx.

---

## What I Would Improve With More Time

- Add user authentication so only authorized people can manage request statuses
- Enable RLS with proper policies once auth is in place
- Add the ability to click a request row and view the full message in a modal
- Add email notifications to submitters when their request status changes
- Add pagination or infinite scroll for large datasets
- Make the layout fully responsive for mobile screens
- Write unit tests for the form validation and filter logic

---

## References and Acknowledgements

- Looked at the layouts of existing issue trackers (Linear, Jira) for UI inspiration
- Designed the interface in Figma before writing any code
- Used Claude (Anthropic) for troubleshooting errors and brainstorming solutions
- All code written and understood by me

---

## Author

**Muthoni**
GitHub: [@muthoni-prog](https://github.com/muthoni-prog)
