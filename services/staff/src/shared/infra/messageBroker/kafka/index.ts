import { KafkaClient as Client } from "kafka-node";

const kafkaHost = process.env.KAFKAHOST;
const kafkaPort = process.env.KAFKAPORT;
const client = new Client({ kafkaHost: `${kafkaHost}:${kafkaPort}` });
