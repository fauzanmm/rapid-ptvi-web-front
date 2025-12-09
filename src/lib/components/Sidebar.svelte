<script>
  import { slide } from "svelte/transition";
  import { page } from "$app/stores";

  $: currentUrl = $page.url.pathname;

  let isOpen = false;
  let subOpen = false;

  function toggle() {
    isOpen = !isOpen;
    if (!isOpen) {
      subOpen = false;
    }
  }

  function toggleSub() {
    subOpen = !subOpen;
  }

  const routesList = [
    {
      name: "Production",
      path: "/production",
      icon: "fa-regular fa-file text-xl",
      subRoutes: [
        {
          name: "Production Cycle",
          path: "/cycle",
        },
        {
          name: "Status and Time",
          path: "/status",
        },
      ],
    },
    {
      name: "Engine Detection",
      path: "/engine-detection",
      icon: "fa-solid fa-gas-pump text-xl",
      subRoutes: [
        {
          name: "Current Summary",
          path: "/engine-detection/current",
        },
        {
          name: "Month Summary",
          path: "/engine-detection/historical",
        },
      ],
    },
  ];

  function isActive(routeObject) {
    // Memastikan path yang dibandingkan ditambahkan trailing slash
    // kecuali jika path-nya adalah '/' (home)
    const routePath = routeObject.path === "/" ? "/" : routeObject.path;

    // Periksa apakah URL saat ini dimulai dengan path rute
    return currentUrl.startsWith(routePath);
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

  {#each routesList as routeList}
    <div class="flex flex-col justify-start items-start w-full">
      {#if routeList.subRoutes}
        {#if isOpen}
          <button
            on:click={toggleSub}
            class="w-full py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-700 transition duration-200 items-center justify-between"
            class:bg-gray-700={isActive(routeList)}
          >
            <div class="flex flex-row items-center">
              <div class="icon-container">
                <i class={routeList.icon}></i>
              </div>
              <span
                class="whitespace-nowrap overflow-hidden text-ellipsis text-sm ml-4"
              >
                {routeList.name}
              </span>
            </div>
            <i
              class="fa-solid fa-chevron-down text-xs ml-2 transition-transform duration-200"
              class:rotate-180={subOpen}
            ></i>
          </button>
        {:else}
          <a
            href={routeList.path}
            aria-label={routeList.name}
            class="w-full py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-700 transition duration-200 items-center
              {currentUrl.startsWith(
              routeList.path.substring(0, routeList.path.lastIndexOf('/'))
            )
              ? 'bg-gray-700'
              : 'bg-transparent'}"
          >
            <div class="icon-container">
              <i class={routeList.icon}></i>
            </div>
            <span class="ml-4"></span>
          </a>
        {/if}
      {:else}
        <a
          href={routeList.path}
          aria-label={routeList.name}
          class="w-full py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-700 transition duration-200 items-center
                        {currentUrl === routeList.path
            ? 'bg-gray-700'
            : 'bg-transparent'}"
        >
          <div class="icon-container">
            <i class={routeList.icon}></i>
          </div>
          {#if isOpen}
            <span
              class="whitespace-nowrap overflow-hidden text-ellipsis text-sm ml-4"
            >
              {routeList.name}
            </span>
          {:else}
            <span class="ml-4"></span>
          {/if}
        </a>
      {/if}

      {#if routeList.subRoutes && subOpen && isOpen}
        <div class="pl-4 w-full">
          {#each routeList.subRoutes as subRoute}
            <a
              href={subRoute.path}
              on:click={toggleSub}
              class="py-2 px-3 rounded-[10px] flex flex-row hover:bg-gray-600 transition duration-200 items-center
                            {currentUrl === subRoute.path
                ? 'bg-gray-700'
                : 'bg-transparent'}"
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
    /* Lebar saat terbuka */
    width: 300px;
    transition: width 0.3s ease;
  }

  /* Fixed width untuk icon agar tidak bergeser */
  .icon-container {
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  /* Kelas untuk rotasi icon panah (jika tidak menggunakan utility dari Tailwind) */
  .rotate-180 {
    transform: rotate(180deg);
  }
</style>
