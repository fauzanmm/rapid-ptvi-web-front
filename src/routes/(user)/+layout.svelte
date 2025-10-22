<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Header from "$lib/components/Header.svelte";

  const { children } = $props();
</script>

<svelte:head>
  <title>RAPID - Engine Detection</title>
</svelte:head>

<!-- Layout wrapper -->
<div
  class="bg-linear-to-br from-gray-900 to-gray-800 flex h-screen overflow-x-auto"
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

<style lang="postcss">
  @reference "tailwindcss";
</style>
