# DESIGN.md — SHAF Digital Solution Design System

## 1. Design Source of Truth

There are two visual references:

### Landing Page
`shaf-own-design-v7-typography-final`

This is the primary visual source of truth for the public website.

### Dashboard
`shaf-admin-dashboard-frontend`

This is the primary UI source of truth for the admin dashboard.

Do not redesign either reference during integration unless the user explicitly asks for a design change.

---

# 2. Design Direction

## Clean Editorial Digital

Core principle:

**Information is the design.**

The interface should feel:
- practical
- creative
- technical
- human
- reliable

SHAF design DNA:
- structured
- resourceful
- expressive
- human
- useful

Desired mood:
- calm
- confident
- human
- technical
- creative

---

# 3. Landing Page Visual Baseline

The locked V7 baseline is:

**Paper Texture + Poppins/Open Sans + Green/Orange Typography + Clean Editorial Digital**

Preserve:
- paper/material background effect
- generous whitespace
- editorial composition
- asymmetric layout
- restrained visual decoration
- clear hierarchy
- lightweight typography
- green-led identity
- orange as a restrained accent
- practical UI
- responsive recomposition

Do not introduce:
- gradients as a visual centerpiece
- glassmorphism
- neon
- glow effects
- rainbow palettes
- excessive blobs
- excessive rounded cards
- AI SaaS aesthetics
- excessive animation
- decorative elements that harm readability or cause overflow

---

# 4. Color System

Primary brand color:

`#103A1C`

Use it for:
- primary identity
- important headings
- buttons where appropriate
- strong UI emphasis

Orange accent:

`#D66A3D`

Use it sparingly for:
- small highlights
- secondary emphasis
- links/accent details
- visual rhythm

Neutral/background system should remain light and paper/editorial.

Do not introduce additional dominant colors without explicit instruction.

Color must support hierarchy, not decoration.

---

# 5. Typography

Primary font:

**Poppins**

Use for:
- headings
- navigation
- labels
- buttons
- important UI

Secondary font:

**Open Sans**

Use for:
- body text
- descriptions
- long-form content
- supporting information

Typography should feel light and natural.

Avoid excessively bold headings.

Do not use huge display typography that dominates the page without purpose.

---

# 6. Layout

Use an editorial layout with:
- consistent content container
- generous whitespace
- strong alignment
- asymmetric composition where appropriate
- clear section rhythm
- readable content widths

Conceptual grid:

**12 columns**

Not every section must visibly use a grid.

Do not make every section symmetrical.

---

# 7. Spacing

Whitespace is a core design element.

Prefer:
- comfortable section spacing
- clear separation between heading, description, and content
- generous card padding
- readable form spacing
- enough mobile breathing room

Do not compress the design merely to reduce page height.

---

# 8. Paper / Texture

The V7 paper/material background effect is part of the visual identity.

Keep it:
- subtle
- low contrast
- non-distracting
- behind content

Do not replace it with:
- heavy noise
- strong gradients
- glowing backgrounds
- busy patterns

---

# 9. Components

## Buttons

Buttons should be:
- clear
- practical
- readable
- visually restrained

Primary CTA uses the SHAF green identity.

Secondary CTA may use a lighter/outline treatment.

Do not make every button visually loud.

---

## Cards

Cards should be used when they help grouping.

Avoid:
- excessive card nesting
- card inside card
- rounded-card-everything
- excessive shadows

Cards should feel like part of the editorial system, not generic SaaS widgets.

---

## Forms

Forms should have:
- clear labels
- readable input text
- sufficient spacing
- visible focus state
- clear validation
- clear primary action
- clear cancellation action

Do not let text blend into the background.

---

# 10. Dashboard Design

The dashboard shares SHAF visual DNA but has a different priority:

### Landing Page
Branding + storytelling + visual communication.

### Dashboard
Clarity + speed + usability + management.

Dashboard may therefore be denser than the Landing Page.

