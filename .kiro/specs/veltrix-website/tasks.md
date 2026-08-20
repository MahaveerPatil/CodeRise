# Implementation Plan: VELTRIX Website

## Overview

Build the complete VELTRIX premium IT company website as a React + Vite + TypeScript + Tailwind CSS + Framer Motion SPA. The implementation follows the design-first architecture: scaffold and tokens first, then reusable UI primitives, then section-by-section composition, then routing and advanced effects, finishing with SEO, accessibility, and performance hardening.

All implementation uses TypeScript with strict typing. Animations reference the Framer Motion variants defined in `src/utils/animations.ts`. Every section targets the exact requirements and correctness properties documented in the design.

---

## Tasks

- [x] 1. Project scaffold, configuration, and design tokens
  - [x] 1.1 Initialize Vite + React + TypeScript project and install all dependencies
    - Run `npm create vite@latest . -- --template react-ts`
    - Install: `framer-motion react-router-dom clsx tailwind-merge`
    - Install dev: `tailwindcss postcss autoprefixer @types/node`
    - Run `npx tailwindcss init -p`
    - _Requirements: 1.1_

  - [x] 1.2 Create directory structure and base configuration files
    - Create all required directories: `src/components/ui`, `src/components/navigation`, `src/components/cards`, `src/components/forms`, `src/components/effects`, `src/components/seo`, `src/sections`, `src/pages`, `src/layouts`, `src/data`, `src/hooks`, `src/utils`, `src/assets/fonts`, `src/assets/icons`
    - Add Google Fonts `<link>` tags for Inter, Syne, and JetBrains Mono with `preconnect` and `display=swap` in `index.html`
    - _Requirements: 1.2, 1.5_

  - [x] 1.3 Implement design tokens and configure Tailwind
    - Create `src/design-system/tokens.ts` with all `colors`, `gradients`, `typography`, `spacing`, `radii`, `shadows`, and `glass` constants exactly as specified in the design document
    - Update `tailwind.config.js` to extend theme using the token values (colors, font families, border-radius, box-shadow)
    - Add CSS custom properties to `src/index.css` for brand gradient and glass effects
    - _Requirements: 1.3, 1.4_

  - [x] 1.4 Implement utility functions and animation variants
    - Create `src/utils/cn.ts` exporting the `cn()` helper combining `clsx` and `tailwind-merge`
    - Create `src/utils/animations.ts` exporting all named Framer Motion variants: `fadeUp`, `fadeIn`, `scaleUp`, `staggerContainer`, `wordReveal`, `slideInLeft`, `drawLine`, and `pageTransition`
    - Create `src/utils/seo.ts` exporting `defaultSEO` and `organizationSchema` constants
    - _Requirements: 1.6, 1.7_

- [x] 2. Custom hooks
  - [x] 2.1 Implement core utility hooks
    - Create `src/hooks/useReducedMotion.ts` — wraps `window.matchMedia('(prefers-reduced-motion: reduce)')` and returns a boolean; updates on change
    - Create `src/hooks/useInView.ts` — wraps IntersectionObserver with `threshold: 0.15`, `rootMargin: '-50px 0px'`, `triggerOnce: true`; returns `[ref, inView]`
    - Create `src/hooks/useScrollProgress.ts` — tracks `window.scrollY / (document.body.scrollHeight - window.innerHeight)`, throttled to 60fps via `requestAnimationFrame`
    - _Requirements: 18.2, 23.4_

  - [x] 2.2 Implement interaction hooks
    - Create `src/hooks/useMousePosition.ts` — tracks global mouse coordinates via `mousemove`, throttled to 60fps via `requestAnimationFrame`; returns `{ x, y }`
    - Create `src/hooks/useMagneticEffect.ts` — accepts a ref and strength config; on pointer enter/move, calculates displacement (max 12px, strength 0.3) and returns `{ x, y }` spring values; returns zeros on coarse pointer devices
    - Create `src/hooks/useAnimatedCounter.ts` — accepts `end`, `duration` (2000ms), and `easing` ('easeOutQuart'); starts on `inView` flag; returns current display value; respects `useReducedMotion` by immediately returning final value
    - _Requirements: 12.3, 18.6, 19.3, 23.4_

  - [ ]* 2.3 Write property tests for useAnimatedCounter
    - **Property 7: Counter Animation Viewport-Gating** — before `inView` is true, returned value equals 0; after `inView` is true, returned value equals the easing function applied to elapsed time
    - **Validates: Requirements 12.3**

  - [ ]* 2.4 Write property tests for useMagneticEffect
    - **Property 17: Magnetic Button Pointer-Type Gating** — on coarse pointer, displacement is always `{ x: 0, y: 0 }` regardless of cursor position; on fine pointer, displacement magnitude never exceeds 12px
    - **Validates: Requirements 2.3, 18.6**

