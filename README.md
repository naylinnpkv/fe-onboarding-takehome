# Project Overview

## Notes to the Reviewer

### Tech Stack
- **Frontend:** Next.js (App Router), React Hook Form, TypeScript, Tailwind CSS
- **Backend:** Express.js, TypeScript, PostgreSQL
- **Deployment:**
  - Frontend: [Vercel](https://vercel.com/)
  - Backend and Database: [Render](https://render.com/)

### Key Focus Areas
1. **Edge Case Handling:**
   - Accounted for edge cases in user input validation and navigation to ensure smooth onboarding.
2. **Validation and Error Handling:**
   - Integrated React Hook Form for form state management and validation.
3. **Persistent Onboarding Process:**
   - Users can resume the onboarding process from where they left off, providing a seamless experience across sessions.
4. **Improved User Experience via SSR Optimization:**
   - Disabled caching for server-side rendered pages to ensure users always view the most recent data, enhancing real-time updates.
   

### Additional Notes
- **Cold Starts on Render:**
  - The free Render deployment tier introduces cold starts, causing a few seconds of delay on the backend's initial request.
- **Potential Future Improvements:**
  - With additional time, I would have:
    - Included frontend tests to validate that components tied to each step in the onboarding process are rendered correctly.
    - Enhanced the codebase with unit and integration tests to ensure robustness.
    - Implemented the SWR (Stale-While-Revalidate) library to manage caching effectively and improve page performance.



---

## Deployment Details

### Frontend
- Hosted on **Vercel**

### Backend
- Hosted on **Render** along with the **PostgreSQL** database.
- **Note:** Render's free tier introduces a cold start delay on initial requests.

---

