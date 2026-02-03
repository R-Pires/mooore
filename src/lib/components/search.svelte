<script lang="ts">
	import { focusAction } from '$lib/actions/focus';
	import { autoSizeAction } from '$lib/actions/autoSize';

	import LogoIcon from './logoIcon.svelte';

	// 在 script 标签顶部定义一个转换比例（通常 1rem = 16px）
	const rootFontSize = 16;

	let searchQuery = $state('');
	let inputElement: HTMLTextAreaElement;
	const MAX_HEIGHT = 12.5; // 设置最大高度（单位：rem）

	// 处理搜索跳转
	const handleSearch = (e: KeyboardEvent) => {
		// 1. 如果只按了 Enter (没有按 Ctrl, Shift 或 Alt)
		if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey && !e.altKey) {
			// 阻止默认的换行行为
			e.preventDefault();

			if (searchQuery.trim()) {
				window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
			}
		}

		// 2. 如果按了 Ctrl + Enter
		if (e.key === 'Enter' && e.ctrlKey) {
			// 这里不需要写代码，浏览器会自动执行默认行为（换行）
			// 或者你可以手动添加一个 \n：
			searchQuery += '\n';
		}

		// 在 handleKeydown 里加入
		if (e.key === 'Escape') {
			searchQuery = '';
		}
	};

	// 在 script 中添加这个逻辑, 每一行文字变化时，自动调整高度
	$effect(() => {
		// 依赖 searchQuery，内容变化时触发
		if (searchQuery !== undefined && inputElement) {
			// 1. 先重置高度，以便重新计算 scrollHeight
			inputElement.style.height = 'auto';

			// 2. 获取像素值
			const scrollHeightPx = inputElement.scrollHeight;

			// 3. 转换为 rem
			// 我们增加一个极小的偏移量（比如 0.1rem）防止某些浏览器下的微小溢出抖动
			const newHeight = parseFloat((scrollHeightPx / rootFontSize).toFixed(3));

			if (newHeight > MAX_HEIGHT) {
				// 超过上限：锁定在最大高度，显示滚动条
				inputElement.style.height = MAX_HEIGHT + 'rem';
				inputElement.style.overflowY = 'auto';
			} else {
				// 未超上限：自动撑开，隐藏滚动条
				inputElement.style.height = newHeight + 'rem';
				inputElement.style.overflowY = 'hidden';
			}
		}
	});
</script>

<form w-full m-4 p-2 center-center class="search-form" id="searchForm">
	<div class="search-wrapper">
		<div class="search-input-container">
			<div class="search-icon">
				<!-- <i class="i-ep:microphone"></i> -->
				<!-- <i class="i-ep:microphone"></i> -->
				google
			</div>
			<textarea
				id="searchTextarea"
				class="textarea custom-scrollbar"
				bind:this={inputElement}
				bind:value={searchQuery}
				onkeydown={handleSearch}
				use:focusAction
				rows="1"
				placeholder="在 Google 上搜索，或者输入一个网址"
				autocomplete="off"
				autocorrect="off"
				autocapitalize="off"
				spellcheck="false"
				maxlength="2048"
			></textarea>
			<div class="search-tools">
				<button type="button" class="voice-search" aria-label="Voice search">
					<i class="i-ep:microphone"></i>
				</button>
				<button type="button" class="image-search" aria-label="Image search">
					<i class="i-ep:picture"></i>
				</button>
			</div>
		</div>
		<div class="search-buttons">
			<button type="button" id="luckyBtn" class="lucky-button" aria-label="I'm Feeling Lucky">
				手气不错
			</button>
			<button type="submit" id="searchBtn" class="search-submit" aria-label="Submit search">
				搜索
			</button>
		</div>
	</div>
</form>

<style scoped lang="postcss">
	.search-form {
		min-height: 3rem;
	}

	.search-wrapper {
		@apply flex-col w-full max-w-4xl center-center;
		gap: 0.5rem;
	}

	.search-input-container {
		@apply flex w-full max-w-4xl items-center rounded-3xl border-3 border-gray-300 bg-white p4 m8;
		@apply shadow-xs;
		@apply dark:border-gray-600 dark:bg-gray-700;
	}

	.search-icon {
		@apply me-3 shrink-0 text-gray-800 center-center;
	}

	/* 关键的 textarea 样式 */
	.textarea {
		@apply flex w-full pt-1 px-4 bg-transparent;
		@apply bg-white dark:bg-gray-700;
		font-size: 1rem;
		font-family: arial, sans-serif;
		line-height: 1.5;
		overflow: hidden;
		min-height: 2rem;
		max-height: 12rem;
		border: none;
		outline: none;
		resize: none; // 去除右下角的拖拽点, resize 会影响高度计算, 要放在 field-sizing 之前
		field-sizing: content; // 使 padding 不影响宽高计算, 动态调整高度时很重要
		leading-relaxed: true; // 增加行间距, 提高可读性
	}

	.textarea::placeholder {
		color: #9aa0a6;
	}

	.search-tools {
		@apply ms-3 shrink-0 text-gray-800 center-center;
		.voice-search, .image-search {
			@apply center-center pl2;
			@apply aspect-square;
			/* @apply grid place-content-center; */
		}
	}

	.search-buttons {
		@apply flex gap-3 w-full max-w-2xl mx-32 px-32;
		.lucky-button, .search-submit {
			@apply mx-8 px-8 py-2.5 rounded-lg text-sm flex-1 border-2 border-gray-100 center-center cursor-pointer;
			@apply whitespace-nowrap; // 防止按钮文本换行, 保持按钮宽度一致; 使用 truncate, 文字超出部分变 ...
			@apply bg-gray-100 text-gray-800;
			@apply hover:border-gray-200 transition-colors duration-300;
			/* @apply dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600; */
		}
	}
</style>
