

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/resume/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.cd5027d9.js","_app/immutable/chunks/scheduler.e108d1fd.js","_app/immutable/chunks/index.54870669.js","_app/immutable/chunks/each.e59479a4.js"];
export const stylesheets = [];
export const fonts = [];
