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
