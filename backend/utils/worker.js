// worker.js
import amqp from "amqplib";
import sendMail from "./sendEmail.js";



const RABBITMQ_URL = process.env.RABBITMQ_URL 
const EXCHANGE = process.env.EXCHANGE || "email_exchange";
const ROUTING_KEY = process.env.ROUTING_KEY || "send_email";
const QUEUE = process.env.QUEUE || "email_queue";


export async function startWorker() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE, "direct", { durable: true });
    await channel.assertQueue(QUEUE, { durable: true });
    await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);

    console.log(`👷 Worker started — listening on queue: ${QUEUE}`);

    channel.consume(
      QUEUE,
      async (msg) => {
        if (!msg) return;
        try {
          const emailPayload = JSON.parse(msg.content.toString());
          console.log("📧 Sending email to:", emailPayload.to);
          await sendMail(emailPayload);
          channel.ack(msg);
          console.log("✅ Email sent successfully!");
        } catch (err) {
          console.error("❌ Error sending email:", err);
          channel.nack(msg, false, true);
        }
      },
      { noAck: false }
    );
  } catch (err) {
    console.error("Worker failed:", err);
  }
}
