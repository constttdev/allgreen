<script lang="ts">
	import { enhance } from '$app/forms';
	let { data } = $props();
</script>

{#if data.user}
	<p>Welcome, {data.user.username}</p>
{:else}
	<a href="/login">Log in</a>
{/if}

<form action="?/logout" method="POST" use:enhance>
	<button type="submit">Logout</button>
</form>
