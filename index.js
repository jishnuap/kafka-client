const Kafka = require("node-rdkafka");

var producer = Kafka.producer({
    "metadata.broker.list": "localhost:9092",
    dr_cb: true
});

producer.connect({}, function(err, data) {
    if (err) {
        console.log("Error Connect", err);
    }
    console.log("Data", data.topics);
});

// wait for the ready event before proceeding
producer.on("ready", function() {
    try {
        console.log("ready");
        producer.produce(
            // topic to send the message to
            "testTopic",
            // optionally we can manually specify a partition for the message
            // this defaults to -1 - which will use librdkafka's default partitioner (
            // consistent random for keyed messages, random for unkeyed messages)
            null,
            // message to send. Must be a buffer
            Buffer.from("Awesome message"),
            // for keyed messages, we also specify the key - note that this field is optional
            "Stormwind",
            // you can send a timestamp here. If your broker version supports it,
            // it will get added. Otherwise, we default to 0
            Date.now()
            // you can send an opaque token here, which gets passed along
            // to your delivery reports
        );
        producer.flush(10000, function(err, data) {
            if (err) {
                console.log("Flush error", err);
            }
            console.log("Flushed data", data);
        });
    } catch (err) {
        console.error("A problem occurred when sending our message");
        console.error(err);
    }
});

// any errors we encounter, including connection errors
producer.on("event.error", function(err) {
    console.error("Error from producer");
    console.error(err);
});
