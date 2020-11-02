const LoginForm = () => {
	return (
		<form method="POST" action="/api/login">
			<h1>Login</h1>
			<table>
				<tr>
					<td>
						<label htmlFor="username">User name</label>
					</td>
					<td>
						<input name="username" required />
					</td>
				</tr>
				<tr>
					<td>
						<label htmlFor="password">Password</label>
					</td>
					<td>
						<input name="password" type="password" required />
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<button type="submit">Login</button>
					</td>
				</tr>
			</table>
		</form>
	);
};

export default LoginForm;