- [x] 3. Core UI primitives
  - [x] 3.1 Implement `SectionHeading` and `Badge` components
    - Create `src/components/ui/SectionHeading.tsx` implementing the `SectionHeadingProps` interface; parse `[...]` bracket syntax in `title` to split into gradient and plain text spans; support `label`, `subtitle`, `align`, and `size` props
    - Create `src/components/ui/Badge.tsx` for technology tags with small monospaced text on a subtle dark background; accept `children` and optional `className`
    - _Requirements: 2.1, 2.4_

  - [ ]* 3.2 Write property test for SectionHeading bracket parsing
    - **Property 6: Section Heading Bracket Parsing** — for any title string, substrings in `[...]` receive gradient styling; all text outside brackets receives primary text color; no characters are dropped or duplicated
    - **Validates: Requirements 2.1**

  - [x] 3.3 Implement `Button` component
    - Create `src/components/ui/Button.tsx` implementing the full `ButtonProps` interface
    - Support all 4 variants: `primary` (filled gradient + glow shadow), `ghost` (transparent + border), `outline`, `glow`
    - Support all 3 sizes: `sm`, `md`, `lg`
    - Render as `<a>` when `href` is provided; support `loading` (spinner) and `disabled` states
    - Wire `useMagneticEffect` when `magnetic={true}` and pointer is fine; no effect on coarse pointer
    - Apply `aria-disabled` on disabled state; minimum touch target 44×44px
    - _Requirements: 2.2, 2.3, 22.1, 24.3_

  - [x] 3.4 Implement `GlowCard`, `AnimatedText`, `Modal`, and `Divider`
    - Create `src/components/ui/GlowCard.tsx` — glassmorphism shell with `backdrop-filter: blur(16px)`, dark semi-transparent background, top-edge highlight border
    - Create `src/components/ui/AnimatedText.tsx` — splits `children` string into words, wraps each in `motion.span` with `wordReveal` variant and stagger; checks `useReducedMotion` and renders statically if true
    - Create `src/components/ui/Modal.tsx` — full-screen overlay with `strong` glass style; focus trap on open; restore focus on close; close on Escape key
    - Create `src/components/ui/Divider.tsx` — decorated section divider with gradient line
    - _Requirements: 2.5, 2.6, 2.7_

  - [ ]* 3.5 Write property tests for AnimatedText reduced motion
    - **Property 1: Reduced Motion Compliance (AnimatedText)** — when `useReducedMotion` returns true, all word spans render with `opacity: 1` and `y: 0` immediately with zero transition duration
    - **Validates: Requirements 18.1, 2.7**

