const amqp = require("amqplib");async function connect() {
    try {
      const connection = await amqp.connect("amqp://localhost:5672");
      const channel = await connection.createChannel();
      await channel.assertQueue("hello");
      channel.consume("hello", message => {
        console.log(message.content.toString())
        channel.ack(message);
      });
      console.log(`Waiting for messages...`);
    } catch (ex) {
      console.error(ex);
    }
   }
  connect();