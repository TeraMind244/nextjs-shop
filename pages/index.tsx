import Cookies from "cookies";
import { GetServerSideProps } from "next";
import { addOrRenewAuthentication } from "../services/AuthenticationService";
import { getAuthentication } from "../services/CookieService";
import { addUser } from "../services/UserService";

const Home = () => {
	return <h1>Hello World!!!</h1>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	addUser({
		username: "triche",
		password: "kms123"
	});
	const cookies = new Cookies(req, res);
	const authentication = getAuthentication(cookies);

	if (!authentication) {
		return {
			props: {
				authenticated: false
			},
			redirect: "/login"
		};
	} else {
		addOrRenewAuthentication(authentication.username, authentication.authenticationId);
	}

	return {
		props: {}
	};
};

export default Home;