- [x] 4. Navigation components
  - [x] 4.1 Implement `Navbar` with scroll-state transitions
    - Create `src/components/navigation/Navbar.tsx`
    - Implement 3-state scroll machine: `transparent` (scroll = 0), `glass` (0 < scroll < 100), `scrolled` (scroll ≥ 100) — uses `useScrollProgress` converted to pixel scroll; reads `window.scrollY` directly for pixel accuracy
    - Render visually hidden "Skip to main content" link as first focusable element
    - Apply `role="navigation"` and `aria-label="Main navigation"` on the `<nav>` element
    - Render all 7 navigation links with smooth-scroll behavior (offset = 64px + 20px buffer); hide links on viewport < 768px
    - Render "Start a Project →" CTA button (primary variant) that smooth-scrolls to contact section
    - Show hamburger icon button on mobile; apply visible focus ring; minimum 44×44px tap target
    - _Requirements: 3.1–3.7, 3.13, 22.2, 24.3_

  - [ ]* 4.2 Write property test for Navbar scroll state determinism
    - **Property 2: Navbar Scroll State Determinism** — for any scroll position `p`, the computed nav state is always the same pure function of `p`; same input always yields same background opacity and blur
    - **Validates: Requirements 3.2, 3.3, 3.4**

  - [x] 4.3 Implement `MobileMenu`
    - Create `src/components/navigation/MobileMenu.tsx`
    - Full-screen overlay with glass background; navigation links animate in from left with 30ms stagger
    - Lock `document.body` scroll on open; unlock on close
    - Close on Escape key press; close on backdrop click
    - Implement focus trap within open menu; return focus to hamburger button on close
    - Set `aria-expanded` on trigger button; `aria-controls` referencing menu element ID
    - _Requirements: 3.8–3.12, 22.3_

  - [ ]* 4.4 Write property test for MobileMenu scroll lock invariant
    - **Property 5: Mobile Menu Scroll Lock Invariant** — for any sequence of open/close actions, `document.body.style.overflow` is `'hidden'` when menu is open and `''` when menu is closed, at every point in time
    - **Validates: Requirements 3.9**

- [x] 5. Data layer
  - [x] 5.1 Create all content data files
    - Create `src/data/services.ts` — 8 services (Web Dev, Software Dev, Mobile, AI/ML, Cloud/DevOps, E-Commerce, UI/UX, Maintenance) each with `id`, `icon`, `title`, `description`, `tags`, `expandedContent`
    - Create `src/data/technologies.ts` — 17 technologies each with `name`, `icon`; split into two rows for the carousel
    - Create `src/data/process.ts` — 7 steps with zero-padded number, `title`, `description`
    - Create `src/data/solutions.ts` — 4 solution categories (Startups, Small Businesses, Growing Companies, Enterprises) with `name`, `description`, `services[]`
    - Create `src/data/stats.ts` — 4 statistics with `value`, `suffix`, `label`
    - Create `src/data/testimonials.ts` — 3+ placeholder testimonials with `name`, `company`, `role`, `text`, `rating`; clearly marked as placeholder
    - Create `src/data/navigation.ts` — nav link array with `label`, `href` (section anchor)
    - _Requirements: 5.6, 6.2, 10.2, 11.2, 12.1, 14.2_

  - [x] 5.2 Create projects data file
    - Create `src/data/projects.ts` implementing the full `Project` interface from the design document
    - Include all 5+ required projects: "Intelligent Traffic Management System", "Business Management Platform", "E-Commerce Platform", "AI Analytics Dashboard", plus at least 1 additional
    - Each project has full case study data: `problem`, `solution`, `architecture`, `technologies`, `results`, `challenges`, `outcome`, `imagePlaceholder`, `accentColor`, `timeline`, `teamSize`
    - _Requirements: 7.8, 8.3_

  - [ ]* 5.3 Write property test for services data completeness
    - **Property 12: Services Data Completeness** — the exported services array contains exactly 8 entries; all 8 required service titles are present; no duplicates exist
    - **Validates: Requirements 5.6**

