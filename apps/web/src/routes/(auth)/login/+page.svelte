<script>
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/login" use:enhance>
	<div>
		<label for="username">Username</label>
		<input id="username" name="username" type="text" />
	</div>
	<div>
		<label for="password">Password</label>
		<input id="password" name="password" type="password" />
	</div>
	<button type="submit">Login</button>
</form>
