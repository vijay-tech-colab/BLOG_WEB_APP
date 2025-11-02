// utils/rabbitmq.js
import amqp from "amqplib";


const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqps://owapqanv:FMfGDVWXcSMc_0T8-IMSH9UXegLRP6O6@duck.lmq.cloudamqp.com/owapqanv";
const EXCHANGE = process.env.EXCHANGE || "email_exchange";
const ROUTING_KEY = process.env.ROUTING_KEY || "send_email";

let channel;

export async function initRabbit() {
  const connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "direct", { durable: true });
  console.log("✅ Connected to RabbitMQ");
}

export async function enqueueEmailTask(emailPayload) {
  if (!channel) await initRabbit();
  const buffer = Buffer.from(JSON.stringify(emailPayload));
  channel.publish(EXCHANGE, ROUTING_KEY, buffer, { persistent: true });
  console.log("📨 Email task enqueued for:", emailPayload.to);
}
