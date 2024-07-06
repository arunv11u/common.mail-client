import nconf from "nconf";


beforeAll(async () => {
	nconf.argv().env().add("data", {
		type: "literal", store: {
			mailClientHost: "smtp.gmail.com",
			mailClientPort: 587,
			mailClientUser: "username",
			mailClientPassword: "password"
		}
	});
});
