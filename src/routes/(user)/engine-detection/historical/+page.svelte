<script>
  import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
  const port = 3000;
  const server = "10.138.216.18" || "localhost";
  const socket = io(`http://${server}:${port}`);

  socket.on("connection", () => {
    console.log("user id :" + socket.id);
  });
</script>

<main class="w-full my-6 px-20 overflow-x-auto flex-1 overflow-y-auto">
  <!-- <div class="flex justify-between">
    <div class="flex flex-col pb-8">
      <h1 class="text-3xl text-gray-300 font-bold">Fuel Time Loss</h1>
      <h2 class="text-lg text-gray-300">Summary Monthly Report</h2>
    </div>
  </div> -->

  <!-- <div class="flex gap-4"> -->
  <!-- Container Chart 1 -->
  <!-- <div class="min-w-[800px] min-h-[400px] border-2"></div> -->

  <!-- Container Chart 1 -->
  <!-- <div class="min-w-[800px] min-h-[400px] border-2"></div> -->

  <!-- Container Chart 1 -->
  <!-- <div class="min-w-[800px] min-h-[400px] border-2"></div> -->

  <!-- Container Chart 1 -->
  <!-- <div class="min-w-[800px] min-h-[400px] border-2"></div> -->
  <!-- </div> -->
</main>
