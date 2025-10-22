<script>
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";

  $: currentUrl = $page.url.pathname;

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
  }

  const routesList = [
    {
      name: "Current Shift",
      path: "/engine-detection/current",
      icon: "fa-solid fa-clock text-xl",
    },
    {
      name: "Month Summary",
      path: "/engine-detection/historical",
      icon: "fa-regular fa-folder-open text-xl",
    },
  ];
</script>

<nav class:menu-wide={isOpen} class="menu-normal">
  <!-- Toggle Sidebar -->
  <div class="flex justify-start items-center my-3">
    <button
      on:click={toggle}
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
        class="w-full py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-700 transition duration-200 items-center
        {currentUrl === routeList.path ? 'bg-gray-700' : 'bg-transparent'}"
      >
        <!-- Fixed width icon container -->
        <div class="icon-container">
          <i class={routeList.icon}></i>
        </div>

        {#if isOpen}
          <span
            transition:slide={{ axis: "x", duration: 300 }}
            class="whitespace-nowrap overflow-hidden text-ellipsis text-sm ml-4"
          >
            {routeList.name}
          </span>
        {/if}
      </a>
    </div>
  {/each}
</nav>

<style>
  .menu-normal {
    background-color: #1f2937;
    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
    height: 100vh;
    color: white;
    width: 58px;
    padding-left: 4px;
    padding-right: 4px;
    border-right: 1px solid #374151;
    transition: width 0.3s ease;
  }

  .menu-wide {
    width: 300px;
    transition: width 0.3s ease;
  }

  /* Fixed width untuk icon agar tidak bergeser */
  .icon-container {
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0; /* Prevent shrinking */
  }
</style>
