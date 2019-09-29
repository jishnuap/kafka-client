const Kafka = require("node-rdkafka");

var producer = Kafka.producer(
  "metadata.broker.list" : "localhost:9092",
  dr_cb: true
});