- [x] 6. Effect and SEO components
  - [x] 6.1 Implement `ParticleField` canvas component
    - Create `src/components/effects/ParticleField.tsx` (lazy-loaded via `React.lazy`)
    - Initialize 80 particles (40 on mobile < 640px) with random positions, velocities in `{ min: 0.2, max: 0.8 }`, random size `{ min: 1, max: 3 }`, colors from `['#6366F1', '#06B6D4', '#8B5CF6']`
    - Each animation frame: update positions, wrap edges, draw particles, draw connection lines for pairs within 120px
    - Apply mouse repulsion force for particles within 150px of cursor (only on fine pointer / non-touch); ensure each particle always moves away from cursor (distance increases)
    - Use `requestAnimationFrame`; cancel frame ref on unmount
    - When `prefers-reduced-motion` is active: render static snapshot (no animation loop)
    - _Requirements: 4.2–4.4, 4.13, 4.14, 23.2, 23.3_

  - [ ]* 6.2 Write property tests for ParticleField
    - **Property 9: Particle Connection Distance Predicate** — for any two particles, a connection line is drawn if and only if `dist(p1, p2) ≤ 120`; no connection for distance > 120
    - **Property 10: Particle Mouse Repulsion Direction** — for any particle within 150px of mouse, after one frame the distance from particle to mouse is ≥ distance before the frame
    - **Validates: Requirements 4.3, 4.4**

  - [x] 6.3 Implement `ScrollProgress`, `GlowOrb`, and `AnimatedGrid` effect components
    - Create `src/components/effects/ScrollProgress.tsx` — thin horizontal bar at top of viewport; width driven by `useScrollProgress`; brand gradient fill
    - Create `src/components/effects/GlowOrb.tsx` — ambient radial gradient orb; accepts `color`, `size`, `opacity`, `className` props
    - Create `src/components/effects/AnimatedGrid.tsx` — SVG perspective grid with 1px lines at 0.15 opacity; CSS keyframe drift animation; static when reduced motion
    - _Requirements: 18.5_

  - [x] 6.4 Implement `SEOHead` and `CustomCursor` components
    - Create `src/components/seo/SEOHead.tsx` — renders `<title>`, `<meta name="description">`, OG tags, Twitter Card tags, `<link rel="canonical">` using React portals into `<head>`; accept `title`, `description`, `canonical`, `ogImage` props; fall back to `defaultSEO`
    - Create `src/components/effects/ScrollProgress.tsx` if not already done (see 6.3)
    - Create `src/components/ui/CustomCursor.tsx` — only renders on `@media (pointer: fine)`; dot (8px solid brand color) tracks cursor exactly; ring (32px, 30% opacity) lerps toward cursor at 0.08 factor per frame using `requestAnimationFrame`; hover state expands ring to 48px / shrinks dot to 4px on links/buttons; hide cursor over text inputs; disable lerp when reduced motion
    - _Requirements: 19.1–19.7, 21.1, 21.4, 21.6_

- [x] 7. Card components
  - [x] 7.1 Implement `ServiceCard`
    - Create `src/components/cards/ServiceCard.tsx` implementing `ServiceCardProps`
    - Default state: icon + title + description + `Badge` tags + right-arrow
    - Hover/focus state: lift translateY(-4px), border animates to brand gradient, expanded content slides up from bottom, arrow rotates 45°; icon glow pulse
    - Staggered entrance: animation delay = `index × 0.1s` using `fadeUp` or `scaleUp` variant
    - Apply `role="article"` and `aria-label` with service name
    - Instant transitions when reduced motion active
    - _Requirements: 5.3, 5.4, 5.5, 5.7, 5.8, 22_

  - [x] 7.2 Implement `ProjectCard`
    - Create `src/components/cards/ProjectCard.tsx` implementing `ProjectCardProps`
    - Render gradient image placeholder, title, industry tag, description, up to 4 tech `Badge` tags, "View Case Study" and "Live Demo" buttons
    - Featured variant (`featured={true}`): full grid width, taller, more prominent layout
    - Hover: image scales to 1.04, overlay darkens, action buttons fade in
    - Staggered entrance with `scaleUp` variant
    - "View Case Study" navigates to `/projects/:id` via React Router `useNavigate`
    - _Requirements: 7.2–7.7_

  - [x] 7.3 Implement `TestimonialCard` and `SolutionCard`
    - Create `src/components/cards/TestimonialCard.tsx` — displays client name, company, role, testimonial text, star rating; marked as placeholder content
    - Create `src/components/cards/SolutionCard.tsx` — displays category name, description, services list; visually distinct from ServiceCard (different card style/color treatment)
    - Both use `GlowCard` as their outer shell
    - _Requirements: 11.3, 14.3_

- [x] 8. Checkpoint — Core building blocks complete
  - Ensure all hooks, utilities, UI primitives, navigation, data, effects, and card components compile without errors. Run `tsc --noEmit` to check types. Ask the user if any questions arise.

