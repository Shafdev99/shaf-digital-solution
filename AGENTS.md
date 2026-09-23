# AGENTS.md — SHAF Digital Solution

## 1. Project Identity

This repository is the main SHAF Digital Solution application.

The parent workspace contains three projects:

1. `shaf-ns-landing-page-v2`
   - Main application and StarterKit foundation.
   - This is the only application that should run in the final result.

2. `shaf-own-design-v7-typography-final`
   - Landing Page V7 frontend reference.
   - Visual source of truth for the public website.

3. `shaf-admin-dashboard-frontend`
   - Admin Dashboard frontend reference.
   - UI/interaction source of truth for the dashboard.

The final product is ONE integrated Node.js application, not three applications.

---

## 2. Source of Truth Priority

When implementing the integration:

1. Explicit user instruction
2. This `AGENTS.md`
3. `PRD.md`
4. `DESIGN.md`
5. Existing StarterKit architecture and conventions
6. Frontend reference projects

If frontend reference code conflicts with the StarterKit architecture, adapt the frontend to the StarterKit. Do not replace the StarterKit architecture.

---

## 3. Core Architecture — DO NOT REBUILD

The existing StarterKit is the architectural foundation.

Preserve the existing pattern:

`Route → Controller → Service → Model → Database`

Technology:
- Node.js
- Express
- EJS
- Sequelize
- MySQL
- ES Modules
- existing authentication/session foundation

Do NOT introduce:
- React
- Vue
- Next.js
- Nuxt
- separate frontend application
- separate backend application
- `frontend/`
- `backend/`
- `client/`
- `server/`
- a second Express application
- a second database connection
- a second authentication system

Do not rebuild the application from scratch.

---

## 4. Integration Rule

The two frontend projects are REFERENCE MATERIAL, not applications to be blindly copied.

Integrate their useful HTML/CSS/JS/assets into the existing StarterKit.

Do not create:

`StarterKit + Landing App + Dashboard App`

Create:

`One StarterKit application containing Landing Page + Dashboard + Backend + Auth + Database`.

---

## 5. Final View Structure

Use the existing EJS architecture.

Target:

```text
views/
├── components/
├── layouts/
├── home/
├── dashboard/
└── auth/
```

Landing Page belongs in `views/home/`.

Dashboard belongs in `views/dashboard/`.

Create deeper dashboard folders only when required by the actual features in `PRD.md`.

Do not create empty folders/files merely to make the tree look complete.

---

## 6. Public Assets

Use the existing `public/` directory.

Preferred target:

```text
public/
├── css/
├── js/
└── images/
```

Reuse existing assets where possible.

Do not duplicate the same CSS/JS/asset under multiple frontend folders.

If Landing Page and Dashboard need different CSS/JS, separate files are allowed, for example:

```text
public/css/app.css
public/css/dashboard.css

public/js/app.js
public/js/dashboard.js
```

Do not load Bootstrap twice.

---

## 7. Landing Page Rules

Reference:

`shaf-own-design-v7-typography-final`

This reference is the visual source of truth.

Preserve:
- layout
- typography
- spacing
- colors
- paper/editorial texture
- section hierarchy
- responsive behavior
- visual character
- button treatment
- card treatment
- illustration style

Do not redesign V7 without an explicit user request.

Do not replace it with a generic AI/SaaS/agency landing page.

Convert static HTML into EJS where dynamic data is required.

Dynamic candidates include:
- services
- portfolio
- products
- testimonials
- FAQ
- contact/settings content

---

## 8. Dashboard Rules

Reference:

`shaf-admin-dashboard-frontend`

The dashboard is a CMS-like admin interface for managing Landing Page content.

Preserve its intended:
- sidebar/navigation
- topbar
- dashboard overview
- cards
- tables
- forms
- search
- filters
- pagination
- CRUD interaction
- status controls
- responsive behavior
- mobile navigation

The dashboard may prioritize usability over marketing presentation, but it must remain visually consistent with SHAF.

---

## 9. Database Integration

Dashboard-managed content must use the backend/database.

Example:

```text
Dashboard
→ Route
→ Controller
→ Service
→ Model
→ MySQL
```

Public page:

```text
Landing Page
→ Route
→ Controller
→ Service
→ Model
→ MySQL
→ EJS
```

Do not hard-code dashboard-managed content into HTML/JavaScript.

Do not use localStorage as the final content store.

---

## 10. Wikan Mascot & AI Companion

Wikan is the official AI companion and mascot of SHAF Digital Solution.

When working on the public landing page:
- Keep Wikan visually consistent with the approved SHAF character concept: compact humanoid robot, dark SHAF green, warm orange accents, expressive LED face, friendly technical companion.
- Wikan may appear in the hero and selected supporting sections as a recurring brand character.
- Use the approved Wikan assets under `public/images/wikan/` when available.
- Do not replace Wikan with generic AI/robot stock imagery.
- Do not redesign or recolor Wikan arbitrarily.
- Wikan is part of SHAF's brand storytelling, not a random decorative element.
- Keep the mascot presence subtle enough that the landing page remains a SHAF service/portfolio website first.

## 11. Existing Code Safety

Before changing code:
- inspect the actual StarterKit
- reuse existing helpers, services, models, middleware, auth, and conventions
- understand existing routes before adding new ones
- avoid unrelated refactors

Do not delete working StarterKit functionality merely to simplify the integration.

Do not rename major existing directories unless explicitly required.

Integration is more important than refactoring.

---

## 11. Coding Style

Prefer:
- simple code
- readable code
- small focused functions
- consistent naming
- existing project conventions
- reusable components only where repetition is real
- server-rendered EJS for normal CRUD screens

Avoid:
- unnecessary abstractions
- premature design systems in code
- excessive JavaScript
- unnecessary dependencies
- clever code that is difficult to maintain

---

## 12. Responsive Rule

Responsive behavior means recomposition, not merely shrinking.

Check:
- desktop
- tablet
- mobile around 390px width
- no unintended horizontal overflow
- readable typography
- usable touch targets
- dashboard tables/forms remain usable

---

## 13. Verification

After integration:
- run existing tests
- verify server starts
- verify public Landing Page
- verify login/logout
- verify protected dashboard
- verify CRUD routes
- verify database operations
- verify responsive behavior
- check browser console for avoidable errors
- check for broken asset paths
- check for duplicate Bootstrap/CSS/JS loading

Fix integration errors caused by the work.

Do not hide test failures.

---

## 14. Agent Execution Rule

For this integration task:

1. Briefly inspect/audit the three projects.
2. Build the integration mapping mentally or in a short working note.
3. Execute the integration.
4. Do not stop after producing a plan unless a destructive or genuinely ambiguous decision requires user input.
5. Preserve working code.
6. Test the result.

The goal is a working integrated application, not merely a proposal.

---

## 15. Change Control

Do not make visual or architectural changes outside the requested integration.

If something can be solved by adapting existing code, adapt it.

If something can be solved without adding a dependency, do not add one.

If a conflict exists, prefer the smallest change that preserves:
- StarterKit architecture
- V7 visual fidelity
- Dashboard UI fidelity
- functionality
