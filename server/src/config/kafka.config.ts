// import { Kafka, logLevel } from "kafkajs";

// export const kafka = new Kafka({
//   brokers: [process.env.KAFKA_BROKER!],
//   ssl: true,
//   sasl: {
//     mechanism: "scram-sha-256",
//     username: process.env.KAFKA_USERNAME!,
//     password: process.env.KAFKA_PASSWORD!,
//   },
//   logLevel: logLevel.ERROR,
// });

// export const producer = kafka.producer();
// export const consumer = kafka.consumer({ groupId: "chats" });

// export const connectKafkaProducer = async () => {
//   await producer.connect();
//   console.log("Kafka Producer connected...");
// };


import { Kafka, logLevel } from "kafkajs";
import fs from "fs";

// Load the CA certificate
const caPath = process.env.KAFKA_CA_PATH as string;
const sslCa = [fs.readFileSync(caPath, "utf-8")];

export const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER as string],
  ssl: {
    rejectUnauthorized: true, // Ensure the client verifies the certificate
    ca: sslCa,
  },
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME as string,
    password: process.env.KAFKA_PASSWORD as string,
  },
  logLevel: logLevel.ERROR,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: "chats"});




export const connectKafkaProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected...");
};
