<script>
  import { isLoading } from "$lib/stores/loading";
  import { beforeNavigate, afterNavigate } from "$app/navigation";

  beforeNavigate(() => {
    isLoading.set(true);
  });

  afterNavigate(() => {
    isLoading.set(false);
  });
</script>

{#if $isLoading}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="loader w-12 h-12 rounded-full"></div>
  </div>
{/if}

<slot />

<style>
  .loader {
    width: 50px;
    padding: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #6699ff;
    --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: l3 1s infinite linear;
  }
  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
</style>
