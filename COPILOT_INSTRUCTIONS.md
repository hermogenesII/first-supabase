# Co-Pilot Instructions for This Project

## Tech Stack

- **Next.js** (React framework for SSR, routing, and app structure)
- **Supabase** (Backend-as-a-Service for authentication and database)
- **Tailwind CSS** (Utility-first CSS framework for styling)
- **TypeScript** (Type safety for all code)

## Project Overview

This is a Next.js project using Supabase for authentication and CRUD operations. The UI is styled with Tailwind CSS. The main features are:

- User registration and login (with Supabase Auth)
- User management (CRUD) for authenticated users
- Clean separation of logic (custom hooks) and UI
- Modern, accessible UI

## Coding Guidelines

- Use React functional components and hooks.
- Keep business logic in custom hooks (e.g., `useUsers.ts`).
- Use context for authentication state (`authContext.tsx`).
- UI components should be presentational and stateless where possible.
- Use Tailwind CSS for all styling.
- Ensure accessibility (aria attributes, proper labels, etc.).
- Always check authentication state before showing protected content.
- Show loading and error states for all async actions.
- Use optimistic UI updates for CRUD actions when possible.

## File Structure

- `src/app/page.tsx`: Home page, shows different UI for logged-in/logged-out users.
- `src/app/login.tsx`: Login page.
- `src/app/register.tsx`: Registration page.
- `src/lib/authContext.tsx`: Authentication context/provider and hook.
- `src/lib/useUsers.ts`: Custom hook for user CRUD logic.
- `src/lib/supabaseClient.ts`: Supabase client setup.

## Auth Flow

- Unauthenticated users see a welcome screen with links to login/register.
- Registration and login use Supabase Auth and redirect to home on success.
- Authenticated users can manage users (CRUD) and logout.

## UI/UX

- All forms must be accessible and show validation errors.
- Use Tailwind for all UI elements.
- Show success messages and loading indicators for all async actions.
- Disable form fields and buttons while loading.

## Best Practices

- Do not expose sensitive keys or secrets in the client code.
- Use environment variables for Supabase credentials.
- Keep logic and UI separate for maintainability.
- Use TypeScript for type safety.

---

**For Co-Pilot:**

- Follow the above structure and guidelines for all code suggestions.
- When adding new features, use the existing patterns for hooks, context, and UI.
- Always prefer hooks and context for state management.
- Use Tailwind classes for all new UI elements.
- Ensure all new code is accessible and user-friendly.
