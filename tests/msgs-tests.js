Tinytest.add("Msgs - Msgs is available and instance of MsgsHandler", function (test) {
	test.instanceOf(Msgs, MsgsHandler);
});

Tinytest.add("Msgs - No message are set on startup", function (test) {
	test.equal(Msgs.getMessages().length, 0);
});

Tinytest.add("Msgs - set a message", function (test) {
	var message = 'a message';
	var messageType = 'success';
	// Set the message
	var setMessage = Msgs.addMessage(message, messageType);
	// Make sure the message is the same as we passed
	test.equal(setMessage.message, message);
	test.equal(setMessage.type, messageType);
	// Also make sure it has a timestamp
	test.instanceOf( setMessage.timestamp, Date );
});

// Test errors?
Tinytest.add("Msgs - only strings should be acceptable for message and type", function (test) {
	// An integer
	var message = 1;
	// A bool
	var messageType = true;
});

Tinytest.add("Msgs - reset all message", function (test) {
	// Just set a random message so we are sure there is at least one set
	Msgs.addMessage('m', 'type');
	test.notEqual(Msgs.getMessages().length, 0);
	Msgs.removeAllMessage();
	test.equal(Msgs.getMessages().length, 0);
});

Tinytest.add('Msgs - set message should be retrievable', function (test) {
	// Start by removing all messages
	Msgs.removeAllMessage();
	// Set two messages
	var message1 = { message: 'message number one', type: 'alert' };
	var message2 = { message: 'message number two is a bit longer', type: 'normal' };
	// Add both messages
	Msgs.addMessage( message1.message, message1.type );
	Msgs.addMessage( message2.message, message2.type );
	var messages = Msgs.getMessages();
	test.equal(messages.length, 2);
	test.equal(messages[0].message, 'message number one');
});

// HOW TO WAIT 5 SECS?
Tinytest.addAsync("Msgs - message should be removed after 5 secds", function(test, next) {

	// Start by removing all messages
	Msgs.removeAllMessage();

	// Add a message
	Msgs.addMessage('msg', 'type');

	// Make sure there is one message
	test.equal(Msgs.getMessages().length, 1);

	Meteor.setTimeout(function(error) {

		// Now there should be 0 messages!
		test.equal(Msgs.getMessages().length, 0);

		next();

  }, 5500);

});