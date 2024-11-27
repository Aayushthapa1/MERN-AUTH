import Mailtrap from "mailtrap";
const { MailtrapClient } = Mailtrap;

const mailtrapClient = new MailtrapClient({
  token: "YOUR_API_TOKEN",
  endpoint: "https://send.api.mailtrap.io"
});

const sender = {
  email: "hello@example.com",
  name: "Your Name"
};

export { mailtrapClient, sender };
