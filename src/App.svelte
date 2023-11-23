<script>
  import { GradientButton, ButtonGroup, InputAddon, Input, Card, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';
  import { LinkOutline } from 'flowbite-svelte-icons';

  function _calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  let today = new Date();
  let todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  let birthDateString = todayString;
  let birthDate = new Date();
  let age = _calculateAge(birthDate);

  $: {
    birthDate = new Date(birthDateString);
    age = _calculateAge(birthDate);
  }

  let parentIncome = {
    father: '',
    mother: ''
  }
  let parentIncomeTotal = 0;

  $: {
    parentIncomeTotal = Number(parentIncome.father) + Number(parentIncome.mother);
  }

  let ageKey = {
    "0": "0,1,2",
    "1": "0,1,2",
    "2": "0,1,2",
    "3": "3,4,5",
    "4": "3,4,5",
    "5": "3,4,5",
    "6": "6,7,8",
    "7": "6,7,8",
    "8": "6,7,8",
    "9": "9,10,11",
    "10": "9,10,11",
    "11": "9,10,11",
    "12": "12,13,14",
    "13": "12,13,14",
    "14": "12,13,14",
    "15": "15,16,17,18",
    "16": "15,16,17,18",
    "17": "15,16,17,18",
    "18": "15,16,17,18",
  }
  const getIncomeKey = (incomeTotal) => {
    if (incomeTotal < 200) return "0~199";
    if (incomeTotal < 300) return "200~299";
    if (incomeTotal < 400) return "300~399";
    if (incomeTotal < 500) return "400~499";
    if (incomeTotal < 600) return "500~599";
    if (incomeTotal < 700) return "600~699";
    if (incomeTotal < 800) return "700~799";
    if (incomeTotal < 900) return "800~899";
    if (incomeTotal < 1000) return "900~999";
    if (incomeTotal < 1200) return "1000~1199";
    return "1200";
  } 

  let table = {
    "0,1,2": {
      "0~199": "621,000",
      "200~299": "752,000",
      "300~399": "945,000",
      "400~499": "1,098,000",
      "500~599": "1,245,000",
      "600~699": "1,401,000",
      "700~799": "1,582,000",
      "800~899": "1,789,000",
      "900~999": "1,997,000",
      "1000~1199": "2,095,000",
      "1200": "2,207,000"
    },
    "3,4,5": {
      "0~199": "631,000",
      "200~299": "759,000",
      "300~399": "949,000",
      "400~499": "1,113,000",
      "500~599": "1,266,000",
      "600~699": "1,422,000",
      "700~799": "1,598,000",
      "800~899": "1,807,000",
      "900~999": "2,017,000",
      "1000~1199": "2,116,000",
      "1200": "2,245,000"
    },
    "6,7,8": {
      "0~199": "648,000",
      "200~299": "767,000",
      "300~399": "959,000",
      "400~499": "1,140,000",
      "500~599": "1,292,000",
      "600~699": "1,479,000",
      "700~799": "1,614,000",
      "800~899": "1,850,000",
      "900~999": "2,065,000",
      "1000~1199": "2,137,000",
      "1200": "2,312,000"
    },
    "9,10,11": {
      "0~199": "667,000",
      "200~299": "782,000",
      "300~399": "988,000",
      "400~499": "1,163,000",
      "500~599": "1,318,000",
      "600~699": "1,494,000",
      "700~799": "1,630,000",
      "800~899": "1,887,000",
      "900~999": "2,137,000",
      "1000~1199": "2,180,000",
      "1200": "2,405,000"
    },
    "12,13,14": {
      "0~199": "679,000",
      "200~299": "790,000",
      "300~399": "998,000",
      "400~499": "1,280,000",
      "500~599": "1,423,000",
      "600~699": "1,598,000",
      "700~799": "1,711,000",
      "800~899": "1,984,000",
      "900~999": "2,159,000",
      "1000~1199": "2,223,000",
      "1200": "2,476,000"
    },
    "15,16,17,18": {
      "0~199": "703,000",
      "200~299": "957,000",
      "300~399": "1,227,000",
      "400~499": "1,402,000",
      "500~599": "1,604,000",
      "600~699": "1,794,000",
      "700~799": "1,964,000",
      "800~899": "2,163,000",
      "900~999": "2,246,000",
      "1000~1199": "2,540,000",
      "1200": "2,883,000"
    },
  }

  let tableKey = `${ageKey[age]},${getIncomeKey(parentIncomeTotal)}`
  let resultIncome = 0;

  $: {
    tableKey = `${ageKey[age]}/${getIncomeKey(parentIncomeTotal)}`
    
    try {
      
    resultIncome = table[tableKey.split("/")[0]][tableKey.split("/")[1]]
    } catch (e) {
      resultIncome = 0;
    }
  }

  let daddy = 0;
  let mommy = 0;

  $: {
    if (resultIncome) {
      daddy = parseInt(resultIncome.replaceAll(",", "")) * (parseInt(parentIncome.father) / (parseInt(parentIncome.father) + parseInt(parentIncome.mother)))
      mommy = parseInt(resultIncome.replaceAll(",", "")) * (parseInt(parentIncome.mother) / (parseInt(parentIncome.father) + parseInt(parentIncome.mother)))
    }  
  }
</script>

<main>
  <div>
    <p>양육비 산정기준표</p>
    <h1>자녀 양육비 계산기</h1>

    <Card class="card" style="margin: auto; margin-top: 20px;">
      <div class="mb-7">
        <p>자녀 출생년도</p>
        <input 
          type="date" 
          bind:value={birthDateString} 
          min="1900-01-01" 
          max="2100-12-31" 
          step="1"
        />
      </div>

      <p>부모 소득 (단위: 만 원)</p>
      <div>
        <ButtonGroup class="w-full mb-3">
          <InputAddon>부</InputAddon>
          <Input type="number" placeholder="예) 100" bind:value={parentIncome.father} style="border-radius: 0px !important;" />
        </ButtonGroup>
        <ButtonGroup class="w-full">
          <InputAddon>모</InputAddon>
          <Input type="number" placeholder="예) 100" bind:value={parentIncome.mother} style="border-radius: 0px !important;" />
        </ButtonGroup>
      </div>
    </Card>

    <Card class="card" style="margin: auto; margin-top: 20px;">
      <p>자녀 양육비</p>

      {#if parentIncome.father && parentIncome.mother}
        <h1>{resultIncome} 원</h1>

        <Table class="mt-3">
          <TableHead>
            <TableHeadCell style="text-align: center">부</TableHeadCell>
            <TableHeadCell style="text-align: center">모</TableHeadCell>
          </TableHead>
          <TableBody>
            <TableBodyRow>
              <TableBodyCell>
                <p>{parseInt(daddy).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
              </TableBodyCell>
              <TableBodyCell>
                <p>{parseInt(mommy).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
              </TableBodyCell>
            </TableBodyRow>
          </TableBody>
        </Table>
      {/if}
    </Card>
  </div>
</main>

<Footer class="w-full mt-12 pb-3">
  <GradientButton color="cyan" href="https://slfamily.scourt.go.kr/dcboard/new/DcNewsViewAction.work?seqnum=9654&gubun=41">
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