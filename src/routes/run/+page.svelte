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
  <h2 class="text-2xl font-bold">5K Race Prep Plan</h2>
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
