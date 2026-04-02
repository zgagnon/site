# 5K Training Plan Integration — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the standalone 5K race prep app into the SvelteKit portfolio as a `/run` route with a "Projects" dropdown in the nav.

**Architecture:** New Svelte page at `src/routes/run/+page.svelte` with pace logic extracted to `src/routes/run/pace.ts` for testability. Nav dropdown added inline to `+layout.svelte`. Zone colors preserved, chrome adapted to stone/slate palette.

**Tech Stack:** SvelteKit, Tailwind CSS, Vitest

**Spec:** `docs/superpowers/specs/2026-04-02-run-integration-design.md`

**Original source:** `/Users/zell/workspace/run/index.html`

**Note:** The spec suggests keeping all logic in `+page.svelte`. We deviate by extracting pure functions to `pace.ts` so they can be unit tested without Svelte component infrastructure. The page still owns all rendering and state.

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/routes/run/pace.ts` | Pure pace calculation functions (extracted for testability) |
| Create | `src/routes/run/pace.test.ts` | Unit tests for pace logic |
| Create | `src/routes/run/+page.svelte` | Page component: controls, legend, plan data, rendering |
| Modify | `src/routes/+layout.svelte` | Add "Projects" dropdown to nav |

---

## Chunk 1: Pace Logic and Unit Tests

### Task 1: Pace calculation logic with tests

**Files:**
- Create: `src/routes/run/pace.test.ts`
- Create: `src/routes/run/pace.ts`

- [ ] **Step 1: Write the tests first**

```ts
// src/routes/run/pace.test.ts
import { describe, it, expect } from 'vitest';
import { fmt, paces, longRun, isValidGoal } from './pace';

describe('fmt', () => {
  it('formats seconds as m:ss', () => {
    expect(fmt(480)).toBe('8:00');
    expect(fmt(495)).toBe('8:15');
    expect(fmt(300)).toBe('5:00');
    expect(fmt(605)).toBe('10:05');
  });
});

describe('paces', () => {
  it('calculates zones for 8:00/km goal (480s)', () => {
    const p = paces(480);
    expect(p.goal).toBe('8:00');
    expect(p.easyLo).toBe('8:45');
    expect(p.easyHi).toBe('9:30');
    expect(p.tempoLo).toBe('8:15');
    expect(p.tempoHi).toBe('8:30');
    expect(p.intLo).toBe('7:30');
    expect(p.intHi).toBe('7:45');
  });
});

describe('longRun', () => {
  it('returns uncapped for runs under 60 min', () => {
    expect(longRun(45)).toBe('45 min easy');
  });

  it('caps at 60 minutes', () => {
    expect(longRun(65)).toBe('60 min easy (capped from 65)');
  });

  it('returns exactly 60 without cap note', () => {
    expect(longRun(60)).toBe('60 min easy');
  });
});

