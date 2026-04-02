

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.3b1f7a19.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.54870669.js"];
export const stylesheets = ["_app/immutable/assets/2.ec39b07b.css"];
export const fonts = [];
