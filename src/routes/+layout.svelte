<script lang="ts">
	export const prerender = true;
	export const trailingSlash = 'always'; // 强制路径结尾一致性
	// 强制关闭服务器端渲染，让它在客户端作为一个纯粹的单页应用运行
	export const ssr = false;
	// 添加这一行配置，确保资源引用是相对的
	/** @type {import('@sveltejs/kit').NavigationProvider} */
	export const paths = {
		relative: true
	};

	import 'virtual:uno.css';
	import '../app.css';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import { page } from '$app/stores';
  	import Home from './+page.svelte'; // 引入你的首页组件
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="app">
	<!-- <Header /> -->

	<main>
		{#if $page.error}
			<Home />	
		{:else}
			{@render children()} 
		{/if}
	</main>

	<footer>
		<p>
			visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer>
</div>

<!-- <div class="absolute top-4 left-4 font-mono text-sm text-white opacity-50">
	Mooore Extension
	<main class="flex h-screen w-screen items-center justify-center bg-red-500 text-white">
		{@render children()}
		<h1 class="text-4xl">如果看到这行字，说明成功了！</h1>
	</main>
</div> -->

<style scoped lang="postcss">
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #f9fafb;
	}

	main {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		@apply w-full;	
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
