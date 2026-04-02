

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.f7dd6ffb.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.54870669.js","_app/immutable/chunks/stores.09656dce.js","_app/immutable/chunks/singletons.c29f7019.js"];
export const stylesheets = [];
export const fonts = [];
