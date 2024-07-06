import nconf from "nconf";
import { faker } from "@faker-js/faker";
import path from "path";
import { MailConnectionError } from "@arunvaradharajalu/common.errors";
import { MailClient, MailClientImpl, MailMessage, TemplateTypes } from "../src";
import { mockSendMail } from "./mocks/mail-client.mock";


describe("Mail Client Module", () => {
	let mailClient: MailClient;

	beforeEach(() => {
		mailClient = new MailClientImpl();
	});

	describe("\"init\" method", () => {
		describe("Exception Path", () => {
			it("If host is not set, should throw error", () => {
				expect(() => mailClient.init()).toThrow(MailConnectionError);
				expect(() => mailClient.init()).toThrow("SMTP, host must be set before initialization");
			});

			it("If port is not set, should throw error", () => {
				mailClient.host = faker.random.alpha(5);

				expect(() => mailClient.init()).toThrow(MailConnectionError);
				expect(() => mailClient.init()).toThrow("SMTP, port must be set before initialization");
			});

			it("If user is not set, should throw error", () => {
				mailClient.host = faker.random.alpha(5);
				mailClient.port = parseInt(faker.random.numeric(4));

				expect(() => mailClient.init()).toThrow(MailConnectionError);
				expect(() => mailClient.init()).toThrow("SMTP, user must be set before initialization");
			});

			it("If password is not set, should throw error", () => {
				mailClient.host = faker.random.alpha(5);
				mailClient.port = parseInt(faker.random.numeric(4));
				mailClient.user = faker.random.alpha(5);

				expect(() => mailClient.init()).toThrow(MailConnectionError);
				expect(() => mailClient.init()).toThrow("SMTP, password must be set before initialization");
			});
		});

		describe("Happy Path", () => {
			it("If all values are set, should initialize the mail client", () => {
				mailClient.host = faker.random.alpha(5);
				mailClient.port = parseInt(faker.random.numeric(4));
				mailClient.user = faker.random.alpha(5);
				mailClient.password = faker.random.alphaNumeric(6);

				const spyInit = jest.spyOn(mailClient, "init");

				mailClient.init();

				expect(spyInit).toHaveBeenCalled();
			});
		});
	});

	describe("\"sendMail\" method", () => {
		describe("Exception Path", () => {
			it("If mail client is not initialized, should throw error", () => {
				expect(
					() => mailClient.sendMail(new MailMessage(
						faker.internet.email(),
						faker.internet.email()
					), "", "", "")
				).rejects.toThrow(MailConnectionError);
			});
		});

		describe("Happy Path", () => {
			it("If all values are set, should initialize the mail client", async () => {
				mailClient.host = nconf.get("mailClientHost");
				mailClient.port = parseInt(nconf.get("mailClientPort"));
				mailClient.user = nconf.get("mailClientUser");
				mailClient.password = nconf.get("mailClientPassword");

				mailClient.init();

				const mailMessage = new MailMessage(
					"test1@gmail.com",
					"test2@gmail.com"
				);

				const spySendMail = jest.spyOn(mailClient, "sendMail").mockImplementation(mockSendMail);

				const templateFolderPath = path.join(
					__dirname,
					"../src/utils/assets/templates/emails/test"
				);
				const html = await mailClient
					.getTemplateString(
						templateFolderPath,
						TemplateTypes.html
					);
				const subject = await mailClient
					.getTemplateString(
						templateFolderPath,
						TemplateTypes.subject
					);
				const text = await mailClient
					.getTemplateString(
						templateFolderPath,
						TemplateTypes.text
					);

				await mailClient.sendMail(mailMessage, html, subject, text);

				expect(spySendMail).toHaveBeenCalled();
			});
		});
	});
});