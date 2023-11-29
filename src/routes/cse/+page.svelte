<script>
	import {
		Button,
		GradientButton,
		ButtonGroup,
		InputAddon,
		Input,
		Card,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Footer
	} from 'flowbite-svelte';
	import { LinkOutline, HomeSolid } from 'flowbite-svelte-icons';

	import { toReadableMoney, moneyOnlyToThousands } from '../../utils/number';
	import { calculateAge, getMonthDifferenceWithDecimal } from '../../utils/date';
	import { Event } from '../../utils/event';

	import { table, ageKey, getIncomeKey } from '../../data/child-support-expense';

	let today = new Date();
	let todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
	let todayMinus19 = `${today.getFullYear() - 19}-${today.getMonth() + 1}-${today.getDate()}`;

	let birthDate, age;
	let birthDateString = todayString;
	let monthLeftTill18 = 0;

	let parentIncome = {
		father: '',
		mother: ''
	};
	let parentIncomeTotal = 0;

	$: {
		birthDate = new Date(birthDateString);
		age = calculateAge(birthDate);
		monthLeftTill18 = getMonthDifferenceWithDecimal(birthDate, new Date(todayString));
	}

	$: {
		parentIncomeTotal = Number(parentIncome.father) + Number(parentIncome.mother);
	}

	let tableKey = `${ageKey[age]},${getIncomeKey(parentIncomeTotal)}`;
	let resultIncome = 0;

	$: {
		tableKey = `${ageKey[age]}/${getIncomeKey(parentIncomeTotal)}`;

		try {
			resultIncome = table[tableKey.split('/')[0]][tableKey.split('/')[1]];
		} catch (e) {
			resultIncome = 0;
		}
	}

	let daddy = 0;
	let mommy = 0;

	$: {
		if (resultIncome) {
			daddy =
				parseInt(resultIncome.replaceAll(',', '')) *
				(parseInt(parentIncome.father) /
					(parseInt(parentIncome.father) + parseInt(parentIncome.mother)));
			mommy =
				parseInt(resultIncome.replaceAll(',', '')) *
				(parseInt(parentIncome.mother) /
					(parseInt(parentIncome.father) + parseInt(parentIncome.mother)));
		}
	}
</script>

<p>양육비 산정기준표</p>
<h1>자녀 양육비 계산기</h1>

<Card class="card" style="margin: auto; margin-top: 20px;">
	<div class="mb-7">
		<p>자녀 출생년도</p>
		<input
			type="date"
			bind:value={birthDateString}
			min={todayMinus19}
			max={todayString}
			step="1"
			on:change={() => Event('자녀 출생년더 수정')}
		/>
	</div>

	<p>부모 월 소득 (단위: 만 원, <mark>세전</mark>)</p>
	<div>
		<ButtonGroup class="w-full mb-3">
			<InputAddon>부</InputAddon>
			<Input
				type="number"
				placeholder="예) 100"
				bind:value={parentIncome.father}
				style="border-radius: 0px !important;"
				on:change={() => Event('부 소득 수정')}
			/>
		</ButtonGroup>
		<ButtonGroup class="w-full">
			<InputAddon>모</InputAddon>
			<Input
				type="number"
				placeholder="예) 100"
				bind:value={parentIncome.mother}
				style="border-radius: 0px !important;"
				on:change={() => Event('모 소득 수정')}
			/>
		</ButtonGroup>
		<p class="mt-2 text-justify text-sm">
			소득은 세전소득으로 근로소득, 사업소득, 부동산임대소득, 이자수입, 정부보조금, 연금 등을 모두
			합산한 순수입의 총액
		</p>
	</div>
</Card>

<Card class="card" style="margin: auto; margin-top: 20px;">
	<b>자녀 1인당 양육비</b>

	{#if parentIncome.father && parentIncome.mother}
		<h1>{resultIncome}원</h1>

		<Table class="mt-4 text-center">
			<TableHead>
				<TableHeadCell>부 월 부담액</TableHeadCell>
				<TableHeadCell>모 월 부담액</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>
						{toReadableMoney(daddy)}
					</TableBodyCell>
					<TableBodyCell>
						{toReadableMoney(mommy)}
					</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
	{/if}
</Card>

<Card class="card" style="margin: auto; margin-top: 20px;">
	<b>양육비 총 계산표</b>

	<p>양육비 지급 기간: {monthLeftTill18}개월</p>

	{#if parentIncome.father && parentIncome.mother}
		<Table class="text-center">
			<TableHead>
				<TableHeadCell>부 부담액 총액</TableHeadCell>
				<TableHeadCell>모 부담액 총액</TableHeadCell>
			</TableHead>
			<TableBody>
				<TableBodyRow>
					<TableBodyCell>
						{moneyOnlyToThousands(daddy * monthLeftTill18)}
					</TableBodyCell>
					<TableBodyCell>
						{moneyOnlyToThousands(mommy * monthLeftTill18)}
					</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		</Table>
		<p class="text-xs">천 원 미만 버림</p>
	{/if}
</Card>

<Footer class="w-full mt-12 pb-3">
	<GradientButton
		color="cyan"
		href="https://slfamily.scourt.go.kr/dcboard/new/DcNewsViewAction.work?seqnum=9654&gubun=41"
		on:click={() => Event('서울가정법원 양육비 산정기준표 안내')}
	>
		<LinkOutline class="mr-2" /> 서울가정법원 양육비 산정기준표 안내
	</GradientButton>

	<br />

	<Button color="light" href="/" class="mt-2" on:click={() => Event('홈으로 (자녀 양육비 계산기)')}>
		<HomeSolid class="mr-2" />
		홈으로
	</Button>
</Footer>