describe('isValidGoal', () => {
  it('accepts 3:00 (180s)', () => {
    expect(isValidGoal(180)).toBe(true);
  });

  it('accepts 20:00 (1200s)', () => {
    expect(isValidGoal(1200)).toBe(true);
  });

  it('rejects below 180', () => {
    expect(isValidGoal(179)).toBe(false);
  });

  it('rejects above 1200', () => {
    expect(isValidGoal(1201)).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests — expect failure**

Run: `cd /Users/zell/workspace/personal/repos/site && npx vitest run src/routes/run/pace.test.ts`
Expected: FAIL — `./pace` module not found

- [ ] **Step 3: Implement `pace.ts`**

```ts
// src/routes/run/pace.ts

export const LONG_CAP = 60;

export function fmt(secs: number): string {
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return m + ':' + String(s).padStart(2, '0');
}

export interface Paces {
  easyLo: string;
  easyHi: string;
  tempoLo: string;
  tempoHi: string;
  intLo: string;
  intHi: string;
  goal: string;
}

export function paces(goalSec: number): Paces {
  return {
    easyLo: fmt(goalSec * 1.09375),
    easyHi: fmt(goalSec * 1.1875),
    tempoLo: fmt(goalSec * 1.03125),
    tempoHi: fmt(goalSec * 1.0625),
    intLo: fmt(goalSec * 0.9375),
    intHi: fmt(goalSec * 0.96875),
    goal: fmt(goalSec),
  };
}

export function longRun(mins: number): string {
  const capped = Math.min(mins, LONG_CAP);
  return capped < mins ? `${capped} min easy (capped from ${mins})` : `${capped} min easy`;
}

export function isValidGoal(goalSec: number): boolean {
  return goalSec >= 180 && goalSec <= 1200;
}
```

- [ ] **Step 4: Run tests — expect pass**

Run: `cd /Users/zell/workspace/personal/repos/site && npx vitest run src/routes/run/pace.test.ts`
Expected: All 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/routes/run/pace.ts src/routes/run/pace.test.ts
git commit -m "feat(run): add pace calculation logic with tests"
```

---

## Chunk 2: Training Plan Page

### Task 2: Create the `/run` page

**Files:**
- Create: `src/routes/run/+page.svelte`

The plan data uses Svelte's `Paces` object directly in the template rather than embedding HTML strings. Each day has a `text` field with `{placeholders}` that the template renders as styled spans. This avoids `{@html}` entirely.

- [ ] **Step 1: Create `+page.svelte` with full implementation**

```svelte
<!-- src/routes/run/+page.svelte -->
<script lang="ts">
  import { paces, longRun, isValidGoal, type Paces } from './pace';

  let min = 8;
  let sec = 0;
  let pc: Paces = paces(480);

  interface Day {
    day: string;
    tag: 'easy' | 'tempo' | 'interval' | 'race' | 'rest';
    text: string;
    pace?: string;
  }

  interface Week {
    name: string;
    days: Day[];
    open: boolean;
  }

  interface Phase {
    title: string;
    weeks: Week[];
  }

  let phases: Phase[] = [];

  function generate() {
    const goalSec = min * 60 + sec;
    if (!isValidGoal(goalSec)) return;
    pc = paces(goalSec);
    phases = buildPlan(pc);
  }

  function toggle(phaseIdx: number, weekIdx: number) {
    phases[phaseIdx].weeks[weekIdx].open = !phases[phaseIdx].weeks[weekIdx].open;
  }

  function buildPlan(pc: Paces): Phase[] {
    const e = `${pc.easyLo}–${pc.easyHi}/km`;
    const t = `${pc.tempoLo}–${pc.tempoHi}/km`;
    const tl = pc.tempoLo;
    const th = pc.tempoHi;
    const i = `${pc.intLo}–${pc.intHi}/km`;
    const ih = pc.intHi;
    const il = pc.intLo;
    const g = pc.goal;

    return [
      { title: 'Weeks 1–3: Gentle Rebuild', weeks: [
        { name: 'Week 1', open: true, days: [
          { day: 'Tue', tag: 'interval', text: '6×1:00 hard w/ 1:00 walk/easy. 10:00 WU, 5:00 CD.', pace: `~${ih}/km` },
          { day: 'Wed', tag: 'easy', text: '20–25 min easy.', pace: e },
          { day: 'Fri', tag: 'tempo', text: '6×1:00 strong w/ 2:00 easy between. WU/CD.', pace: `~${th}/km` },
          { day: 'Sun', tag: 'easy', text: `${longRun(35)}.`, pace: e },
        ]},
        { name: 'Week 2', open: true, days: [
          { day: 'Tue', tag: 'interval', text: '7×1:00 hard w/ 1:00 easy.', pace: `~${ih}/km` },
          { day: 'Wed', tag: 'easy', text: '25–30 min easy.' },
          { day: 'Fri', tag: 'tempo', text: '4×2:00 strong w/ 2:00 easy.', pace: t },
          { day: 'Sun', tag: 'easy', text: `${longRun(38)}.`, pace: e },
        ]},
        { name: 'Week 3', open: true, days: [
          { day: 'Tue', tag: 'interval', text: '6×1:30 hard w/ 1:30 easy.', pace: i },
          { day: 'Wed', tag: 'easy', text: '30 min easy.' },
          { day: 'Fri', tag: 'tempo', text: '5×2:00 strong w/ 2:00 easy.', pace: t },
          { day: 'Sun', tag: 'easy', text: `${longRun(42)}.`, pace: e },
        ]},
      ]},
      { title: 'Week 4: Down Week + Check-in', weeks: [
        { name: 'Week 4', open: true, days: [
          { day: 'Tue', tag: 'interval', text: '6×1:00 hard w/ 1:00 easy (a touch easier than wk 3).' },
          { day: 'Wed', tag: 'easy', text: '25–30 min easy.' },
          { day: 'Fri', tag: 'tempo', text: 'Tempo test: 10:00 easy → 8–10:00 continuous strong → 5–10:00 easy. Note avg pace.' },
          { day: 'Sun', tag: 'easy', text: `${longRun(38)}.`, pace: e },
        ]},
      ]},
      { title: 'Weeks 5–7: Steady Work', weeks: [
        { name: 'Week 5', open: true, days: [
          { day: 'Tue', tag: 'interval', text: '6×2:00 hard w/ 2:00 easy. WU/CD.', pace: `~${ih}/km` },
          { day: 'Wed', tag: 'easy', text: '30 min easy.' },
          { day: 'Fri', tag: 'tempo', text: '3×4:00 strong w/ 2:00 easy.', pace: `~${th}–${tl}/km` },
          { day: 'Sun', tag: 'easy', text: `${longRun(48)}.`, pace: e },
        ]},
        { name: 'Week 6', open: true, days: [
          { day: 'Tue', tag: 'interval', text: '7×2:00 hard w/ 2:00 easy (same pace, +1 rep).' },
          { day: 'Wed', tag: 'easy', text: '30–35 min easy.' },
          { day: 'Fri', tag: 'tempo', text: '12:00 continuous strong — "comfortably hard," don\'t chase the watch.' },
          { day: 'Sun', tag: 'easy', text: `${longRun(55)} — only if finishing feeling okay.` },
        ]},
        { name: 'Week 7 (mini-down)', open: true, days: [
          { day: 'Tue', tag: 'interval', text: '6×1:30 hard w/ 1:30 easy.' },
          { day: 'Wed', tag: 'easy', text: '30 min easy.' },
          { day: 'Fri', tag: 'tempo', text: 'Dress rehearsal: 10:00 easy → 2×1 km strong (not all-out) w/ 3:00 easy → 5–10:00 easy.' },
          { day: 'Sun', tag: 'easy', text: `${longRun(45)}.`, pace: e },
        ]},
      ]},
      { title: 'Weeks 8–9: Light Sharpening', weeks: [
        { name: 'Week 8', open: true, days: [
          { day: 'Tue', tag: 'interval', text: '6×2:00 hard; 1–2 reps quicker if springy.', pace: `~${ih}/km` },
          { day: 'Wed', tag: 'easy', text: '30 min easy.' },
          { day: 'Fri', tag: 'tempo', text: '2×8:00 strong w/ 3:00 easy ("comfortably hard").' },
          { day: 'Sun', tag: 'easy', text: `${longRun(60)}.`, pace: e },
        ]},
        { name: 'Week 9', open: true, days: [
          { day: 'Tue', tag: 'interval', text: `8×1:00 hard w/ 1:00 easy; by feel, not faster than ~${il}/km.` },
          { day: 'Wed', tag: 'easy', text: '30 min easy.' },
          { day: 'Fri', tag: 'tempo', text: '10–12:00 continuous strong.' },
          { day: 'Sun', tag: 'easy', text: `${longRun(50)}.`, pace: e },
        ]},
      ]},
      { title: 'Week 10: Race Week', weeks: [
        { name: 'Week 10', open: true, days: [
          { day: 'Mon', tag: 'rest', text: 'Rest or 20–25 min very easy + 3–4 relaxed strides (15–20s).' },
          { day: 'Tue', tag: 'race', text: '5×1:00 at goal pace w/ 2:00 easy. Full WU/CD.', pace: `~${g}/km` },
          { day: 'Wed', tag: 'easy', text: '20–25 min easy.' },
          { day: 'Thu', tag: 'rest', text: 'Rest or 15–20 min super easy.' },
          { day: 'Fri', tag: 'rest', text: 'Rest.' },
          { day: 'Sat', tag: 'race', text: 'Race day! WU 10–15 min easy + strides. Run by feel.' },
        ]},
      ]},
    ];
  }

  generate();

  const tagClasses: Record<string, string> = {
    easy: 'bg-blue-100 text-blue-800',
    tempo: 'bg-amber-100 text-amber-800',
    interval: 'bg-pink-100 text-pink-800',
    race: 'bg-green-100 text-green-800',
    rest: 'bg-stone-100 text-stone-500',
  };

  const zoneClasses: Record<string, string> = {
    easy: 'bg-blue-100 border-blue-500',
    tempo: 'bg-amber-100 border-amber-500',
    interval: 'bg-pink-100 border-pink-500',
    race: 'bg-green-100 border-green-800',
  };
</script>

<svelte:head>
  <title>5K Race Prep Plan — Zoe Gagnon</title>
</svelte:head>

<div class="font-urbanist max-w-xl mx-auto px-4 py-8">
  <h1 class="text-2xl font-bold">5K Race Prep Plan</h1>
  <p class="text-stone-400 text-sm mt-1">10-week progressive build · effort over pace</p>

  <div class="flex gap-3 items-end flex-wrap mt-6">
    <div>
      <label class="font-semibold text-sm block mb-1">Goal 5K pace</label>
      <div class="flex items-center gap-1">
        <input type="number" bind:value={min} min="3" max="20"
               class="w-20 text-center px-3 py-2 border-2 border-stone-300 rounded-lg focus:outline-none focus:border-stone-500" />
        <span>:</span>
        <input type="number" bind:value={sec} min="0" max="59"
               class="w-20 text-center px-3 py-2 border-2 border-stone-300 rounded-lg focus:outline-none focus:border-stone-500" />
        <span class="text-sm text-stone-400">/km</span>
      </div>
    </div>
    <button on:click={generate}
            class="px-5 py-2 bg-stone-700 text-white rounded-lg font-semibold hover:opacity-90">
      Update paces
    </button>
  </div>

  <div class="mt-4">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <div class="p-2.5 rounded-lg text-sm border-l-4 {zoneClasses.easy}">
        <strong class="block">Easy / Long</strong>{pc.easyLo}–{pc.easyHi}/km
      </div>
      <div class="p-2.5 rounded-lg text-sm border-l-4 {zoneClasses.tempo}">
        <strong class="block">Tempo / Strong</strong>{pc.tempoLo}–{pc.tempoHi}/km
      </div>
      <div class="p-2.5 rounded-lg text-sm border-l-4 {zoneClasses.interval}">
        <strong class="block">Intervals</strong>{pc.intLo}–{pc.intHi}/km
      </div>
      <div class="p-2.5 rounded-lg text-sm border-l-4 {zoneClasses.race}">
        <strong class="block">Goal race</strong>{pc.goal}/km
      </div>
    </div>
  </div>

  <p class="text-sm text-stone-400 italic mt-3">
    Effort rules always beat numbers: easy = can chat; tempo = short phrases; intervals = hard but repeatable.
  </p>

  {#each phases as phase, pi}
    <div class="text-xs uppercase tracking-wider text-stone-500 font-bold mt-6 mb-2">{phase.title}</div>
    {#each phase.weeks as week, wi}
      <div class="bg-white rounded-lg border border-stone-200 mb-3 overflow-hidden">
        <button class="w-full px-3 py-2.5 font-bold text-sm bg-stone-100 hover:bg-stone-200 cursor-pointer flex justify-between items-center"
                on:click={() => toggle(pi, wi)}>
          {week.name}
          <span class="text-xs text-stone-400 transition-transform" class:rotate-90={week.open}>▶</span>
        </button>
        {#if week.open}
          <div class="px-3">
            {#each week.days as d, di}
              <div class="py-1.5 text-sm {di < week.days.length - 1 ? 'border-b border-stone-200' : ''}">
                <span class="font-semibold inline-block w-12">{d.day}</span>
                <span class="inline-block text-xs font-semibold px-1.5 py-0.5 rounded mr-1 {tagClasses[d.tag]}">{d.tag}</span>
                {d.text}
                {#if d.pace}
                  <span class="text-stone-700 font-semibold">({d.pace})</span>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  {/each}
</div>
```

- [ ] **Step 2: Verify page renders**

Run: `cd /Users/zell/workspace/personal/repos/site && npm run dev`

Open http://localhost:5173/run in browser. Verify:
- Page loads with title and controls
- Default 8:00 pace shows calculated zones
- Clicking "Update paces" with new values recalculates
- All 10 weeks render across 5 phases
- Week 10 has 6 days (Mon–Sat), all others have 4
- Week cards collapse/expand on click
- Zone tags have correct colors (blue/amber/pink/green/stone)
- Pace notes appear in `stone-700` after day text
- Out-of-range inputs (e.g., 2:00) are silently ignored
- Font is Urbanist

- [ ] **Step 3: Commit**

```bash
git add src/routes/run/+page.svelte
git commit -m "feat(run): add 5K training plan page"
```

---

## Chunk 3: Navigation Dropdown

### Task 3: Add "Projects" dropdown to nav

**Files:**
- Modify: `src/routes/+layout.svelte`

- [ ] **Step 1: Add the Projects dropdown to the nav**

Add `let dropdownOpen = false;` and `let dropdownEl: HTMLDivElement;` to the script block.

Replace the `<nav>` in the template with:

```svelte
<svelte:window on:click={(e) => {
  if (dropdownOpen && dropdownEl && !dropdownEl.contains(e.target)) {
    dropdownOpen = false;
  }
}} />

<!-- inside the existing fixed div, after the banner -->
<nav class="flex flex-row space-x-2 justify-left items-center ml-2 bg-stone-50">
  <a href="/" class:underline="{current.pathname === '/'}">Home</a>
  <a href="/resume" class:underline="{current.pathname === '/resume'}">Resume</a>
  <div class="relative" bind:this={dropdownEl}
       on:mouseenter={() => dropdownOpen = true}
       on:mouseleave={() => dropdownOpen = false}>
    <button class="hover:underline"
            class:underline="{current.pathname.startsWith('/run')}"
            on:click={() => dropdownOpen = !dropdownOpen}
            on:keydown={(e) => { if (e.key === 'Escape') dropdownOpen = false; }}>
      Projects ▾
    </button>
    {#if dropdownOpen}
      <div class="absolute top-full left-0 z-10 bg-stone-50 border border-stone-200 rounded shadow-sm py-1 min-w-[180px]">
        <a href="/run" class="block px-3 py-1.5 hover:bg-stone-100 text-sm"
           on:click={() => dropdownOpen = false}>
          5K Training Plan
        </a>
      </div>
    {/if}
  </div>
  <a href="mailto:zoe@zgagnon.com" target="_blank">Email</a>
  <a href="https://github.com/zgagnon" target="_blank">GitHub</a>
  <a href="https://www.linkedin.com/in/zoe-gagnon-91808815//" target="_blank">LinkedIn</a>
</nav>
```

- [ ] **Step 2: Verify dropdown works**

Run dev server and check:
- "Projects ▾" appears in nav between Resume and Email
- Hover opens dropdown on desktop
- Click toggles dropdown
- "5K Training Plan" link navigates to `/run`
- Dropdown closes when clicking outside (uses `bind:this` ref, not `.closest`)
- Escape key closes dropdown
- Tab reaches the button
- "Projects" is underlined when on `/run` page

- [ ] **Step 3: Commit**

```bash
git add src/routes/+layout.svelte
git commit -m "feat(nav): add Projects dropdown with 5K Training Plan link"
```

---

## Chunk 4: Final Verification

### Task 4: End-to-end check

- [ ] **Step 1: Run all tests**

Run: `cd /Users/zell/workspace/personal/repos/site && npx vitest run`
Expected: All tests pass (existing + new pace tests)

- [ ] **Step 2: Manual verification of full site**

Check at http://localhost:5173:
- Home page: unchanged, no regressions
- Resume page: unchanged, no regressions
- Nav: Projects dropdown works, all other links still correct
- `/run` page: full functionality, correct colors, Urbanist font, responsive at different widths

- [ ] **Step 3: Final commit (if any fixes needed)**

Only if adjustments were made during verification.
