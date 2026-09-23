# PRD.md — SHAF Digital Solution Integrated Application

## 1. Product

**SHAF Digital Solution — Personal Brand, Portfolio, Services & Digital Products**

The product is a public-facing SHAF website with an authenticated admin dashboard.

The public website communicates:
- who SHAF is
- what SHAF can do
- selected work
- digital products
- working process
- trust
- how to start a conversation

The dashboard manages the content shown on the public website.

---

## 2. Integration Goal

Integrate these three existing projects:

```text
shaf-ns-landing-page-v2
    = application core / StarterKit

shaf-own-design-v7-typography-final
    = Landing Page V7 visual reference

shaf-admin-dashboard-frontend
    = Dashboard visual/UI reference
```

Final result:

```text
ONE Node.js + Express + EJS + Sequelize + MySQL application
```

The Landing Page and Dashboard must share the same backend, authentication, services, models, and database.

---

## 3. Existing StarterKit Must Remain the Foundation

Existing architecture:

```text
Route
→ Controller
→ Service
→ Model
→ Database
```

Use and extend existing StarterKit code before creating new abstractions.

The final application must continue using:
- Node.js
- Express
- EJS
- Sequelize
- MySQL
- ES Modules
- existing auth/session foundation

---

# 4. Public Landing Page

## 4.1 Sections

Implement the V7 Landing Page with these sections:

1. Navbar
2. Hero
3. Intro / Positioning
4. Services
5. Selected Work / Portfolio
6. Digital Products
7. Process
8. Trust / About
9. FAQ
10. Final CTA / WhatsApp
11. Footer

---

## 4.2 Hero

Primary headline:

**Ide yang masih berantakan, kita bikin jadi beres.**

Supporting text:

**Dari dokumen dan data sampai website dan dukungan IT. Satu partner untuk menyelesaikan pekerjaan digital yang benar-benar dibutuhkan.**

Primary CTA:
**Konsultasi gratis**

Secondary CTA:
**Lihat yang bisa dikerjakan**

Trust promises:
- Komunikasi langsung
- Solusi sesuai kebutuhan
- Tanpa proses ribet

---

## 4.3 Services

Four service pillars:

1. Pengolahan Dokumen
2. Pengolahan Data
3. Desain & Website
4. IT Support & Remote Desktop

Services should ultimately be manageable from Dashboard.

---

## 4.4 Portfolio

Use selected work/portfolio.

Featured project baseline:

**SHAF Digital Solution**

Category:
**WEB DESIGN**

Year:
**2026**

The implementation must support database-driven portfolio entries.

Portfolio requirements:
- title
- slug or identifier where useful
- category
- description
- image
- project URL where applicable
- status
- featured flag
- ordering
- created/updated timestamps

---

## 4.5 Digital Products

Initial products:

1. SHAF Node StarterKit
2. Dashboard Starter
3. Template & Resource

Products should be database-driven and manageable from Dashboard.

Suggested product fields:
- name
- slug
- short description
- description
- image
- price if applicable
- external URL if applicable
- category
- status
- featured
- order
- created/updated timestamps

---

## 4.6 Process

Four steps:

1. Ceritakan kebutuhannya
2. Susun solusi
3. Kerjakan bersama
4. Serahkan dengan rapi

---

## 4.7 Trust

Core message:

**Teknis boleh. Manusia tetap utama.**

Initial facts:
- Praktis
- Fleksibel
- Langsung
- Bertumbuh

Testimonials should be manageable from Dashboard.

---

## 4.8 FAQ

Initial questions:

- Apakah bisa konsultasi dulu?
- Apakah bisa untuk pekerjaan kecil?
- Apakah website bisa dibuat custom?
- Bagaimana cara memulai?

FAQ must be manageable from Dashboard.

---

## 4.9 Contact

Headline:

**Punya ide? Jangan dipendam.**

CTA:

**Chat via WhatsApp**

Current WhatsApp target:

`https://wa.me/6285163561008`

