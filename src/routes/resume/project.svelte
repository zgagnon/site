<script lang="ts">
  export let name: string
  export let title: string
  export let time: string
  export let location: string
  export let bullets: string[]
</script>

<div class="flex flex-col my-4">
    <div class="flex flex-row justify-between border-b-2 items-baseline">
        <h2 class="text-3xl">{name}</h2>
        <h4>{time}</h4>
    </div>

    <div class="flex flex-row justify-between mb-2">
        <h3 class="text-2xl">{title}</h3>
        <h4>{location}</h4>
    </div>
    <ul class="ml-6 w-4/5">
        {#each bullets as bullet}
            <li>{bullet}</li>
        {/each}
    </ul>
</div>
