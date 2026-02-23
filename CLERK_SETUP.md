# Clerk Authentication Setup Guide

This guide outlines the steps to migrate from local auth to Clerk.

## 1. Setup Clerk Project
1. Go to [Clerk.com](https://clerk.com) and create a new project.
2. Select "Email", "Google" as authentication providers.
3. Copy your `CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

## 2. Install Dependencies
```bash
npm install @clerk/clerk-react @clerk/clerk-sdk-node
```

## 3. Frontend Integration
Wrap your app in `ClerkProvider` in `main.tsx`:
```tsx
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)
```

## 4. Replace AuthContext
Update `src/contexts/AuthContext.tsx` to use Clerk hooks (`useUser`, `useAuth`, `useSignIn`).

## 5. Backend Middleware
Replace `server/middleware/auth.ts` with Clerk express middleware:
```ts
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'

// Use this for protected routes
app.get('/api/protected', ClerkExpressWithAuth(), (req, res) => {
  // Use req.auth to get user details
})
```
