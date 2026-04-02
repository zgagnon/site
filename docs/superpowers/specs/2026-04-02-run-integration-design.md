# Integrate 5K Training Plan into Portfolio Site

## Summary

Port the standalone 5K race prep training plan app (vanilla HTML/CSS/JS) into the SvelteKit portfolio site as a new `/run` route. Add a "Projects" dropdown to the navigation to house it.

## Navigation Changes

**Current nav:** Home | Resume | Email | GitHub | LinkedIn (flat links in `+layout.svelte`)

**New nav:** Home | Resume | Projects ▾ | Email | GitHub | LinkedIn

- "Projects" is a dropdown containing "5K Training Plan" → `/run`
- Dropdown styled consistently with the site: stone-50 background, stone-200 border
- Other nav items unchanged

**Dropdown interaction:**
- Desktop: opens on hover (mouseenter), closes on mouseleave
- Mobile/touch: opens on click, closes on click outside or second click
- Keyboard: focusable via Tab, opens on Enter/Space, Escape closes
- Z-index: dropdown panel needs z-10 or higher (nav container is already z-50)

## New Route: `/run`

### Page Structure

- **Page title:** Simple `<h1>` heading ("5K Race Prep Plan") with subtitle, no banner — flows with site layout
- **`<svelte:head>`:** Sets `<title>5K Race Prep Plan — Zoe Gagnon</title>`
- **Controls section:** Goal pace input (minutes:seconds) with "Update paces" button. Valid range: 3:00–20:00/km (180–1200 seconds). Out-of-range input is silently ignored (matches original behavior).
- **Pace legend:** 4-zone grid showing calculated pace ranges
- **Effort rules:** Italic callout text
- **Training plan:** Collapsible week cards grouped by phase
- **Max width:** Content constrained to `max-w-xl` (matches original's 600px) centered on page

### Color Scheme Adaptation

**Adapted to site palette (stone/slate):**
- Page background: `stone-50` (inherited from site)
- Card backgrounds: `white`
- Card borders: `stone-200`
- Week headers: `stone-100`, hover `stone-200`
- Phase titles: `stone-500`, uppercase, letter-spaced
- Button: `stone-700` background, white text
- Input borders: `stone-300`, focus ring `stone-500`
- Muted text: `stone-400`
- Pace note highlights: `text-stone-700 font-semibold`

**Kept from original (functional zone colors):**
- Easy/Long: `bg-blue-100` / `border-blue-500` / tag text `blue-800`
- Tempo/Strong: `bg-amber-100` / `border-amber-500` / tag text `amber-800`
- Intervals: `bg-pink-100` / `border-pink-500` / tag text `pink-800`
- Race: `bg-green-100` / `border-green-800` / tag text `green-800`
- Rest: `bg-stone-100` / text `stone-500`

### Typography

- The `/run` page applies `font-urbanist` on its own wrapper element
- No changes to the global layout or app.css

### Logic (ported as-is)

- Pace calculation: easy (1.09375×–1.1875× goal), tempo (1.03125×–1.0625×), intervals (0.9375×–0.96875×)
- `fmt()` function for mm:ss display
- Long run capped at 60 minutes
- 10-week plan across 5 phases, typically 4 training days per week (6 days in race week 10)
- Collapsible week cards (all open by default)
- Reactive: changing input and clicking update regenerates all paces and plan display

### Rendering approach

The original app bakes HTML into template literal strings (e.g., `<span class="pace-note">`). In the Svelte port, convert these into proper Svelte markup — use components or inline elements rather than `{@html}`. The plan data structure should return plain data objects, and the template handles rendering.

### File Structure

```
src/routes/run/
  +page.svelte        # Main page component (controls, legend, plan rendering)
```

Plan data and pace logic live in the `+page.svelte` `<script>` block — no need for separate modules given the app's size.

## What Is NOT Changing

- Home page
- Resume page
- Layout banner/header image
- Global fonts, app.css, tailwind config
- Any existing components
