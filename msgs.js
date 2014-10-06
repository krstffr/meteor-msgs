MsgsHandler = function () {
	
	var that = this;

	// Config vars
  that.resetTime = 5000;

  // Method for setting resetTime
  that.setResetTime = function ( newTime ) {

    if (typeof newTime !== 'number')
      throw new Meteor.Error('newTime should be a number');

    that.resetTime = newTime;
    
  };

  // Method for removing all messages
  that.removeAllMessage = function () {
    that.setMessages( [] );
  };

  that.removeMessage = function ( msg ) {

    var currentMessages = that.getMessages();
    // Iterate over all the messages, if they are the same the same don't return
    // them to the messagesWithoutMatch array
    var messagesWithoutMatch = _(currentMessages).map( function( message ) {
      if (!_.isEqual(message, msg) )
        return message;
    });
    // Remove all falsy values
    messagesWithoutMatch = _.compact(messagesWithoutMatch);
    that.setMessages( messagesWithoutMatch );
    
  };

  that.addMessage = function ( message, type ) {

    if (typeof message !== 'string')
      throw new Meteor.Error('message should be a string');

    if (typeof type !== 'string')
      throw new Meteor.Error('type should be a string');
    
    var msg = { message: message, type: type, timestamp: new Date() };
    var currentMessages = that.getMessages();
    currentMessages.push( msg );
    that.setMessages( currentMessages );

    // For auto hiding of messages
    Meteor.setTimeout( function () {
      that.removeMessage( msg );
    }, that.resetTime);

    return msg;

  };

  that.getMessages = function ( msg ) {
    return Session.get('matryoshkaMessages') || [];
  };

  that.setMessages = function ( messages ) {

    if (!messages)
      throw new Meteor.Error('messages is not set!');

    if (typeof messages === 'string')
      throw new Meteor.Error('messages should not be a string!');

    if (typeof messages === 'number')
      throw new Meteor.Error('messages should not be an integer!');

    if (typeof messages === 'boolean')
      throw new Meteor.Error('messages should not be a boolean!');

    Session.set('matryoshkaMessages', messages );

  };

  that.getMessagesOfType = function ( type ) {
    return _.filter(that.getMessages(), function( message ) {
      return message.type === type;
    });
  };

};

Msgs = new MsgsHandler();