<script>
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";
  import data from "../data/sidebar.json";

  let isOpen = false;
  // Gunakan structuredClone untuk memastikan data yang diimpor mutable
  let routesList = structuredClone(data);

  // Menggunakan Svelte Reactivity Label (Classic $:)
  $: currentUrl = $page.url.pathname;

  $: {
    // Dipicu setiap kali currentUrl berubah
    routesList.forEach((route) => {
      if (route.subRoutes) {
        // Tentukan apakah rute induk ini seharusnya terbuka
        const shouldBeOpen = currentUrl.startsWith(route.path);

        if (route.isOpen !== shouldBeOpen) {
          route.isOpen = shouldBeOpen;
        }
      }
    });

    routesList = routesList;
  }

  // 1. Fungsi Toggle Menu List
  function toggle() {
    isOpen = !isOpen;

    // Reset semua sub-menu jika sidebar ditutup
    if (!isOpen) {
      routesList.forEach((route) => {
        if (route.subRoutes) route.isOpen = false;
      });
      // Pemicu reaktivitas
      routesList = routesList;
    }
  }

  // 2. Fungsi Toggle Sub-Menu
  function toggleSub(routeObject) {
    // Toggle status isOpen
    routeObject.isOpen = !routeObject.isOpen;
    // Pemicu reaktivitas manual
    routesList = routesList;
  }

  // 3. Fungsi isActive
  function isActive(routeObject) {
    const routePath = routeObject.path;

    return routeObject.subRoutes
      ? currentUrl.startsWith(routePath)
      : currentUrl === routePath;
  }
</script>

<nav class:menu-wide={isOpen} class="menu-normal">
  <div class="flex justify-start items-center my-3">
    <button
      on:click={toggle}
      aria-label="Toggle Sidebar"
      class="py-2 px-3 rounded-[10px] hover:bg-gray-700 transition duration-200"
    >
      <i class="fa-solid fa-bars text-xl"></i>
    </button>
  </div>

  {#each routesList as route}
    <div class="flex flex-col justify-start items-start w-full">
      {#if route.subRoutes && isOpen}
        <button
          on:click={() => toggleSub(route)}
          class="w-full py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-700 transition duration-200 items-center justify-between"
          class:bg-gray-700={isActive(route)}
        >
          <div class="flex flex-row items-center">
            <div class="icon-container">
              <i class={route.icon}></i>
            </div>
            <span
              class="whitespace-nowrap overflow-hidden text-ellipsis text-sm ml-4"
            >
              {route.name}
            </span>
          </div>
          <i
            class="fa-solid fa-chevron-down text-xs ml-2 transition-transform duration-200"
            class:rotate-180={route.isOpen}
          ></i>
        </button>
      {:else}
        <a
          href={route.path}
          aria-label={route.name}
          class="w-full py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-700 transition duration-200 items-center"
          class:bg-gray-700={isActive(route)}
        >
          <div class="icon-container">
            <i class={route.icon}></i>
          </div>

          {#if isOpen}
            <span
              class="whitespace-nowrap overflow-hidden text-ellipsis text-sm ml-4"
            >
              {route.name}
            </span>
          {:else}
            <span class="ml-4"></span>
          {/if}
        </a>
      {/if}

      {#if route.subRoutes && route.isOpen && isOpen}
        <div class="pl-4 w-full" transition:slide>
          {#each route.subRoutes as subRoute}
            <a
              href={subRoute.path}
              class="py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-600 transition duration-200 items-center"
              class:bg-gray-700={currentUrl === subRoute.path}
            >
              <span class="text-sm">
                {subRoute.name}
              </span>
            </a>
          {/each}
        </div>
      {/if}
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

  .icon-container {
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
