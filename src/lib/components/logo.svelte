<script lang="ts">
</script>

<button
	class="logo group"
	type="button"
	aria-label="Logo Icon"
>
	<span class="iconspan">
		M
	</span>
	<span class="iconspan">
		o
	</span>
	<span class="iconspan">
		o
	</span>
	<span class="iconspan">
		o²
	</span>
	<span class="iconspan">
		r
	</span>
	<span class="iconspan">
		e
	</span>
</button>

<style scoped lang="postcss">
	.logo {
        @apply smiley;
        @apply text-6xl;
		@apply flex cursor-pointer center-center rounded-md mx-2.5 mt-36;
		@apply font-bold tracking-widest;
		@apply transition-all duration-300 ease-out;
		@apply hover:scale-105 active:scale-95;
		.iconspan {
			@apply rounded-md px-2 py-1.5;
			/* @apply border-l-1 border-white; */
         	@apply transition-all duration-300 ease-out;
		}
	}
</style>
