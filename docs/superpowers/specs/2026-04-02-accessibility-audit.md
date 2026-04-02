# Accessibility & Readability Audit

## Critical

1. **Invalid HTML attribute** — `+layout.svelte:20` has a bare `a` attribute on the banner div. Remove it.

2. **Multiple h1 per page** — Layout has `h1` for "Zoe Gagnon", and pages add their own `h1`s. Resume page has three (`Experience`, `Education`, `Organization`). Only one `h1` per page; page titles should be `h2`.

## Important

3. **Low contrast on stone-400 text** — `text-stone-400` (#a1a1aa) on `stone-50` (#fafaf9) is ~3:1, fails WCAG AA (needs 4.5:1). Affects: subtitle on `/run`, unit labels, effort rules text, collapse arrows. Use `stone-500` or darker.

4. **External links missing rel** — `+layout.svelte:48-50`: Email, GitHub, LinkedIn links have `target="_blank"` but no `rel="noreferrer noopener"`. Security and accessibility issue.

5. **No `<main>` landmark** — `+layout.svelte` wraps page content in a plain `div`. Screen readers can't identify the primary content area. Wrap `<slot />` in `<main>`.

6. **Label not associated with inputs** — `run/+page.svelte:154`: "Goal 5K pace" label has no `for` attribute and covers two inputs (min/sec). Add `id`s to inputs and use `aria-labelledby` or separate labels.

7. **Dropdown missing ARIA role** — `+layout.svelte:30`: The dropdown `div` with mouseenter/mouseleave needs `role="menu"` on the panel and `aria-haspopup="true"` + `aria-expanded` on the button.

8. **Nav lacks visual separation** — Nav uses `bg-stone-50`, same as page background. Add a bottom border or subtle shadow to distinguish it.

## Minor

9. **No skip-to-content link** — Fixed header with banner and nav forces keyboard users to tab through everything. Add a visually-hidden skip link.

10. **Week toggle missing aria-expanded** — `run/+page.svelte:195`: Collapsible week buttons should have `aria-expanded={week.open}` for screen readers.

11. **Resume heading hierarchy** — `work.svelte` uses h2→h4→h3 instead of sequential h2→h3→h4. Same in `project.svelte`.

12. **Fixed width breaks mobile** — Home page (`w-[800px]`) and resume page (`w-[800px]`) overflow on mobile. Use `max-w-[800px] w-full` instead.

13. **Missing aria-labels on run inputs** — Min/sec number inputs have no `id` or `aria-label` to indicate minutes vs seconds.

14. **No focus indicators on dropdown** — "Projects ▾" button has `hover:underline` but no visible focus outline for keyboard users.

15. **Rest tag low contrast** — `bg-stone-100 text-stone-500` is ~4.2:1, barely passes AA. Consider darkening to `stone-600`.

16. **Small touch targets** — Week toggle buttons on `/run` and nav dropdown items may be too small for touch (< 44px).

17. **Mobile text sizing** — `text-xs` and `text-sm` on `/run` page may be hard to read on small screens.

18. **Font URL quoting inconsistency** — `app.css`: Regular fonts use single-quoted URLs, italic fonts use double-quoted. Functional but inconsistent.

19. **No viewport-relative scaling** — All font sizes are fixed; no responsive typography.

20. **Dropdown keyboard gaps** — Button captures Escape but doesn't handle ArrowDown to navigate menu items.
