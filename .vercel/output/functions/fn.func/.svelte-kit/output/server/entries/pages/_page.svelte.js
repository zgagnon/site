import { c as create_ssr_component, f as add_attribute } from "../../chunks/ssr.js";
const portrait = "/_app/immutable/assets/portrait.a104af12.jpg";
const scenery = "/_app/immutable/assets/scenery.80f09225.jpg";
const speaking = "/_app/immutable/assets/speaking.b76b8043.png";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "html{background-color:#fafaf9}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="flex flex-row space-x-6" data-svelte-h="svelte-np74nr"><div class="flex-1"></div> <div class="w-[800px] drop-shadow-bg-slate-50 rounded-2xl pt-6 grid grid-cols-2 gap-6"><div class="p-3 bg-slate-50 space-y-6 flex flex-col"><p>I am a seasoned technology leader with a rich and diverse career in software engineering and
				management roles. Most recently, I have been Principal Engineer, responsible for setting the
				technical direction and nurturing crucial vendor relationships at a seed series startup.</p> <p>My professional interests are in the creation of high-performance, generative organizations.
				I take a holistic approach to engineering, and I am passionate about building teams which
				unlock the power of the company. This ranges from guiding implementation decisions, to
				establishing team processes, coaching engineers, and discovering seamless ways of working
				that enhance flow across the company.</p></div> <div class="flex flex-col justify-around"><img${add_attribute("src", portrait, 0)} alt="A headshot featuring Zoe Gagnon" class="rounded w-full block float-right drop-shadow"></div> <div class="flex flex-col justify-around"><img${add_attribute("src", speaking, 0)} alt="Zoe Gagnon speaking at QCon New York" class="rounded w-full block float-right drop-shadow"></div> <div class="p-3 bg-slate-50 space-y-6 flex flex-col"><p>My career spans roles in software engineering and leadership. I have worked in a variety of
				industries, including high impact ones such as healthcare and finance. I have direct
				experience with the challenges of developing a product from the ground up, scaling a
				startup, and guiding mature organizations through transformation.</p> <p>I have a strong grounding in agile fundamentals that apply well to a diversity of
				situations, both technical and organizational. Coupled with my experience growing indidiuals
				and teams, this makes me a leader in technical innovation and improving workflow efficiency.
				 I&#39;ve also been a speaker and organizer of several conferences and meetups.
				In every aspect of my career, I strive to have an impact larger than myself and
				elevate those around me.</p></div> <div class="p-3 bg-slate-50 space-y-6 flex flex-col"><p>Outside of work, I enjoy a variety of hobbies. I am an avid outdoorswoman, enjoying
				multi-day backpacking trips, camping, and exploring the small towns of the Hudson Valley by
				motorcycle.</p> <p>I have a passion for learning, including a love of languages. I have been studying Japanese
				for several years. I also enjoy reading, geology, stationery, and craft.</p></div> <div class="flex flex-col justify-around"><img${add_attribute("src", scenery, 0)} alt="A misty morning scene in the Hudson Valley" class="rounded w-full block float-right drop-shadow"></div></div> <div class="flex-1"></div></div>`;
});
export {
  Page as default
};
