<script>
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';
	import { Event } from '../utils/event';
</script>

<div>
	<h1>자녀 양육비 계산기</h1>
	<p>v2021-0.0.4</p>

	<br />

	<Card
		href="/cse"
		class="mb-14 mx-auto border-4 rounded-3xl"
		on:click={() => Event('자녀 양육비 계산기')}
	>
		<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			자녀 양육비 계산기
		</h5>
	</Card>

	<Card
		href="/cse-explanation"
		class="mb-14 mx-auto border-4 rounded-3xl"
		on:click={() => Event('양육비 산정기준표 설명')}
	>
		<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			양육비 산정기준표 설명
		</h5>
	</Card>

	<Card
		href="https://mannam.scourt.go.kr/index.do"
		class="mb-14 mx-auto border-4 rounded-3xl"
		padding="none"
		on:click={() => Event('면접교섭센터')}
	>
		<h5 class="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			면접교섭센터
		</h5>

		<Button
			style="background-color: #0BD1B8"
			class="mx-auto w-44 my-3"
			href="https://youtu.be/RiRtjrsgffc?si=I_Xdm9tG3EQ1eVII"
		>
			홍보영상
			<ArrowUpRightFromSquareOutline class="w-3 h-3 ml-2.5" />
		</Button>
	</Card>

	<Card
		href="https://slfamily.scourt.go.kr/main/new/Main.work"
		class="mb-14 mx-auto border-4 rounded-3xl"
		on:click={() => Event('서울가정법원')}
	>
		<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">서울가정법원</h5>
	</Card>
</div>

<style>
	div {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 10;
		padding: 30px;
		background: rgb(2, 0, 36);
		background: linear-gradient(
			0deg,
			rgb(119, 119, 244) 0%,
			rgb(64, 169, 208) 35%,
			rgb(7, 211, 182) 100%
		);
	}
</style>
