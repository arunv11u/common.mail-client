# @arunvaradharajalu/common.mail-client

[![npm version](https://badge.fury.io/js/%40arunvaradharajalu%2Fcommon.mail-client.svg)](https://badge.fury.io/js/%40arunvaradharajalu%2Fcommon.mail-client)
[![GitHub issues](https://img.shields.io/github/issues/arunv11u/common.mail-client)](https://github.com/arunv11u/common.errors/mail-client)
[![GitHub license](https://img.shields.io/github/license/arunv11u/common.mail-client)](https://github.com/arunv11u/common.mail-client/blob/master/LICENSE)

This package provides a mail client using nodemailer under the hood for sending emails.

## Installation

To install the package, use npm or yarn:

```bash
npm install @arunvaradharajalu/common.mail-client
```

## Usage

Here is an example of how to use the mail client:

```typescript
import { MailClientImpl } from '@arunvaradharajalu/common.mail-client';

// Create an instance of the MailClientImpl
const mailClient = new MailClientImpl();

// Set SMTP configuration
mailClient.host = 'smtp.example.com';
mailClient.port = 587;
mailClient.user = 'your-email@example.com';
mailClient.password = 'your-email-password';

// Initialize the mail client
mailClient.init();

// Define the email message
const message = {
    from: 'your-email@example.com',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'This is a test email',
    html: '<p>This is a test email</p>',
};

// Send the email
mailClient.sendMail(message, message.html, message.subject, message.text)
    .then(() => {
        console.log('Email sent successfully!');
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });
```

## API

### `MailClientImpl`

#### Properties

- `host: string | null`
	- Sets the SMTP host.
- `port: number | null`
	- Sets the SMTP port.
- `user: string | null`
	- Sets the SMTP user.
- `password: string | null`
	- Sets the SMTP password.

#### Methods

- `init(): void`
	- Initializes the mail client with the provided SMTP configuration.
- `sendMail(message: MailMessage, html: string, subject: string, text: string): Promise<void>`
	- Sends an email with the provided message, HTML content, subject, and text content.
- `getTemplateString(templateFolderPath: string, type: TemplateTypes): Promise<string>`
	- Retrieves the email template string from the specified folder path and type.
- `compile(template: any, data: { [key: string]: any }): string`
	- Compiles the email template with the provided data.

## Running Tests

To run the tests, use:

```bash
npm test
```

The test results will be generated in an HTML report with the title "Mail Client Test Report".

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for bug fixes, improvements, or new features.

## Author

Arun Varadharajalu

## License

This project is licensed under the ISC License.