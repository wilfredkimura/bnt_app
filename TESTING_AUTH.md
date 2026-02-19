# Testing Login & Signup Forms

## Current Implementation Status

✅ **Forms are already connected to the database!**

Both Login and Signup pages are properly implemented with:
- Form submission handlers
- API calls to backend
- Error handling
- Loading states
- Database storage/validation

## How It Works

### Signup Flow
1. User fills form (name, email, password, role)
2. Frontend validates (password match, length)
3. Calls `POST /api/auth/register`
4. Backend creates user in database
5. Returns user data
6. Auto-login and redirect to home

### Login Flow
1. User enters email/password
2. Calls `POST /api/auth/login`
3. Backend validates against database
4. Returns user data with role
5. Redirects based on role (Admin → `/admin`, Others → `/`)

## Testing Steps

### 1. Ensure Servers Are Running
```bash
npm run dev:all
```

This should start:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

### 2. Test Signup
1. Visit `http://localhost:5173/signup`
2. Fill form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Role: "Volunteer"
   - Password: "password123"
   - Confirm: "password123"
3. Click "Create Account"
4. Check browser console for any errors
5. Should redirect to home page
6. Check Prisma Studio - user should be in database

### 3. Test Login
1. Visit `http://localhost:5173/login`
2. Enter credentials from signup
3. Click "Login"
4. Should redirect to home (or `/admin` if Admin role)

### 4. Verify in Database
```bash
npx prisma studio
```
- Open `users` table
- Should see the registered user

## Troubleshooting

### If forms don't work:

**1. Check if backend is running:**
```bash
# Should see: 🚀 API server running on http://localhost:3001
```

**2. Test API directly:**
```bash
# Test registration
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123","role":"Volunteer"}'

# Test login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**3. Check browser console:**
- Open DevTools (F12)
- Go to Console tab
- Look for error messages

**4. Check Network tab:**
- Open DevTools → Network
- Submit form
- Look for `/api/auth/register` or `/api/auth/login` requests
- Check if they're failing (red) or succeeding (green)

**5. Common issues:**
- **CORS error**: Backend not running or wrong URL
- **Network error**: Backend server down
- **401/400 error**: Invalid credentials or validation failed
- **500 error**: Database connection issue

## Code Locations

**Frontend:**
- Login: `src/pages/Login.tsx` (lines 16-34)
- Signup: `src/pages/Signup.tsx` (lines 28-53)
- Auth Context: `src/contexts/AuthContext.tsx` (lines 36-78)

**Backend:**
- Auth Routes: `server/routes/auth.ts`
- Server: `server/index.ts`

## Summary

The forms ARE working and connected to the database. If you're experiencing issues:
1. Make sure both servers are running (`npm run dev:all`)
2. Check browser console for errors
3. Verify backend is accessible at `http://localhost:3001`
4. Test API endpoints directly with curl

The implementation is complete and functional! 🎉
