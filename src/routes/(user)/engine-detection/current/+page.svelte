<script>
  import { onMount } from "svelte";
  import prettyMilliseconds from "pretty-ms";
  import moment from "moment";
  import {
    currentFuelTimeLoss,
    shiftFuelTimeLoss,
    shiftSummaryFuelTimeLoss,
    shiftTableFuelTimeLoss,
  } from "$lib/api/fuel-time-loss";

  const optionsDepartment = [
    { param: "hatari", value: "hatari", label: "HATARI" },
    { param: "bintang", value: "bintang", label: "BINTANG" },
    { param: "coal", value: "coal", label: "COAL" },
    {
      param: "mine%20services",
      value: "mine services",
      label: "MINE SERVICES",
    },
    { param: "thiess", value: "thiess", label: "THIESS" },
    { param: "pama", value: "pama", label: "PAMA" },
    { param: "other", value: "other", label: "OTHER" },
    { param: "jupiter", value: "jupiter", label: "JUPITER" },
    { param: "msd", value: "msd", label: "MSD" },
    { param: "cphd", value: "cphd", label: "CPHD" },
    { param: "geology", value: "geology", label: "GEOLOGY" },
    { param: "mo", value: "mo", label: "MO" },
    {
      param: "drill%20%26%20blast",
      value: "drill & blast",
      label: "DRILL & BLAST",
    },
  ];

  moment.locale("id");

  let data = [];
  let shiftSummary = [];
  let shiftTable = [];
  let shiftTableInfo = [];
  let crewText = "";
  let department = "hatari";
  let intervalId;

  let page = 1;
  let limit = 50;
  let firstPage = 1;
  let lastPage = limit;

  async function handleNextPage() {
    page += 1;
    if (page > shiftTable.totalPage) {
      page = shiftTable.totalPage;
      return;
    }
    shiftTable = [];
    return await fetchShiftTable();
  }

  async function handlePreviousPage() {
    page -= 1;
    if (page < 1) {
      page = 1;
      return;
    }
    shiftTable = [];
    return await fetchShiftTable();
  }

  async function handleFirstPage() {
    page = 1;
    shiftTable = [];
    return await fetchShiftTable();
  }

  async function handleLastPage() {
    page = shiftTable.totalPage;
    shiftTable = [];
    return await fetchShiftTable();
  }

  async function handleDataPage() {
    firstPage = (page - 1) * limit + 1;
    lastPage = firstPage - 1 + limit;
  }
  // let date = moment(shiftTable.date).format("DD MMMM YYYY");
  // let currentShift = shiftTable.shift;
  // let lastUpdated = moment(shiftTable.date).format("HH:mm:ss");
  // let crew = shiftTable.crews.map((c) => c.Crew).join(", ");

  async function fetchCurrent() {
    const result = await currentFuelTimeLoss(department);
    return (data = result.data);
  }

  async function fetchShiftSummary() {
    const result = await shiftSummaryFuelTimeLoss(department);
    const lossFuel = result.data.lossFuel.toFixed(2);
    const lossHour = prettyMilliseconds(result.data.lossHour * 1000, {
      colonNotation: true,
    });
    shiftSummary = {
      lossFuel: lossFuel || "0.00",
      lossHour: lossHour || "00:00",
    };
    return shiftSummary;
  }

  async function fetchShiftTable() {
    const queryParams = {
      page,
      limit,
    };
    const result = await shiftTableFuelTimeLoss(department, queryParams);
    return (shiftTable = result.data);
  }

  onMount(async () => {
    await fetchShiftSummary();
    await fetchShiftTable();
    await fetchCurrent();

    intervalId = setInterval(async () => {
      data = await fetchCurrent();
      shiftSummary = await fetchShiftSummary();
      shiftTable = await fetchShiftTable();
      // console.log(data);
      // console.log(shiftSummary);
      // console.log(shiftTable);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  });

  $: if (department) {
    fetchCurrent(department);
    page = 1;
    firstPage = 1;
    data = [];
    shiftSummary = [];
    shiftTable = [];
  }
  $: if (shiftTable.crews) {
    crewText = shiftTable.crews.map((c) => c.Crew).join(", ");
  }
</script>

<main class="w-full my-6 px-20 overflow-x-auto flex-1 overflow-y-auto">
  <div class="flex justify-between">
    <div class="flex flex-col pb-8">
      <h1 class="text-3xl text-gray-300 font-bold">Engine Detection</h1>
      <h2 class="text-lg text-gray-300">Summary Current & Shift Report</h2>
    </div>

    <!-- Filter Department -->
    <div class="mx-4 flex flex-row items-start">
      <form>
        <label
          for="department"
          class="block text-sm font-medium text-white mb-2">Department</label
        >
        <select
          id="department"
          class="p-2 w-48 rounded-md bg-gray-800 text-white border border-gray-600"
          bind:value={department}
        >
          {#each optionsDepartment as optionDepartment}
            <option value={optionDepartment.param}
              >{optionDepartment.label}</option
            >
          {/each}
        </select>
      </form>
    </div>
  </div>

  <div class="flex flex-row gap-4">
    <!-- Container Summary Card & List Card -->
    <div class="flex flex-col">
      <!-- Card Summarize -->
      <div class="flex pb-4 gap-4 justify-start w-[200px]">
        <!-- Card 1 : Loss Hour -->
        <div
          class="bg-gray-800 bg-opacity-80 rounded-xl shadow-lg border border-gray-700 overflow-hidden card-hover animate-fade-in min-w-[200px] min-h-[150px] flex flex-col pt-4 px-4 pb-3"
        >
          <!-- Title Card -->
          <div class="flex items-center justify-center gap-3">
            <i
              class="fa-solid fa-clock text-[20px] text-gray-300 hover:text-blue-300"
            ></i>
            <h2
              class="text-lg text-white hover:text-blue-300 transition-colors duration-200"
            >
              Loss Hour
            </h2>
          </div>

          <!-- Value Card -->
          <div class="flex-1 flex items-center justify-center">
            <div
              class="text-4xl font-bold text-white text-center hover:text-blue-300"
            >
              {shiftSummary.lossHour || "--"}
            </div>
          </div>
        </div>

        <!-- Card 2 : Loss Fuel -->
        <div
          class="bg-gray-800 bg-opacity-80 rounded-xl shadow-lg border border-gray-700 overflow-hidden card-hover animate-fade-in min-w-[200px] min-h-[150px] flex flex-col pt-4 px-4 pb-3"
        >
          <!-- Judul lebih nyaman jaraknya -->
          <div class="flex items-center justify-center gap-3">
            <i
              class="fa-solid fa-gas-pump text-[20px] text-gray-300 hover:text-blue-300"
            ></i>
            <h2
              class="text-lg text-white hover:text-blue-300 transition-colors duration-200"
            >
              Loss Fuel <span class="text-gray-400 text-sm">(Liter)</span>
            </h2>
          </div>

          <!-- Value tetap center -->
          <div class="flex-1 flex items-center justify-center">
            <div
              class="text-4xl font-bold text-white text-center hover:text-blue-300"
            >
              {shiftSummary.lossFuel || "--"}
            </div>
          </div>
        </div>
      </div>

      <!-- Card List Truck -->
      <div
        class="w-[420px] h-[560px] overflow-y-auto bg-gray-800 bg-opacity-80 rounded-xl shadow-lg border border-gray-700 animate-fade-in"
      >
        <div class="grid grid-cols-2 gap-4">
          <div class="w-[415px] h-auto overflow-y-auto rounded-lg">
            <div class="grid grid-cols-2 gap-4 m-4">
              <!-- Card 1 -->
              {#each data as truck}
                <div
                  class="bg-[#FF0000] bg-opacity-35 rounded-xl px-2 h-[145px] card-hover"
                >
                  <div class="flex justify-between pt-2">
                    <p
                      class="text-white text-xs hover:text-gray-300 transition-colors duration-200"
                    >
                      {truck.FuelRate ? truck.FuelRate.toFixed(2) : "-"}
                      <span>L/hr</span>
                    </p>
                    <p
                      class="text-white text-xs hover:text-gray-300 transition-colors duration-200"
                    >
                      {truck.RPM ? truck.RPM.toFixed(0) : "-"} <span>Rpm</span>
                    </p>
                  </div>
                  <div class="flex flex-col items-center pt-1">
                    <p class="text-xl font-bold text-white hover:text-gray-300">
                      {truck.Equipment}
                    </p>
                  </div>
                  <div class="flex flex-col items-center">
                    <p class="text-xs text-gray-400">{truck.Location}</p>
                  </div>
                  <div class="flex flex-col items-center">
                    <p class="text-xs text-gray-400">
                      {#if truck.OperatorName}
                        {truck.OperatorName}
                      {:else}
                        NO OPERATOR
                      {/if}
                    </p>
                  </div>
                  <div class="flex flex-col items-center">
                    <p class="text-xs text-gray-400">
                      {truck.Status}
                    </p>
                  </div>
                  <div class="flex flex-col items-center">
                    <p class="text-xs text-gray-400 truncate max-w-[160px]">
                      {truck.Reason}
                    </p>
                  </div>
                  <div class="flex flex-col items-center">
                    <p class="text-xs text-gray-400">
                      {#if truck.TimeFuelRate}
                        {new Date(truck.TimeRPM)
                          .toISOString()
                          .replace("T", " ")
                          .replace("Z", "")}
                      {:else}
                        -
                      {/if}
                    </p>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Container Table List -->
    <div class="w-full min-w-[800px] mx-4 animate-fade-in">
      <!-- Container information -->
      <div class="flex flex-row justify-between mx-4 mb-2">
        <ul class="flex flex-row gap-10">
          <li>
            <p class="text-gray-300">
              Date : <span
                >{shiftTable.date
                  ? moment.utc(shiftTable.date).format("dddd, DD MMMM yyyy")
                  : "-"}</span
              >
            </p>
          </li>
          <li>
            <p class="text-gray-300">
              Crew : <span>{crewText ? crewText : "-"}</span>
            </p>
          </li>
          <li>
            <p class="text-gray-300">
              Shift : <span
                >{shiftTable.shiftName ? shiftTable.shiftName : "-"}</span
              >
            </p>
          </li>
        </ul>
        <p class="text-gray-300">
          Last updated : <span
            >{shiftTable.date
              ? moment.utc(shiftTable.date).format("hh:mm:ss A")
              : "-"}</span
          >
        </p>
      </div>

      <!-- Table List -->
      <div
        class="relative overflow-x-auto rounded-[15px] h-[695px] shadow-lg border border-gray-700"
      >
        <table class="w-full text-sm text-left rtl:text-right text-gray-300">
          <thead
            class="sticky top-0 z-10 text-base bg-gray-50 bg-gray-700 text-gray-200 text-center"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Truck</th>
              <th scope="col" class="px-6 py-3">Location</th>
              <th scope="col" class="px-6 py-3">Operator</th>
              <th scope="col" class="px-6 py-3">Reason</th>
              <th scope="col" class="px-6 py-3">FBR</th>
              <th scope="col" class="px-6 py-3">RPM</th>
              <th scope="col" class="px-6 py-3">Fuel Loss</th>
              <th scope="col" class="px-6 py-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {#each shiftTable.data as truck}
              <tr class="border-b bg-gray-800 border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowrap text-white text-center"
                >
                  {truck.Equipment}
                </th>
                <td class="px-6 py-4 text-center">{truck.Location}</td>
                <td class="px-6 py-4 text-center">{truck.OperatorName}</td>
                <td class="px-6 py-4 text-center">{truck.Reason}</td>
                <td class="px-6 py-4 text-center"
                  >{truck.FuelRate ? truck.FuelRate.toFixed(2) : "-"}</td
                >
                <td class="px-6 py-4 text-center"
                  >{truck.RPM ? truck.RPM.toFixed(2) : "-"}</td
                >
                <td class="px-6 py-4 text-center"
                  >{truck.FuelLoss ? truck.FuelLoss.toFixed(2) : "-"}</td
                >
                <td class="px-6 py-4 text-center"
                  >{#if truck.TimeFuelRate}
                    {new Date(truck.TimeRPM)
                      .toISOString()
                      .replace("T", " ")
                      .replace("Z", "")}
                  {:else}
                    -
                  {/if}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>

        {#if shiftTable.totalData >= limit}
          <!-- Sticky Pagination Footer -->
          <div
            class="sticky bottom-0 bg-gray-800 border-t border-gray-700 z-20 flex items-center justify-between px-8 py-2 text-sm text-gray-200"
          >
            <!-- Bagian kiri: info data -->
            <div>
              <p>
                <span>{firstPage}</span> -
                {#if lastPage > shiftTable.totalData}
                  <span>
                    {shiftTable.totalData}
                  </span>
                {:else}
                  {lastPage}
                {/if}
                <span class="font-semibold">of</span>
                <span class="font-semibold">{shiftTable.totalData}</span>
              </p>
            </div>

            <!-- Bagian kanan: tombol navigasi -->
            <div class="flex items-center gap-2">
              <button
                disabled={page === 1}
                class={`px-3 py-1 rounded ${page === 1 ? "bg-gray-900" : "bg-gray-700 hover:bg-gray-600"}`}
                onclick={() => {
                  handleFirstPage();
                  handleDataPage();
                }}>First</button
              >
              <button
                disabled={page === 1}
                class={`px-3 py-1 rounded ${page === 1 ? "bg-gray-900" : "bg-gray-700 hover:bg-gray-600"}`}
                onclick={() => {
                  handlePreviousPage();
                  handleDataPage();
                }}>Prev</button
              >
              <span>Page {page} of {shiftTable.totalPage}</span>
              <button
                disabled={page === shiftTable.totalPage}
                class={`px-3 py-1 rounded ${page === shiftTable.totalPage ? "bg-gray-900" : "bg-gray-700 hover:bg-gray-600"}`}
                onclick={() => {
                  handleNextPage();
                  handleDataPage();
                }}>Next</button
              >
              <button
                disabled={page === shiftTable.totalPage}
                class={`px-3 py-1 rounded ${page === shiftTable.totalPage ? "bg-gray-900" : "bg-gray-700 hover:bg-gray-600"}`}
                onclick={() => {
                  handleLastPage();
                  handleDataPage();
                }}>Last</button
              >
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>
