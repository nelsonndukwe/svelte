<script>
	import * as d3 from "d3";
	// Import axes-components.
	import AxisY from './AxisY.svelte';
	import AxisX from './AxisX.svelte';

  // Receive plot data as prop.
  export let data;

  const width = 928;
  const height = 500;
  
	const margin = { 
		top: 10,
		right: 10,
		bottom: 20,
		left: 30	
	};

  // Declare the x (horizontal position) scale.
  $: xScale = d3.scaleUtc()
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([margin.left, width - margin.right]);

	// Declare the y (vertical position) scale.
  $: yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.close)])
      .rangeRound([height - margin.bottom, margin.top]);

  // Declare the line generator.
  const line = d3.line()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.close));
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  style:max-width="100%"
  style:height="auto"
>
	<!-- Add the y-axis -->
	<AxisY {yScale} {width} {margin} />
	
	<!-- Add the x-axis -->
	<AxisX {xScale} {height} {margin} />

	<!-- Add a path for the line. -->
	<g class="data">
			<path 
				fill=none
				stroke="steelblue"
				d={line(data)}/>
	</g>
</svg>