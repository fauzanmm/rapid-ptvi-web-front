<script>
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";

  $: currentUrl = $page.url.pathname;

  let isOpen = false;
  let isShow = false;

  function toggle() {
    isOpen = !isOpen;
  }

  function toggleLabel() {
    isShow = !isShow;
  }

  function toggleAll() {
    toggle(), toggleLabel();
  }

  const routesList = [
    {
      name: "Current Shift",
      path: "/fuel-time-loss/current",
      icon: "fa-solid fa-clock text-xl",
    },
    {
      name: "Month Summary",
      path: "/fuel-time-loss/historical",
      icon: "fa-regular fa-folder-open text-xl",
    },
  ];
</script>

<nav class:menu-wide={isOpen} class="menu-normal">
  <!-- Toggle Sidebar -->
  <div class="flex justify-start items-center my-3">
    <button
      on:click={toggleAll}
      aria-label="Toggle Sidebar"
      class="py-2 px-3 rounded-[10px] hover:bg-gray-700 transition duration-200"
    >
      <i class="fa-solid fa-bars text-xl"></i>
    </button>
  </div>

  <!-- Menu List -->
  {#each routesList as routeList}
    <div class="flex justify-start items-center w-full">
      <a
        href={routeList.path}
        class="w-full gap-4 py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-700 transition duration-200 items-center
        {currentUrl === routeList.path ? 'bg-gray-700' : 'bg-transparent '}"
      >
        <i class={routeList.icon}></i>
        {#if isShow}
          <span
            transition:slide={{ axis: "x", duration: 100 }}
            class="whitespace-nowrap overflow-hidden text-ellipsis text-sm"
            >{routeList.name}</span
          >
        {/if}
      </a>
    </div>
  {/each}
</nav>

<style>
  .menu-normal {
    background-color: #1f2937; /* bg-gray-800 */
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1); /* shadow-lg */
    height: 100vh; /* h-screen */
    color: white; /* text-white */
    width: 52px; /* w-13, karena 13 * 4px = 52px */
    padding-left: 4px; /* px-1 => padding: 0 0.25rem */
    padding-right: 4px;
    border-right: 1px solid #374151; /* border-r-gray-700 */
    transition: all 0.3s ease;
  }

  .menu-wide {
    background-color: #1f2937; /* bg-gray-800 */
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1); /* shadow-lg */
    height: 100vh; /* h-screen */
    color: white; /* text-white */
    width: 300px; /* w-13, karena 13 * 4px = 52px */
    padding-left: 4px; /* px-1 => padding: 0 0.25rem */
    padding-right: 4px;
    border-right: 1px solid #374151; /* border-r-gray-700 */
  }
</style>