- [ ] 9. Page sections — Part 1
  - [ ] 9.1 Implement `HeroSection`
    - Create `src/sections/HeroSection.tsx`
    - Compose: `ParticleField` (lazy) + `AnimatedGrid` + radial gradient glow orb + centered content
    - Hero text animation sequence: overline (0ms) → headline words via `AnimatedText` (200ms) → supporting text (600ms) → CTA buttons (900ms) → scroll indicator (1200ms)
    - Two CTA buttons: "Start a Project" (primary magnetic) and "Explore Our Work" (ghost)
    - Bouncing scroll-down chevron indicator at bottom
    - Section is `min-h-screen` flex-center; perspective grid at 0.15 opacity
    - _Requirements: 4.1–4.14, 18.4, 18.6_

  - [x] 9.2 Implement `ServicesSection`
    - Create `src/sections/ServicesSection.tsx`
    - `SectionHeading` with label "WHAT WE BUILD"; heading uses `[Technology]` bracket syntax for gradient word
    - Responsive 8-card grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
    - Map `services` data to `ServiceCard` components with `index` prop for stagger
    - `staggerContainer` wraps the grid; cards animate in on section entry via `useInView`
    - _Requirements: 5.1, 5.2, 5.6, 5.7_

  - [x] 9.3 Implement `TechEcosystemSection`
    - Create `src/sections/TechEcosystemSection.tsx`
    - `SectionHeading` with label "TECH STACK" and heading "Powered By Modern Technology"
    - Split 17 technologies into two rows; Row 1 scrolls left, Row 2 scrolls right via CSS `@keyframes` infinite scroll
    - Each item shows tech name + icon/logo mark
    - Pause animation on hover using `animation-play-state: paused`
    - Static grid layout when reduced motion active
    - _Requirements: 6.1–6.6_

  - [x] 9.4 Implement `ProjectsSection`
    - Create `src/sections/ProjectsSection.tsx`
    - `SectionHeading` with label "OUR WORK" and heading "Ideas We've Turned Into Reality"
    - Map `projects` data to `ProjectCard` components; first card gets `featured={true}` and spans full width
    - Staggered entrance with `useInView`
    - _Requirements: 7.1–7.8_

- [x] 10. Case Study Page and routing
  - [x] 10.1 Implement `CaseStudyPage`
    - Create `src/pages/CaseStudyPage.tsx` (default export for `React.lazy`)
    - Use `useParams` to get `:id`; look up project in `projects` data; redirect to `'/'` if not found (using `useNavigate` + `useEffect`)
    - Render all case study sections: title, industry, tagline, problem, solution, architecture, technologies (as `Badge` components), process steps, results, challenges, outcome
    - Include prominent back-navigation button that navigates to `/#projects`
    - Render `SEOHead` with project-specific title, description, and canonical URL
    - Apply `fadeUp` entrance animations with `useInView` on each major section block
    - _Requirements: 8.1–8.7, 21.2_

  - [ ]* 10.2 Write property test for invalid project route redirect
    - **Property 11: Invalid Project Route Redirect** — for any `id` string not present in the `projects` array, the component calls `navigate('/')` exactly once; for valid IDs, no redirect occurs
    - **Validates: Requirements 8.4**

  - [x] 10.3 Implement `RootLayout`, `PageWrapper`, and routing configuration
    - Create `src/layouts/PageWrapper.tsx` — wraps children in `motion.div` with `pageTransition` variants (fade + scale 0.98); used with `AnimatePresence`
    - Create `src/layouts/RootLayout.tsx` — renders `Navbar` + `AnimatePresence` with `PageWrapper` around the `<Outlet>` + `Footer`; also renders `CustomCursor`, `ScrollProgress`, `SEOHead` (defaults), and `LoadingScreen`
    - Configure React Router: `BrowserRouter` in `main.tsx`; routes: `/` → `HomePage`, `/projects/:id` → lazy `CaseStudyPage` in `Suspense`; add `404` fallback route to `HomePage`
    - _Requirements: 8.5, 23.1_

