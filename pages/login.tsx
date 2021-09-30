import { ChangeEvent, useState } from "react";
import axios from "axios";
import { CookieKeys } from "../utils/Constants";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleOnUsernameChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};

	const handleOnPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleSubmit = async () => {
		// Call login API with username & password.
		const {
			data: { result: authenticationId, message }
		} = await axios.post("/api/login", {
			username,
			password
		});
		if (authenticationId) {
			document.cookie = `${CookieKeys.AUTHENTICATION_ID}=${authenticationId}`;
			document.cookie = `${CookieKeys.USERNAME}=${username}`;
			window.location.href = "/home";
		} else {
			setError(message);
		}
	};

	return (
		<>
			<h1>Login</h1>
			<table>
				<tbody>
					<tr>
						<td></td>
						<td style={{ color: "red" }}>{error}</td>
					</tr>
					<tr>
						<td>
							<label htmlFor="username">User name</label>
						</td>
						<td>
							<input name="username" value={username} onChange={handleOnUsernameChanged} />
						</td>
					</tr>
					<tr>
						<td>
							<label htmlFor="password">Password</label>
						</td>
						<td>
							<input
								name="password"
								type="password"
								value={password}
								onChange={handleOnPasswordChanged}
							/>
						</td>
					</tr>
					<tr>
						<td></td>
						<td>
							<button onClick={handleSubmit}>Login</button>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};

export default LoginForm;
