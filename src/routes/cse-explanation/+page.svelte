<script>
	import { Button } from 'flowbite-svelte';
	import { HomeSolid } from 'flowbite-svelte-icons';
	import { Event } from '../../utils/event';
</script>

<svelte:head>
	<title>양육비 산정기준표 설명</title>
</svelte:head>

<div
	class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3"
	style="width: 100vw"
>
	<img src="/양육비산정기준표-1.png" alt="양육비산정기준표-1" />
	<img src="/양육비산정기준표-2.png" alt="양육비산정기준표-2" />

	<Button
		color="light"
		href="/"
		class="mt-3 mb-7 w-72"
		on:click={() => Event('홈으로 (양육비 산정기준표 설명)')}
	>
		<HomeSolid class="mr-2" />
		홈으로
	</Button>
</div>
