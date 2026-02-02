<script lang="ts">
  import { fade } from 'svelte/transition';

  let searchQuery = $state('');
  let isFocused = $state(false);
  let inputElement: HTMLInputElement;

  // 处理搜索跳转
  const handleSearch = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // 快捷键监听：按下 '/' 键自动聚焦搜索框
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === '/' && document.activeElement !== inputElement) {
      e.preventDefault();
      inputElement.focus();
    }
  };
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="w-full max-w-2xl px-6 mt-12">
  <div 
    class="relative transition-all duration-500 group"
    class:scale-105={isFocused}
  >
    <div class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors">
      <div class="i-lucide-search text-xl"></div>
    </div>

    <input
      bind:this={inputElement}
      bind:value={searchQuery}
      onkeydown={handleSearch}
      onfocus={() => isFocused = true}
      onblur={() => isFocused = false}
      type="text"
      placeholder="Search Google or press '/' to focus..."
      class="w-full py-4 pl-14 pr-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl
             text-white placeholder:text-gray-500 outline-none
             shadow-[0_0_30px_rgba(0,0,0,0.3)]
             focus:border-blue-500/50 focus:bg-white/15 focus:ring-4 focus:ring-blue-500/10
             transition-all duration-300"
    />

    {#if searchQuery}
      <div 
        class="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/10 rounded text-[10px] text-gray-400 font-mono tracking-tighter"
        transition:fade
      >
        ENTER ↵
      </div>
    {/if}
  </div>

  <div class="flex justify-center gap-4 mt-6">
    {#each ['Images', 'News', 'Maps'] as label}
      <button 
        class="text-xs text-gray-500 hover:text-white transition-colors"
        onclick={() => window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=${label === 'Images' ? 'isch' : label === 'News' ? 'nws' : ''}`}
      >
        {label}
      </button>
    {/each}
  </div>
</div>