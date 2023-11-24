<script>
  import {
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
    Footer,
  } from "flowbite-svelte";
  import { LinkOutline } from "flowbite-svelte-icons";

  import { toReadableMoney } from "./utils/number";
  import { calculateAge } from "./utils/date";

  import { table, ageKey, getIncomeKey } from "./data/child-support-expanse";

  let today = new Date();
  let todayString = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  let todayMinus19 = `${today.getFullYear() - 19}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  let birthDate, age;
  let birthDateString = todayString;

  let parentIncome = {
    father: localStorage.getItem("father_income") ?? "",
    mother: localStorage.getItem("mother_income") ?? "",
  };
  let parentIncomeTotal = 0;

  $: {
    birthDate = new Date(birthDateString);
    age = calculateAge(birthDate);
  }

  $: {
    localStorage.setItem("father_income", parentIncome.father);
    localStorage.setItem("mother_income", parentIncome.mother);

    parentIncomeTotal =
      Number(parentIncome.father) + Number(parentIncome.mother);
  }

  let tableKey = `${ageKey[age]},${getIncomeKey(parentIncomeTotal)}`;
  let resultIncome = 0;

  $: {
    tableKey = `${ageKey[age]}/${getIncomeKey(parentIncomeTotal)}`;

    try {
      resultIncome = table[tableKey.split("/")[0]][tableKey.split("/")[1]];
    } catch (e) {
      resultIncome = 0;
    }
  }

  let daddy = 0;
  let mommy = 0;

  $: {
    if (resultIncome) {
      daddy =
        parseInt(resultIncome.replaceAll(",", "")) *
        (parseInt(parentIncome.father) /
          (parseInt(parentIncome.father) + parseInt(parentIncome.mother)));
      mommy =
        parseInt(resultIncome.replaceAll(",", "")) *
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
    />
  </div>

  <p>부모 소득 (단위: 만 원)</p>
  <div>
    <ButtonGroup class="w-full mb-3">
      <InputAddon>부</InputAddon>
      <Input
        type="number"
        placeholder="예) 100"
        bind:value={parentIncome.father}
        style="border-radius: 0px !important;"
      />
    </ButtonGroup>
    <ButtonGroup class="w-full">
      <InputAddon>모</InputAddon>
      <Input
        type="number"
        placeholder="예) 100"
        bind:value={parentIncome.mother}
        style="border-radius: 0px !important;"
      />
    </ButtonGroup>
  </div>
</Card>

<Card class="card" style="margin: auto; margin-top: 20px;">
  <p>자녀 양육비</p>

  {#if parentIncome.father && parentIncome.mother}
    <h1>{resultIncome}원</h1>

    <Table class="mt-3 text-center" shadow>
      <TableHead>
        <TableHeadCell>부</TableHeadCell>
        <TableHeadCell>모</TableHeadCell>
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

<Footer class="w-full mt-12 pb-3">
  <GradientButton
    color="cyan"
    href="https://slfamily.scourt.go.kr/dcboard/new/DcNewsViewAction.work?seqnum=9654&gubun=41"
  >
    <LinkOutline class="mr-2" /> 서울가정법원 양육비 산정기준표 안내
  </GradientButton>
</Footer>

<style>
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
</style>
