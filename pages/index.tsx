import { GetServerSideProps, NextPage } from "next";
import Shop from "../components/Shop";
import { loginWithAuthenticationId } from "../services/AuthenticationService";
import { addUser } from "../services/UserService";
import { getAuthentication } from "../utils/CookieHelper";

interface IProps {
	username: string;
}

const Home: NextPage<IProps> = ({ username }) => {
	return (
		<>
			<h1>Hello {username}</h1>
			<Shop products={[]}></Shop>
		</>
	);
};

export const getServerSideProps: GetServerSideProps<IProps> = async ({ req, res }) => {
	await addUser({
		username: "triche",
		password: "kms123"
	});

	const authentication = await getAuthentication(req.headers.cookie);
	if (authentication) {
		const { username, authenticationId } = authentication;

		const loginSuccess = await loginWithAuthenticationId(username, authenticationId);
		if (loginSuccess) {
			return {
				props: {
					username
				}
			};
		}
	}

	return {
		redirect: {
			destination: "/login",
			permanent: false
		}
	};
};

export default Home;