- [x] 11. Page sections — Part 2
  - [x] 11.1 Implement `WhyChooseUsSection`
    - Create `src/sections/WhyChooseUsSection.tsx`
    - `SectionHeading` with label "WHY VELTRIX" and heading "Technology With Purpose."
    - Render 6 differentiator items (icon + title + description) with `fadeUp` entrance animations staggered at 0.1s intervals via `useInView`
    - _Requirements: 9.1–9.4_

  - [x] 11.2 Implement `ProcessSection` with animated timeline
    - Create `src/sections/ProcessSection.tsx`
    - `SectionHeading` with label "HOW WE WORK" and heading "From Idea to Impact"
    - Desktop (≥ 1024px): horizontal 7-node row connected by SVG `<line>` animated with `drawLine` variant; each node shows zero-padded number, title, description
    - Mobile (< 1024px): vertical left-aligned timeline with connecting vertical line
    - Steps activate sequentially as section enters viewport (stagger 0.15s per node)
    - Active step: number in brand gradient, title brightens
    - _Requirements: 10.1–10.6, 24.5_

  - [x] 11.3 Implement `SolutionsSection`
    - Create `src/sections/SolutionsSection.tsx`
    - `SectionHeading` with label "SOLUTIONS" and heading "Solutions For Every Stage of Growth"
    - 4-column responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) of `SolutionCard` components
    - Visually distinct from Services section (different card color treatment / border style)
    - Staggered entrance animations via `useInView`
    - _Requirements: 11.1–11.5_

  - [x] 11.4 Implement `StatsSection`
    - Create `src/sections/StatsSection.tsx`
    - Distinctive background: brand gradient with overlay (not transparent/plain)
    - 4-column grid (`grid-cols-2 lg:grid-cols-4`) with 4 statistics from `stats` data
    - Each stat uses `useAnimatedCounter` hook (2000ms duration, easeOutQuart); wraps value in `aria-live="polite"` span
    - Trigger count-up animation via `useInView`; immediate final value when reduced motion
    - _Requirements: 12.1–12.5, 22.6_

- [ ] 12. Page sections — Part 3
  - [x] 12.1 Implement `AboutSection`
    - Create `src/sections/AboutSection.tsx`
    - `SectionHeading` with label "ABOUT US" and heading "We're Building More Than Software."
    - Two-column layout (text + founder card) with introductory paragraph
    - Mission, Vision, Values as distinct subsections/cards using `GlowCard`
    - Founder card: placeholder avatar circle, "VELTRIX Founder & CEO" title, placeholder name and bio
    - `fadeUp` and `slideInLeft` entrance animations via `useInView`
    - _Requirements: 13.1–13.4_

  - [ ] 12.2 Implement `TestimonialsSection` with carousel
    - Create `src/sections/TestimonialsSection.tsx`
    - `SectionHeading` with label "CLIENT STORIES"
    - Carousel displaying 3+ `TestimonialCard` components; previous/next buttons and dot indicators
    - Auto-advance every 5000ms using `setInterval`; reset timer on any user interaction (prev, next, dot click)
    - Keyboard navigation (left/right arrow keys when carousel is focused)
    - _Requirements: 14.1–14.7_

  - [ ]* 12.3 Write property test for carousel timer reset
    - **Property 14: Carousel Timer Reset on Interaction** — after any navigation interaction, the time-until-next-advance resets to exactly 5000ms; verified by mocking `setInterval` and checking it is cleared and restarted with 5000ms on each interaction
    - **Validates: Requirements 14.6**

  - [x] 12.4 Implement `CTASection`
    - Create `src/sections/CTASection.tsx`
    - Headline "Have an Idea? Let's Build It." and supporting text
    - Two buttons: "Start a Project" (primary magnetic) and "Talk to Us" (ghost); both smooth-scroll to Contact section
    - Animated background: reuse `GlowOrb` components for animated gradient orbs
    - `fadeUp` entrance animations on headline and buttons via `useInView`
    - _Requirements: 15.1–15.6_

