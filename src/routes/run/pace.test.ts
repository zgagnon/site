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
