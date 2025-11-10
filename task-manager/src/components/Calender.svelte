<script lang="ts">
	import { Calendar } from 'bits-ui';

	import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
	import { MoveLeft, MoveRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let { currentDate, setValue }: { currentDate?: Date; setValue: (value: DateValue) => void } =
		$props();
	let value = $state(today(getLocalTimeZone()));

	const getyear = currentDate instanceof Date

	console.log(`dueDate`, {getyear,currentDate});	$effect(() => {
        if (!currentDate) return;

// 🧠 Convert ISO string → native Date
const parsed = new Date(currentDate);

if (isNaN(parsed.getTime())) {
    console.warn('Invalid date string passed to Calendar:', currentDate);
    return;
}

const newValue = new CalendarDate(
    parsed.getFullYear(),
    parsed.getMonth() + 1, 
    parsed.getDate()     
);

value = newValue

	});
</script>

<Calendar.Root
	class="border-dark-10 bg-background-alt shadow-card mt-2 rounded-[15px] border p-[10px]"
	weekdayFormat="short"
	fixedWeeks={true}
	type="single"
	bind:value
	onValueChange={(date) => date && setValue(date)}
>
	{#snippet children({ months, weekdays })}
		<Calendar.Header class="flex items-center justify-between">
			<Calendar.PrevButton
				class="rounded-9px dark:text-white bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center active:scale-[0.98] active:transition-all"
			>
				<MoveLeft class="size-6 dark:text-white" />
			</Calendar.PrevButton>
			<Calendar.Heading class="text-[15px] dark:text-white font-medium" />
			<Calendar.NextButton
				class="rounded-9px dark:text-white bg-background-alt hover:bg-muted inline-flex size-10 items-center justify-center active:scale-[0.98] active:transition-all"
			>
				<MoveRight class="size-6 dark:text-white" />
			</Calendar.NextButton>
		</Calendar.Header>
		<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0">
			{#each months as month, i (i)}
				<Calendar.Grid class="w-full border-collapse select-none space-y-1">
					<Calendar.GridHead>
						<Calendar.GridRow class="mb-1 flex w-full justify-between">
							{#each weekdays as day, i (i)}
								<Calendar.HeadCell
									class="text-muted-foreground font-normal! w-10 rounded-md text-xs"
								>
									<div>{day.slice(0, 2)}</div>
								</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
					</Calendar.GridHead>
					<Calendar.GridBody>
						{#each month.weeks as weekDates, i (i)}
							<Calendar.GridRow class="flex w-full">
								{#each weekDates as date, i (i)}
									<Calendar.Cell
										{date}
										month={month.value}
										class="p-0! relative size-10 text-center text-sm"
									>
										<Calendar.Day
											class="rounded-9px text-foreground hover:border-foreground data-selected:bg-foreground data-disabled:text-foreground/30 data-selected:text-background data-unavailable:text-muted-foreground data-disabled:pointer-events-none data-outside-month:pointer-events-none data-selected:font-medium data-unavailable:line-through group relative inline-flex size-10 items-center justify-center whitespace-nowrap border border-transparent bg-transparent p-0 text-sm font-normal"
										>
											<div
												class="bg-foreground group-data-selected:bg-background group-data-today:block absolute top-[5px] hidden size-1 rounded-full"
											></div>
											{date.day}
										</Calendar.Day>
									</Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		</div>
	{/snippet}
</Calendar.Root>
