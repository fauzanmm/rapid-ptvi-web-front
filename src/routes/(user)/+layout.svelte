<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Header from "$lib/components/Header.svelte";

  const { children } = $props();
</script>

<svelte:head>
  <title>RAPID - Fuel Time Loss</title>
</svelte:head>

<!-- Layout wrapper -->
<div
  class="bg-gradient-to-br from-gray-900 to-gray-800 flex h-screen overflow-x-auto"
>
  <!-- Sidebar -->
  <Sidebar />

  <!-- Konten utama (Header + Page) -->
  <div class="flex flex-col flex-1 full-h-screen">
    <Header />
    <main class="flex-1 overflow-y-auto">
      {@render children()}
    </main>
  </div>
</div>