Keep contact data configurable where practical rather than hard-coded in multiple files.

---

# 5. Authentication

Use the existing StarterKit authentication/session foundation.

Required:
- login
- logout
- session
- protected dashboard routes

Do not create a parallel authentication system.

---

# 6. Admin Dashboard

Dashboard is a CMS-like interface.

## 6.1 Overview

Show useful summaries such as:
- services count
- portfolio count
- products count
- testimonials count
- FAQ count
- messages count

Include quick actions and recent activity where practical.

Keep it simple.

---

## 6.2 Services CRUD

Required:
- list
- create
- read/detail where useful
- update
- delete with confirmation
- active/inactive or published/draft status
- ordering
- validation
- success/error feedback
- search/filter if useful

---

## 6.3 Portfolio CRUD

Required:
- list
- create
- detail
- update
- delete
- category filter
- status filter
- featured filter
- search
- sorting
- pagination
- ordering
- image upload/replace
- validation
- success/error feedback

---

## 6.4 Products CRUD

Required:
- list
- create
- detail
- update
- delete
- category filter
- status filter
- search
- sorting
- pagination
- ordering
- image management
- validation
- success/error feedback

---

## 6.5 Testimonials CRUD

Required:
- list
- create
- update
- delete
- status
- ordering
- validation

Suggested fields:
- name
- role/company
- quote
- photo if needed
- status
- order

---

## 6.6 FAQ CRUD

Required:
- list
- create
- update
- delete
- category if useful
- status
- ordering
- search
- pagination

---

## 6.7 Messages / Inbox

Contact messages should support:
- list
- search
- read/unread
- detail
- mark as read
- delete or archive if practical

Suggested fields:
- name
- email/contact
- subject
- message
- read status
- created timestamp

---

## 6.8 Settings

Manage basic site identity/configuration where practical:
- site name
- WhatsApp/contact
- social links
- other simple global content

Do not build an unnecessarily complex settings system.

---

# 7. Reusable Dashboard UI

Where appropriate, use reusable patterns for:
- table
- search
- pagination
- filters
- sorting
- status badge/toggle
- confirmation modal
- form fields
- image preview
- empty state
- loading state
- success/error feedback

Do not over-engineer these into a framework.

---

# 8. DataTable Requirements

For management lists where useful:
- search
- pagination
- sorting
- filtering
- row actions
- responsive behavior

Preferred page sizes:
- 10
- 25
- 50

For mobile, tables should recompose into readable cards/list layouts when practical instead of forcing unnecessary horizontal overflow.

---

# 9. Image Management

For portfolio/products and other image-based content:
- upload
- preview
- replace
- correct public URL/path
- remove obsolete files when safely possible

Do not store large images as base64 inside the database.

Use paths/filenames and store metadata in the database.

---

# 10. States

UI must handle:
- loading
- empty
- validation error
- server error
- success
- confirmation before destructive actions

Avoid raw browser `alert()` for normal application feedback.

---

# 11. Data Flow

Example:

```text
Admin creates Portfolio
→ Portfolio Route
→ Portfolio Controller
→ Portfolio Service
→ Portfolio Model
→ MySQL
```

Then:

```text
Visitor opens Landing Page
→ Home Route
→ Home Controller
→ Portfolio Service
→ Portfolio Model
→ MySQL
→ EJS
```

The same principle applies to:
- services
- products
- testimonials
- FAQ
- settings
- messages where applicable

---

# 12. Acceptance Criteria

The integration is considered functionally complete when:

- one project runs the application
- Landing Page is rendered through EJS
- Dashboard is rendered through EJS
- authentication protects dashboard
- public page and dashboard use the same database
- dashboard CRUD persists data
- Landing Page reflects database data
- V7 visual design remains recognizable and faithful
- dashboard reference remains recognizable and usable
- no duplicate frontend applications exist inside the final app
- no second backend exists
- no second database connection exists
- existing tests still pass or are updated appropriately
- no avoidable broken asset paths exist
- mobile layout is usable
