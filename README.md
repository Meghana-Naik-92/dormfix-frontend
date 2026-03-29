# DormFix — Frontend

> React frontend for DormFix Hostel Issue Reporter  
> Built with React 18 + Vite + Tailwind CSS

🔗 Backend Repository: [dormfix-backend](https://github.com/
Meghana-Naik-92/dormfix)

---

## What is DormFix?

DormFix is a complaint management system for college hostels. This repository contains the complete React frontend. Students can submit and track complaints. Admins can manage and resolve them.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool + dev server |
| React Router DOM | Client-side routing |
| Axios | HTTP client with interceptors |
| Tailwind CSS | Utility-first styling |
| Context API | Global auth state |

---

## Pages

| Page | Route | Who sees it |
|---|---|---|
| Login | `/login` | Everyone |
| Register | `/register` | Everyone |
| Student Dashboard | `/student` | Student only |
| Submit Complaint | `/student/submit` | Student only |
| Complaint Detail | `/student/complaint/:id` | Student only |
| My Profile | `/student/profile` | Student only |
| Admin Dashboard | `/admin` | Admin only |
| Admin Complaint Detail | `/admin/complaint/:id` | Admin only |

---

## Project Structure

```
src/
├── context/
│   └── AuthContext.jsx        ← JWT stored, user state global
├── services/
│   └── api.js                 ← All Axios calls + interceptor
├── components/
│   └── ProtectedRoute.jsx     ← Auth + role guard for routes
└── pages/
    ├── Login.jsx
    ├── Register.jsx
    ├── StudentDashboard.jsx
    ├── SubmitComplaint.jsx
    ├── ComplaintDetail.jsx
    ├── Profile.jsx
    ├── AdminDashboard.jsx
    └── AdminComplaintDetail.jsx
```

---

## Key Implementation Details

### Axios Interceptor
Every API call automatically gets the JWT token attached:
```js
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```
No need to manually add the token to every request.

### AuthContext
Global state stores the logged-in user. Any component can access it:
```js
const { user, login, logout } = useAuth();
```
On page refresh, token is read from `localStorage` so the user stays logged in.

### ProtectedRoute
Guards every route — checks both authentication and role:
```jsx
<ProtectedRoute role="STUDENT">
  <StudentDashboard />
</ProtectedRoute>
```
Not logged in → redirected to `/login`  
Wrong role → redirected to correct dashboard

---

## How to Run

### Prerequisites
- Node.js v18+
- Backend running at `http://localhost:8080`

### Steps

1. Clone the repo
```bash
git clone https://github.com/Meghana-Naik-92/dormfix-frontend-new.git
cd dormfix-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start dev server
```bash
npm run dev
```

App runs at `http://localhost:5173`

> Make sure the backend is running at `http://localhost:8080` before using the app.

---

## How to Use

1. Go to `http://localhost:5173`
2. Register as a **Student** or **Admin**
3. Login with your credentials
4. You will be redirected to the correct dashboard based on your role

### As a Student
- Submit complaints with title, description and category
- Track status of your complaints (Pending → In Progress → Resolved)
- View complaint details and timeline
- See your stats on the dashboard

### As an Admin
- View all complaints from all students
- Filter by status or hostel block
- Update complaint status
- See overall hostel stats

---

## Author

**Meghana M Naik**  
Computer Science Engineering Student  
GitHub: [@Meghana-Naik-92](https://github.com/Meghana-Naik-92)  
LinkedIn: [Meghana Naik](https://www.linkedin.com/in/meghana-naik-832971324)
