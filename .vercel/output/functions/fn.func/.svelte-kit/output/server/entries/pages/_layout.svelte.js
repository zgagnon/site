import { c as create_ssr_component, b as subscribe, e as escape, d as add_classes, f as add_attribute } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const app = "";
const banner = "/_app/immutable/assets/banner1.56edea91.jpg";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let current = "/";
  let dropdownEl;
  current = $page.url;
  $$unsubscribe_page();
  return ` <div class="fixed w-full z-50"><div class="w-full h-64 object-cover object-center brightness-75 flex flex-col justify-around pl-6" a style="${"background-image: url(" + escape(banner, true) + ")"}" data-svelte-h="svelte-1e8c1o1"><h1 class="text-9xl text-white font-sacramento">Zoe Gagnon</h1></div> <nav class="flex flex-row space-x-2 justify-left items-center ml-2 bg-stone-50"><a href="/"${add_classes((current.pathname === "/" ? "underline" : "").trim())} data-svelte-h="svelte-v9m68a">Home</a> <a href="/resume"${add_classes((current.pathname === "/resume" ? "underline" : "").trim())} data-svelte-h="svelte-gr6f4s">Resume</a> <div class="relative"${add_attribute("this", dropdownEl, 0)}><button class="${["hover:underline", current.pathname.startsWith("/run") ? "underline" : ""].join(" ").trim()}" data-svelte-h="svelte-15obkve">Projects ▾</button> ${``}</div> <a href="mailto:zoe@zgagnon.com" target="_blank" data-svelte-h="svelte-h35nk8">Email</a> <a href="https://github.com/zgagnon" target="_blank" data-svelte-h="svelte-1q4g1ec">GitHub</a> <a href="https://www.linkedin.com/in/zoe-gagnon-91808815//" target="_blank" data-svelte-h="svelte-1uq9b09">LinkedIn</a></nav></div> <div class="h-64"></div> <div class="flex flex-row justify-around pb-12">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
