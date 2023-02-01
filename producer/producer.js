const amqp = require("amqplib");

async function connect() {
    const msgBuffer = Buffer.from("Hello World");
    try {
      const connection = await amqp.connect("amqp://localhost:5672");
      const channel = await connection.createChannel();
      await channel.assertQueue("hello");
      await channel.sendToQueue("hello", msgBuffer);
      console.log("Sending 'Hello World' to hello queue");
      await channel.close();
      await connection.close();
    } catch (ex) {
      console.error(ex);
    }
   }
  connect();