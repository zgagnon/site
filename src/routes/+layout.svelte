<script>
import '../app.css';
import banner from '$lib/assets/banner1.jpg';
import { page } from '$app/stores';

let current = '/';
$: current = $page.url;

let dropdownOpen = false;
let dropdownEl;
</script>

<svelte:window on:click={(e) => {
  if (dropdownOpen && dropdownEl && !dropdownEl.contains(e.target)) {
    dropdownOpen = false;
  }
}} />

<div class="fixed w-full z-50">
	<div
		class="w-full h-64 object-cover object-center brightness-75 flex flex-col justify-around pl-6"
		style="background-image: url({banner})"
	>
		<h1 class="text-9xl text-white font-sacramento">Zoe Gagnon</h1>
	</div>
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
</div>
<div class="h-64"></div>
<div class="flex flex-row justify-around pb-12">
	<slot />
</div>
