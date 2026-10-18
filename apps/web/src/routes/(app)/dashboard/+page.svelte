<script lang="ts">
	let { data } = $props();
</script>

{#if data.user}
	<p>Welcome, {data.user.username}</p>
{:else}
	<a href="/login">Log in</a>
{/if}