- [x] 13. Contact form and footer
  - [x] 13.1 Implement `ContactForm` with full validation
    - Create `src/components/forms/ContactForm.tsx`
    - All 8 fields: Name, Company, Email, Phone, Service (select), Budget (select), Timeline (select), Description (textarea) — all options exactly as specified in requirements
    - Semantic HTML: `<form>`, `<label for="...">`, `<input id="...">`, `<select id="...">`, `<textarea id="...">` with matching `for`/`id` pairs
    - Required fields: Name, Email, Service, Description; validate on submit attempt
    - Email format validation via regex
    - On blur of a previously-errored field: clear error if now valid
    - Error messages associated via `aria-describedby`; error message IDs match field IDs
    - Success state: animated checkmark (Framer Motion scale + opacity) + thank-you message replaces form
    - Error state: error banner above form; user's data preserved
    - 2-column layout on desktop; 1-column on mobile
    - _Requirements: 16.1–16.11, 22.4, 22.5, 24.6_

  - [ ]* 13.2 Write property tests for ContactForm validation
    - **Property 3: Contact Form Required-Field Validation Totality** — for all 16 combinations (2⁴) of present/absent required fields, `isSubmittable` returns true only when all 4 required fields are non-empty and email is valid; false for all other combinations
    - **Property 4: Form Error State Round-Trip** — for any field that transitions to error state, providing a valid value and blurring always clears the error; error states are strictly reversible
    - **Property 16: Form Field ARIA Association** — for any field in error state, `aria-describedby` references the rendered error element's ID; absent for non-error fields
    - **Validates: Requirements 16.5, 16.6, 16.7, 22.5**

  - [x] 13.3 Implement `ContactSection`
    - Create `src/sections/ContactSection.tsx`
    - Two-column layout: left column (heading, tagline, info cards for email/phone/location, social media links); right column (`ContactForm`)
    - Social links: LinkedIn, GitHub, Twitter/X, Instagram — each with descriptive `aria-label`
    - `slideInLeft` entrance for left column; `fadeUp` for form; triggered via `useInView`
    - _Requirements: 16.10, 22.7_

  - [x] 13.4 Implement `Footer`
    - Create a `Footer` component (either in `src/components/` or `src/layouts/`)
    - VELTRIX logo/name, short description, tagline "Built with ambition. Powered by technology."
    - Three link groups: main navigation links, services links, contact/social group
    - Social icon links (LinkedIn, GitHub, Twitter/X, Instagram) with `aria-label="Follow VELTRIX on [Platform]"` each
    - Privacy Policy and Terms & Conditions links (placeholder `#` hrefs or modal trigger)
    - Copyright notice with dynamically computed `new Date().getFullYear()`
    - _Requirements: 17.1–17.6, 22.7_

- [x] 14. Checkpoint — All sections complete
  - Compose all sections into `src/pages/HomePage.tsx` in the correct order: Hero → Services → TechEcosystem → Projects → WhyChooseUs → Process → Solutions → Stats → About → Testimonials → CTA → Contact. Run `tsc --noEmit` and verify no type errors. Ask the user if any questions arise.

- [x] 15. Special effects and advanced features
  - [x] 15.1 Implement loading screen
    - Create a `LoadingScreen` component rendered by `RootLayout`
    - VELTRIX logo/wordmark with SVG stroke draw-in animation using Framer Motion `pathLength`
    - Horizontal progress bar completes below the logo
    - Auto-dismisses after max 1500ms using `setTimeout`
    - Exit animation: fade out; sets a state flag so it never re-shows after first dismiss
    - _Requirements: 18.4_

  - [x] 15.2 Implement Easter egg (Konami Code)
    - Create a `useKonamiCode` hook in `src/hooks/useKonamiCode.ts`
    - Track last 10 `keydown` events; each event must be within 2000ms of the previous; activate only on exact `↑↑↓↓←→←→BA` sequence
    - Create `src/components/effects/EasterEgg.tsx` — full-screen terminal overlay: dark background, monospace green text, ASCII art "VELTRIX", scrolling fake boot sequence lines
    - Auto-dismiss after 5000ms; dismiss immediately on Escape key or overlay click
    - Does not affect body scroll, form state, or scroll position
    - _Requirements: 20.1–20.5_

  - [ ]* 15.3 Write property test for Konami Code state machine
    - **Property 13: Konami Code State Machine Correctness** — for any sequence of key events, the detector activates only on the exact Konami sequence with each event within 2000ms; all other sequences (partial match, wrong key, timeout) leave it inactive
    - **Validates: Requirements 20.1**

