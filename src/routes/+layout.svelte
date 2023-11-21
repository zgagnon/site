<script>
import '../app.css';
import banner from '$lib/assets/banner1.jpg';
import { page } from '$app/stores';

let current = '/';
$: current = $page.url;
</script>

<div class="fixed w-full z-50">
	<div
		class="w-full h-64 object-cover object-center brightness-75 flex flex-col justify-around pl-6"
		a
		style="background-image: url({banner})"
	>
		<h1 class="text-9xl text-white font-sacramento">Zoe Gagnon</h1>
	</div>
	<nav class="flex flex-row space-x-2 justify-left items-center ml-2 bg-stone-50">
		<a href="/" class:underline="{current.pathname === '/'}">Home</a>
		<a href="/resume" class:underline="{current.pathname === '/resume'}"> Resume </a>
		<a href="mailto:zoe@zgagnon.com" target="_blank"> Email </a>
		<a href="https://github.com/zgagnon" target="_blank"> GitHub </a>
		<a href="https://www.linkedin.com/in/zoe-gagnon-91808815//" target="_blank"> LinkedIn </a>
	</nav>
</div>
<div class="h-64"></div>
<div class="flex flex-row justify-around">
	<slot />
</div>
