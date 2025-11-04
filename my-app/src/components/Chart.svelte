<script>
	import { Chart, Axis, Layer, Rule, Tooltip, Points, Highlight, LinearGradient, Area } from 'layerchart';

	import { sort } from '@layerstack/utils';
	import { graph } from '$lib/data';
</script>

<div class="h-[300px] p-4 border rounded-lg shadow-accent">
	<Chart
	  data={graph}
	  x="month"
	  y="activeUsers"
	  yDomain={[0, null]}
	  yNice
	  padding={{ left: 8, bottom: 12 }}
	>
	  <Layer type={"svg"}>
		<Axis placement="left" grid rule />
		<Axis placement="bottom" rule />
		<LinearGradient class="from-sky-100 via-sky-200 to-blue-200" vertical>
		  {#snippet children({ gradient })}
			<Area line={{ class: "stroke-2 stroke-primary" }} fill={gradient} />
		  {/snippet}
		</LinearGradient>
	  </Layer>
	</Chart>
  </div>