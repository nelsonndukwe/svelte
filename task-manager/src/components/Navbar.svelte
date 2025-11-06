<script lang="ts">
    import { Menubar } from "bits-ui";
	import { Cat, Check, MoveRight } from "lucide-svelte";
  
   
    let selectedView = $state("table");
    let selectedProfile = $state("pavel");
   
    let grids = $state([
      {
        checked: true,
        label: "Pixel"
      },
      {
        checked: false,
        label: "Layout"
      }
    ]);
   
    let showConfigs = $state([
      {
        checked: true,
        label: "Show Bookmarks"
      },
      {
        checked: false,
        label: "Show Full URLs"
      }
    ]);
   
    const profiles = [
      {
        value: "hunter",
        label: "Hunter"
      },
      {
        value: "pavel",
        label: "Pavel"
      },
      {
        value: "adrian",
        label: "Adrian"
      }
    ];
   
    const views = [
      {
        value: "table",
        label: "Table"
      },
      {
        value: "board",
        label: "Board"
      },
      {
        value: "gallery",
        label: "Gallery"
      }
    ];
  </script>
   
<div class="">
    <h1>Dashboard</h1>
</div>