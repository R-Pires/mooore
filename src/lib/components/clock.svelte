<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let time = $state(new Date());
  let mounted = $state(false);

  // 每秒更新时间
  onMount(() => {
    mounted = true;
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);
    return () => clearInterval(interval);
  });

  const formatTime = (t: Date) => {
    const h = t.getHours().toString().padStart(2, '0');
    const m = t.getMinutes().toString().padStart(2, '0');
    const s = t.getSeconds().toString().padStart(2, '0');
    return { h, m, s };
  };

  const t = $derived(formatTime(time));
</script>

<div class="min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center font-sans overflow-hidden">
  
  {#if mounted}
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
    <div class="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full"></div>

    <main class="relative z-10 flex flex-col items-center" in:fly={{ y: 20, duration: 1000 }}>
      
      <div class="flex items-baseline gap-4 mb-8">
        <span class="text-8xl md:text-9xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          {t.h}:{t.m}
        </span>
        <span class="text-3xl font-mono text-blue-500/80 w-12 tabular-nums">
          {t.s}
        </span>
      </div>

      <div class="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
        <p class="text-gray-400 tracking-widest text-sm uppercase">
          System Ready <span class="animate-pulse text-green-500 inline-block w-2 h-2 rounded-full bg-green-500 ml-2"></span>
        </p>
      </div>

      <div class="mt-12 flex gap-6">
        {#each ['GitHub', 'StackOverflow', 'ChatGPT'] as link}
          <button class="px-4 py-2 text-gray-500 hover:text-white border-b border-transparent hover:border-blue-500 transition-all duration-300">
            {link}
          </button>
        {/each}
      </div>

    </main>
  {/if}

  <footer class="absolute bottom-6 right-6 text-gray-600 font-mono text-xs tracking-tighter">
    v1.0.0-PROD // SVELTEKIT_STABLE
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
    background: #050505;
  }
</style>