- [x] 16. SEO, accessibility, and performance hardening
  - [x] 16.1 Add JSON-LD Organization schema and complete SEO setup
    - Inject `organizationSchema` as `<script type="application/ld+json">` in homepage `<head>` via `SEOHead`
    - Verify homepage has `<title>`, `<meta name="description">`, all OG tags, Twitter Card tags, `<link rel="canonical">`
    - Verify `CaseStudyPage` renders project-specific `<title>`, description, and canonical via `SEOHead` props
    - Add `alt=""` attributes on all decorative images and descriptive `alt` on all meaningful images
    - Use `loading="lazy"` on all images not in the initial viewport
    - Add `<html lang="en">` in `index.html`
    - _Requirements: 21.1–21.6, 23.6_

  - [x] 16.2 Implement semantic HTML structure and focus management audit
    - Ensure `index.html` and `RootLayout` use `<header>`, `<nav>`, `<main>`, `<footer>` correctly
    - Verify one `<h1>` per page, `<h2>` for section headings, `<h3>` for card headings throughout all sections and cards
    - Verify all interactive elements have visible 2px focus ring in brand color with 2px offset (`outline: 2px solid #6366F1; outline-offset: 2px`)
    - Verify logical tab order matches visual reading order
    - Verify `AnimatedCounter` elements have `aria-live="polite"`
    - Verify `MobileMenu` button has correct `aria-expanded` and `aria-controls`
    - _Requirements: 21.3, 22.1, 22.2, 22.3, 22.6, 22.8_

  - [ ]* 16.3 Write property test for focus indicator coverage
    - **Property 15: Interactive Element Focus Indicator Coverage** — for a representative set of interactive element types (button, link, input, select, textarea), each has a CSS rule applying `outline: 2px solid [brand-color]` on `:focus-visible`
    - **Validates: Requirements 22.1**

  - [x] 16.4 Performance and bundle optimization
    - Configure `vite.config.ts` with manual chunk splitting: `vendor` chunk for `react`, `react-dom`, `framer-motion`; `ui` chunk for shared UI components; `sections` chunk for section components
    - Verify `ParticleField` is wrapped in `React.lazy` + `Suspense` in `HeroSection`
    - Verify `CaseStudyPage` is wrapped in `React.lazy` + `Suspense` in router config
    - Verify `ParticleField` `requestAnimationFrame` loop is cancelled on unmount via `useEffect` cleanup
    - Verify all `mousemove` and `scroll` listeners are throttled via `requestAnimationFrame`
    - Add Terser minification plugin to Vite config for production builds
    - _Requirements: 23.1–23.6_

- [x] 17. Final checkpoint — Full integration
  - Run `tsc --noEmit` to confirm zero TypeScript errors across the entire project.
  - Run `npm run build` to confirm successful production bundle.
  - Verify all 17 correctness properties can be traced to implemented code.
  - Ensure all sections render correctly, all animations are gated by `useReducedMotion`, and all accessibility attributes are in place.
  - Ask the user if any questions arise before concluding.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP delivery.
- All property-based tests validate correctness properties defined in `design.md § 11`.
- Every task references specific requirements for traceability.
- Checkpoints at tasks 8, 14, and 17 ensure incremental validation at meaningful milestones.
- The design uses TypeScript throughout — no language selection was needed.
- Data files (Task 5) can be worked on in parallel with component implementation.
- Custom hooks (Task 2) must be completed before the sections that depend on them.

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2"] },
    { "id": 2, "tasks": ["1.3", "1.4"] },
    { "id": 3, "tasks": ["2.1", "5.1", "5.2"] },
    { "id": 4, "tasks": ["2.2", "2.3", "2.4", "5.3"] },
    { "id": 5, "tasks": ["3.1", "3.3", "3.4", "6.3"] },
    { "id": 6, "tasks": ["3.2", "3.5", "4.1", "4.3", "6.1", "7.3"] },
    { "id": 7, "tasks": ["4.2", "4.4", "6.2", "6.4", "7.1", "7.2"] },
    { "id": 8, "tasks": ["9.1", "9.2", "9.3", "9.4", "10.3"] },
    { "id": 9, "tasks": ["10.1", "11.1", "11.2", "11.3", "11.4"] },
    { "id": 10, "tasks": ["10.2", "12.1", "12.2", "12.4", "13.3", "13.4"] },
    { "id": 11, "tasks": ["12.3", "13.1"] },
    { "id": 12, "tasks": ["13.2", "15.1", "15.2"] },
    { "id": 13, "tasks": ["15.3", "16.1", "16.2"] },
    { "id": 14, "tasks": ["16.3", "16.4"] }
  ]
}
```
