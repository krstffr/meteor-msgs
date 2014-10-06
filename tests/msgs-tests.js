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

// Only strings should be OK for message and type
Tinytest.add("Msgs - only strings should be acceptable for message and type", function (test) {
	
	// Wrong types for messages
	var message = 1;
	var type = true;

	// Both cases should throw errors
	test.throws(function () {
		Msgs.addMessage(message, 'type');
	});
	test.throws(function () {
		Msgs.addMessage('message', type);
	});

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

// Check filter
Tinytest.add('Msgs - filter messages by type', function (test) {
	// Create some messages of various types
	var message1 = { message: 'm1', type: 'warning'};
	var message2 = { message: 'm2', type: 'success'};
	var message3 = { message: 'm3', type: 'warning'};
	// Reset all messages
	Msgs.removeAllMessage();
	// Add all messages
	Msgs.addMessage( message1.message, message1.type );
	Msgs.addMessage( message2.message, message2.type );
	Msgs.addMessage( message3.message, message3.type );
	// Get all the warning messages which should be two
	var warningMessages = Msgs.getMessagesOfType('warning');
	test.equal(warningMessages.length, 2);
	// Get all the success messages
	var successMessages = Msgs.getMessagesOfType('success');
	test.equal(successMessages.length, 1);
	// Reset all messages
	Msgs.removeAllMessage();
});

// test the setMessages method
Tinytest.add('Msgs - setMessages method', function (test) {
	// Setting messages to a string,number,bool value should throw an error
	test.throws(function () {
		Msgs.setMessages('string');
	});
	test.throws(function () {
		Msgs.setMessages(123);
	});
	test.throws(function () {
		Msgs.setMessages(true);
	});
	test.throws(function () {
		Msgs.setMessages(undefined);
	});
	// Set message 
	Msgs.setMessages([1]);
	test.equal( Msgs.getMessages().length, 1 );
	// Reset everything
	Msgs.removeAllMessage();
});

// Check that user can set new time for resetTimer
Tinytest.addAsync("Msgs - resetTimer should be setable by the user and messages should be reset after timer", function(test, next) {

	// Just a method for adding quickly adding a message
	var addMsg = function () {
		// Now add a message
		Msgs.addMessage('msg', 'type');
		// Make sure there is one message
		test.equal( Msgs.getMessages().length, 1 );
	};
	
	// Setting the timer to anything else but a number should throw an error
	test.throws(function () { Msgs.setResetTime('string'); });
	test.throws(function () { Msgs.setResetTime([]); });
	test.throws(function () { Msgs.setResetTime(true); });

	// the resetTimer be 5000 by default
	var presetResetTime = 5000;
	test.equal( Msgs.resetTime, presetResetTime );
	// Try setting it to a new var and check it again
	var newTime = 500;
	Msgs.setResetTime( newTime );
	test.equal( Msgs.resetTime, newTime );

	addMsg();

	Meteor.setTimeout(function () {
		
		// Now there should be no messages
		test.equal( Msgs.getMessages().length, 0 );
		// Reset the timer back to what it was
		Msgs.setResetTime( presetResetTime );
		// Add a new message
		addMsg();

		Meteor.setTimeout(function () {
			
			// Now there should be no messages
			test.equal( Msgs.getMessages().length, 0 );
			next();

		}, (presetResetTime+50) );

	}, (newTime+50) );

});