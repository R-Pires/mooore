<script lang="ts">
    import Logo from '$lib/components/logo.svelte';
	import Clock from '$lib/components/clock.svelte';
	import Search from '$lib/components/search.svelte';
    import Temp from '$lib/components/temp.svelte';
</script>

<svelte:head>
	<title>Mooore</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    <Logo />
	<Search />
	<!-- <Clock /> -->
    <Temp />
</section>

<style scoped lang="postcss">
	section {
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		flex: 0.6;
		@apply w-full min-h-screen;	
        @apply bg-gray-100;
	}
</style>
