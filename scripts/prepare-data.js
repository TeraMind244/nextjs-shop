const fs = require("fs-extra");
const path = require("path");

const data = {
	private: {
		users: [],
		authetication: []
	},
	public: {
		shop: [
			{
				name: "Milk",
				price: 20
			},
			{
				name: "Egg",
				price: 8
			},
			{
				name: "Beef",
				price: 100
			},
			{
				name: "Pork",
				price: 50
			}
		]
	}
};

function writeDataToJSON(fileName, data) {
	fs.writeFileSync(path.join(process.cwd(), "data", ...fileName.split("/")), JSON.stringify(data, null, "\t"));
}

function prepareData() {
	writeDataToJSON("private/authentication.json", data.private.authetication);
	writeDataToJSON("private/users.json", data.private.users);
	writeDataToJSON("public/shop.json", data.public.shop);
}

prepareData();