Preserve from the dashboard reference:
- fixed desktop sidebar
- topbar
- compact/tablet behavior
- mobile off-canvas sidebar
- mobile bottom navigation
- dashboard overview
- management tables
- forms
- search
- filters
- pagination
- status controls
- CRUD actions

---

# 11. Dashboard Tables

Tables must prioritize usability.

Desktop:
- readable columns
- clear actions
- useful status indicators

Mobile:
- avoid unnecessary horizontal overflow
- recompose into cards/list where practical
- preserve important information
- keep actions reachable

Pagination should remain simple.

---

# 12. Dashboard Status

Use consistent terminology.

Prefer one consistent pair throughout the application:
- Active / Inactive

or:
- Published / Draft

Do not mix terminology randomly.

The implementation may choose the pair that best fits each resource, but terminology must remain consistent within a feature.

---

# 13. Responsive Design

Responsive design is recomposition, not shrinking.

### Desktop
Use the full intended layout.

### Tablet
Collapse/reduce secondary navigation and preserve content hierarchy.

### Mobile
Prioritize:
- readability
- touch targets
- content hierarchy
- simple navigation
- single-column forms where appropriate
- recomposed dashboard tables

Target mobile testing around:

`390px`

No accidental horizontal overflow.

---

# 14. Motion

Motion should be subtle and purposeful.

Allowed:
- reveal
- hover
- small state transitions
- navigation transitions

Avoid:
- constant motion
- decorative animation loops
- excessive parallax
- flashy transitions

Respect:

`prefers-reduced-motion`

---

# 15. Accessibility

Maintain:
- sufficient text contrast
- visible focus states
- semantic headings
- useful alt text
- labels for forms
- keyboard-accessible controls
- buttons for actions rather than clickable decorative elements

Do not sacrifice readability for visual effects.

---

# 16. Asset Rules

Use local assets under:

`public/images/`

Prefer:
- WebP
- AVIF
- optimized PNG/JPG where necessary

Portfolio image frame baseline:
- approximately 16:10

Product image frame baseline:
- approximately 1.45:1

Do not add random stock imagery merely to fill empty space.

---

# 17. Content Style

Copy should feel:
- direct
- human
- practical
- confident
- understandable

Avoid:
- corporate jargon
- exaggerated marketing claims
- generic AI copy
- unnecessary buzzwords

SHAF should sound like a real person solving real problems.

---

# 18. Page Composition

Landing Page narrative:

```text
Who is SHAF?
↓
What can SHAF do?
↓
What has SHAF made?
↓
What can I get?
↓
How does SHAF work?
↓
Why trust SHAF?
↓
What next?
```

The visual hierarchy should support this narrative.

---

# 19. Implementation Rule

When converting the V7 and Dashboard HTML into EJS:

- preserve visual structure first
- then introduce dynamic data
- then connect backend
- do not redesign while converting

If a static section becomes database-driven, change only what is necessary to make the content dynamic.

---

# 20. Wikan Mascot

Wikan is the official AI companion and mascot for SHAF Digital Solution.

Visual direction:
- compact humanoid AI companion
- SHAF dark green body with restrained orange accents
- expressive LED face
- friendly, technical, human-feeling presence
- subtle futuristic details without becoming sci-fi-heavy

Usage:
- introduce Wikan in the hero as the AI companion behind SHAF
- use Wikan again in selected sections such as About/Trust and Contact
- connect Wikan to the four core service pillars: Dokumen, Data, Website, IT Support
- use the approved local assets under `public/images/wikan/`
- preserve the existing SHAF typography, whitespace, paper texture, and restrained color system

Wikan must feel like a recurring SHAF character, not generic AI decoration.

---

# 21. Design Lock

The following are locked unless the user explicitly requests a change:

- Clean Editorial Digital direction
- V7 Landing Page composition
- Paper/material texture
- Poppins + Open Sans
- primary green `#103A1C`
- restrained orange accent `#D66A3D`
- lightweight typography
- whitespace
- responsive recomposition
- no AI-SaaS visual language
- no gradients/glassmorphism/neon/glow as dominant treatment

Integration work must not silently become a redesign.
