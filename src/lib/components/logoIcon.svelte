<script lang="ts">
	import { getContrastColor } from "$lib/utils/fontColor";
	// 你可以根据需要通过 props 传入文字
	export let prefix = 'prefix';
	export let prefbg = 'bg-[#e4027d]';
	export let suffix = 'suffix';
	export let suffbg = 'bg-[#2f80ed]';
</script>

<button
	style="
  		--prefix-background-color: {prefbg.slice(4, -1)};
		--suffix-background-color: {suffbg.slice(4, -1)};
  	"
	class="iconbutton group {prefbg}"
	type="button"
	aria-label="Logo Icon"
>
	<span class="iconspan {getContrastColor(prefbg.slice(4, -1))} {prefbg} group-hover:shadow-[0_0_15px_var(--prefix-background-color)]">
		{prefix}
	</span>
	<span class="iconspan {getContrastColor(suffbg.slice(4, -1))} {suffbg} group-hover:shadow-[0_0_15px_var(--suffix-background-color)]">
		{suffix}
	</span>
</button>

<style scoped lang="postcss">
	.iconbutton {
		@apply flex cursor-pointer center-center rounded-md mx-2.5;
		@apply smiley font-bold text-4xl tracking-widest;
		@apply transition-all duration-300 ease-out;
		@apply hover:scale-105 active:scale-95;
		.iconspan {
			@apply rounded-md pl-3.5 pr-2 py-1.5;
			/* @apply border-l-1 border-white; */
         	@apply transition-all duration-300 ease-out;
		}
	}
</style>
