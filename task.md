# Project Tasks

- [x] **Phase 1: Project Initialization**
  - [x] Initialize frontend React application with Vite, configure TailwindCSS.
  - [x] Initialize backend Node.js application, install Express.
  - [x] Setup PostgreSQL database and initialize Prisma ORM.
  - [x] Setup `.env` configurations.

- [ ] **Phase 2: Backend Development (API & Database)**
  - [ ] Implement Prisma schema models (`User` with bio, `Link`).
  - [ ] Create authentication logic (`/register`, `/login`, JWT middleware).
  - [ ] Create Profile & Links CRUD endpoints.
  - [ ] Implement bulk update endpoint for drag-and-drop link ordering.
  - [ ] Add analytics tracking route to record link clicks incrementally.

- [ ] **Phase 3: Frontend UI Components & Layout**
  - [ ] Develop global navigation header and visual layout container.
  - [ ] Create foundational UI components (Inputs, standard Buttons, Loading Spinners).
  - [ ] Develop the standalone Mobile Mockup component (Live Preview Container).

- [ ] **Phase 4: Frontend State & Authenticated Connections**
  - [ ] Add React Router and configure Protected Routes natively.
  - [ ] Implement Auth Context & API utilities (axios setup/interceptors).
  - [ ] Build visual Authentication Pages (Login / Signup).

- [ ] **Phase 5: Core App Features (Links & Profile Details)**
  - [ ] Build Profile Details page (Form states, basic validation layout, Image Upload handler, Bio input).
  - [ ] Build Links Editor page (Form blocks, 'Add New Link', dynamic form field injections).
  - [ ] Implement auto platform-detection logic dynamically checking URL values.
  - [ ] Integrate `@hello-pangea/dnd` for smooth drag and drop interactions linking items.

- [x] **Phase 6: Public Profile Dashboard, Sharing & Analytics Layer**
  - [x] Build the Public DevLinks Page (Read-only view showing avatar, name, bio, links).
  - [x] Add native "Copy Link" to Clipboard helper feature.
  - [x] Implement QR Code sharing modal using `qrcode.react`.
  - [x] Implement Click Tracking on External Links (dispatching click event tracking endpoints).
  - [x] Construct Analytics Dashboard interfaces locally (showing click metrics/popular links).

- [x] **Phase 7: General Visual Polish & Validation Constraints**
  - [x] Implement secure Logout functionality in the Header.
  - [x] Verify hover and focus states systematically across all interactive elements based on Mockup.
  - [x] Integrate layout responsiveness for phone sizing vs tablet vs desktop dynamically.
  - [x] Ensure frontend `react-hook-form` validations cleanly display visual warnings in-UI for incorrect patterns.

- [x] **Phase 8: Deployment Process**
  - [x] Unify project under a root `package.json` with build/start scripts.
  - [x] Update frontend `api.js` to dynamically use production vs development baseURLs.
  - [x] Configure Express backend to conditionally serve the React static `dist` folder.
  - [x] Deploy frontend to Netlify.
  - [x] Create `render.yaml` blueprint for backend deployment.
