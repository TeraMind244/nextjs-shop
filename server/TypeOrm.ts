import { createConnection, Connection } from "typeorm";

(async () => {
	const connection: Connection = await createConnection({
		type: "mongodb",
		host: "localhost",
		port: 27017,
		database: "test"
	});
})();
