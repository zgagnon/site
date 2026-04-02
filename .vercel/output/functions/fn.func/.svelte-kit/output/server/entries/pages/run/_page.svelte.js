import { c as create_ssr_component, f as add_attribute, e as escape, h as each } from "../../../chunks/ssr.js";
const LONG_CAP = 60;
function fmt(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.round(secs % 60);
  return m + ":" + String(s).padStart(2, "0");
}
function paces(goalSec) {
  return {
    easyLo: fmt(goalSec * 1.09375),
    easyHi: fmt(goalSec * 1.1875),
    tempoLo: fmt(goalSec * 1.03125),
    tempoHi: fmt(goalSec * 1.0625),
    intLo: fmt(goalSec * 0.9375),
    intHi: fmt(goalSec * 0.96875),
    goal: fmt(goalSec)
  };
}
function longRun(mins) {
  const capped = Math.min(mins, LONG_CAP);
  return capped < mins ? `${capped} min easy (capped from ${mins})` : `${capped} min easy`;
}
function isValidGoal(goalSec) {
  return goalSec >= 180 && goalSec <= 1200;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let min = 8;
  let sec = 0;
  let pc = paces(480);
  let phases = [];
  function generate() {
    const goalSec = min * 60 + sec;
    if (!isValidGoal(goalSec))
      return;
    pc = paces(goalSec);
    phases = buildPlan(pc);
  }
  function buildPlan(pc2) {
    const e = `${pc2.easyLo}–${pc2.easyHi}/km`;
    const t = `${pc2.tempoLo}–${pc2.tempoHi}/km`;
    const tl = pc2.tempoLo;
    const th = pc2.tempoHi;
    const i = `${pc2.intLo}–${pc2.intHi}/km`;
    const ih = pc2.intHi;
    const il = pc2.intLo;
    const g = pc2.goal;
    return [
      {
        title: "Weeks 1–3: Gentle Rebuild",
        weeks: [
          {
            name: "Week 1",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: "6×1:00 hard w/ 1:00 walk/easy. 10:00 WU, 5:00 CD.",
                pace: `~${ih}/km`
              },
              {
                day: "Wed",
                tag: "easy",
                text: "20–25 min easy.",
                pace: e
              },
              {
                day: "Fri",
                tag: "tempo",
                text: "6×1:00 strong w/ 2:00 easy between. WU/CD.",
                pace: `~${th}/km`
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(35)}.`,
                pace: e
              }
            ]
          },
          {
            name: "Week 2",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: "7×1:00 hard w/ 1:00 easy.",
                pace: `~${ih}/km`
              },
              {
                day: "Wed",
                tag: "easy",
                text: "25–30 min easy."
              },
              {
                day: "Fri",
                tag: "tempo",
                text: "4×2:00 strong w/ 2:00 easy.",
                pace: t
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(38)}.`,
                pace: e
              }
            ]
          },
          {
            name: "Week 3",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: "6×1:30 hard w/ 1:30 easy.",
                pace: i
              },
              {
                day: "Wed",
                tag: "easy",
                text: "30 min easy."
              },
              {
                day: "Fri",
                tag: "tempo",
                text: "5×2:00 strong w/ 2:00 easy.",
                pace: t
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(42)}.`,
                pace: e
              }
            ]
          }
        ]
      },
      {
        title: "Week 4: Down Week + Check-in",
        weeks: [
          {
            name: "Week 4",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: "6×1:00 hard w/ 1:00 easy (a touch easier than wk 3)."
              },
              {
                day: "Wed",
                tag: "easy",
                text: "25–30 min easy."
              },
              {
                day: "Fri",
                tag: "tempo",
                text: "Tempo test: 10:00 easy → 8–10:00 continuous strong → 5–10:00 easy. Note avg pace."
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(38)}.`,
                pace: e
              }
            ]
          }
        ]
      },
      {
        title: "Weeks 5–7: Steady Work",
        weeks: [
          {
            name: "Week 5",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: "6×2:00 hard w/ 2:00 easy. WU/CD.",
                pace: `~${ih}/km`
              },
              {
                day: "Wed",
                tag: "easy",
                text: "30 min easy."
              },
              {
                day: "Fri",
                tag: "tempo",
                text: "3×4:00 strong w/ 2:00 easy.",
                pace: `~${th}–${tl}/km`
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(48)}.`,
                pace: e
              }
            ]
          },
          {
            name: "Week 6",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: "7×2:00 hard w/ 2:00 easy (same pace, +1 rep)."
              },
              {
                day: "Wed",
                tag: "easy",
                text: "30–35 min easy."
              },
              {
                day: "Fri",
                tag: "tempo",
                text: `12:00 continuous strong — "comfortably hard," don't chase the watch.`
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(55)} — only if finishing feeling okay.`
              }
            ]
          },
          {
            name: "Week 7 (mini-down)",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: "6×1:30 hard w/ 1:30 easy."
              },
              {
                day: "Wed",
                tag: "easy",
                text: "30 min easy."
              },
              {
                day: "Fri",
                tag: "tempo",
                text: "Dress rehearsal: 10:00 easy → 2×1 km strong (not all-out) w/ 3:00 easy → 5–10:00 easy."
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(45)}.`,
                pace: e
              }
            ]
          }
        ]
      },
      {
        title: "Weeks 8–9: Light Sharpening",
        weeks: [
          {
            name: "Week 8",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: "6×2:00 hard; 1–2 reps quicker if springy.",
                pace: `~${ih}/km`
              },
              {
                day: "Wed",
                tag: "easy",
                text: "30 min easy."
              },
              {
                day: "Fri",
                tag: "tempo",
                text: '2×8:00 strong w/ 3:00 easy ("comfortably hard").'
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(60)}.`,
                pace: e
              }
            ]
          },
          {
            name: "Week 9",
            open: true,
            days: [
              {
                day: "Tue",
                tag: "interval",
                text: `8×1:00 hard w/ 1:00 easy; by feel, not faster than ~${il}/km.`
              },
              {
                day: "Wed",
                tag: "easy",
                text: "30 min easy."
              },
              {
                day: "Fri",
                tag: "tempo",
                text: "10–12:00 continuous strong."
              },
              {
                day: "Sun",
                tag: "easy",
                text: `${longRun(50)}.`,
                pace: e
              }
            ]
          }
        ]
      },
      {
        title: "Week 10: Race Week",
        weeks: [
          {
            name: "Week 10",
            open: true,
            days: [
              {
                day: "Mon",
                tag: "rest",
                text: "Rest or 20–25 min very easy + 3–4 relaxed strides (15–20s)."
              },
              {
                day: "Tue",
                tag: "race",
                text: "5×1:00 at goal pace w/ 2:00 easy. Full WU/CD.",
                pace: `~${g}/km`
              },
              {
                day: "Wed",
                tag: "easy",
                text: "20–25 min easy."
              },
              {
                day: "Thu",
                tag: "rest",
                text: "Rest or 15–20 min super easy."
              },
              { day: "Fri", tag: "rest", text: "Rest." },
              {
                day: "Sat",
                tag: "race",
                text: "Race day! WU 10–15 min easy + strides. Run by feel."
              }
            ]
          }
        ]
      }
    ];
  }
  generate();
  const tagClasses = {
    easy: "bg-blue-100 text-blue-800",
    tempo: "bg-amber-100 text-amber-800",
    interval: "bg-pink-100 text-pink-800",
    race: "bg-green-100 text-green-800",
    rest: "bg-stone-100 text-stone-500"
  };
  const zoneClasses = {
    easy: "bg-blue-100 border-blue-500",
    tempo: "bg-amber-100 border-amber-500",
    interval: "bg-pink-100 border-pink-500",
    race: "bg-green-100 border-green-800"
  };
  return `  ${$$result.head += `<!-- HEAD_svelte-1uwfleo_START -->${$$result.title = `<title>5K Race Prep Plan — Zoe Gagnon</title>`, ""}<!-- HEAD_svelte-1uwfleo_END -->`, ""} <div class="font-urbanist max-w-xl mx-auto px-4 py-8"><h1 class="text-2xl font-bold" data-svelte-h="svelte-5q3xb5">5K Race Prep Plan</h1> <p class="text-stone-400 text-sm mt-1" data-svelte-h="svelte-1kowyzn">10-week progressive build · effort over pace</p> <div class="flex gap-3 items-end flex-wrap mt-6"><div><label class="font-semibold text-sm block mb-1" data-svelte-h="svelte-1v8xlpa">Goal 5K pace</label> <div class="flex items-center gap-1"><input type="number" min="3" max="20" class="w-20 text-center px-3 py-2 border-2 border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"${add_attribute("value", min, 0)}> <span data-svelte-h="svelte-5vnx5k">:</span> <input type="number" min="0" max="59" class="w-20 text-center px-3 py-2 border-2 border-stone-300 rounded-lg focus:outline-none focus:border-stone-500"${add_attribute("value", sec, 0)}> <span class="text-sm text-stone-400" data-svelte-h="svelte-1aroge4">/km</span></div></div> <button class="px-5 py-2 bg-stone-700 text-white rounded-lg font-semibold hover:opacity-90" data-svelte-h="svelte-191i4pc">Update paces</button></div> <div class="mt-4"><div class="grid grid-cols-2 sm:grid-cols-4 gap-2"><div class="${"p-2.5 rounded-lg text-sm border-l-4 " + escape(zoneClasses.easy, true)}"><strong class="block" data-svelte-h="svelte-35tcdp">Easy / Long</strong>${escape(pc.easyLo)}–${escape(pc.easyHi)}/km</div> <div class="${"p-2.5 rounded-lg text-sm border-l-4 " + escape(zoneClasses.tempo, true)}"><strong class="block" data-svelte-h="svelte-139977v">Tempo / Strong</strong>${escape(pc.tempoLo)}–${escape(pc.tempoHi)}/km</div> <div class="${"p-2.5 rounded-lg text-sm border-l-4 " + escape(zoneClasses.interval, true)}"><strong class="block" data-svelte-h="svelte-wdbccu">Intervals</strong>${escape(pc.intLo)}–${escape(pc.intHi)}/km</div> <div class="${"p-2.5 rounded-lg text-sm border-l-4 " + escape(zoneClasses.race, true)}"><strong class="block" data-svelte-h="svelte-ihyst8">Goal race</strong>${escape(pc.goal)}/km</div></div></div> <p class="text-sm text-stone-400 italic mt-3" data-svelte-h="svelte-ada8il">Effort rules always beat numbers: easy = can chat; tempo = short phrases; intervals = hard but repeatable.</p> ${each(phases, (phase, pi) => {
    return `<div class="text-xs uppercase tracking-wider text-stone-500 font-bold mt-6 mb-2">${escape(phase.title)}</div> ${each(phase.weeks, (week, wi) => {
      return `<div class="bg-white rounded-lg border border-stone-200 mb-3 overflow-hidden"><button class="w-full px-3 py-2.5 font-bold text-sm bg-stone-100 hover:bg-stone-200 cursor-pointer flex justify-between items-center">${escape(week.name)} <span class="${[
        "text-xs text-stone-400 transition-transform",
        week.open ? "rotate-90" : ""
      ].join(" ").trim()}" data-svelte-h="svelte-yi2ucw">▶</span></button> ${week.open ? `<div class="px-3">${each(week.days, (d, di) => {
        return `<div class="${"py-1.5 text-sm " + escape(
          di < week.days.length - 1 ? "border-b border-stone-200" : "",
          true
        )}"><span class="font-semibold inline-block w-12">${escape(d.day)}</span> <span class="${"inline-block text-xs font-semibold px-1.5 py-0.5 rounded mr-1 " + escape(tagClasses[d.tag], true)}">${escape(d.tag)}</span> ${escape(d.text)} ${d.pace ? `<span class="text-stone-700 font-semibold">(${escape(d.pace)})</span>` : ``} </div>`;
      })} </div>` : ``} </div>`;
    })}`;
  })}</div>`;
});
export {
  Page as default
};
