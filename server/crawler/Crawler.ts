import fetch from "node-fetch";

const BASE_PATH = "https://api.spacexdata.com/v2";

(async () => {
	const alllaunches = await fetch(`${BASE_PATH}/launches`);
	console.log(alllaunches);
})();
