import { GetServerSideProps } from "next";
import { login } from "../services/AuthenticationService";
import { transpileCookie } from "../services/CookieService";
import { CookieKeys } from "../utils/Constants";

const Home = () => {
	return <h1>Test</h1>;
};

export const getServerSideProps: GetServerSideProps = async context => {
	const cookieObj = transpileCookie(context.req.headers.cookie);
	console.log(cookieObj);

	return {
		props: {}
	};
};

export default Home;
