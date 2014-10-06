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
  that.removeAllMessages = function () {
    that.setMessages( [] );
  };

  // Method for removing a message (which is the same as the one which get's passed)
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

  that.addMessage = function ( message, type, category ) {

    if (typeof message !== 'string')
      throw new Meteor.Error('message should be a string');

    if (typeof type !== 'string')
      throw new Meteor.Error('type should be a string');

    // category is optional
    if (category && typeof category !== 'string')
      throw new Meteor.Error('category should be a string');
    
    var msg = { message: message, type: type, timestamp: new Date() };
    
    if (category)
      msg.category = category;

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

  that.getMessagesFiltered = function ( filters ) {
    // filter should not be a string or number, and should have a length
    if (!filters)
      throw new Meteor.Error('filters is not set!');

    if (typeof filters === 'string')
      throw new Meteor.Error('filters should not be a string!');

    if (typeof filters === 'number')
      throw new Meteor.Error('filters should not be an integer!');

    if (typeof filters === 'boolean')
      throw new Meteor.Error('filters should not be a boolean!');

    if (filters.length < 1)
      throw new Meteor.Error('filters has less than 1 elements!');

    // Iterate over all messages
    return _( that.getMessages() )
    .chain()
    .map( function( message ) {
      // if returnMessageBool is true at the end of this map()
      // then return the message, else return "false" (which
      // gets deleted by the compact() later.)
      var returnMessageBool = true;
      _.each(filters, function( filter ) {
        // Iterate over every filter, and if one is not true
        // then set the returnMessageBool to false
        if (message[filter.filterKey] !== filter.filterValue)
          returnMessageBool = false;
      });
      if (!returnMessageBool)
        return false;
      return message;
    })
    .flatten()
    .compact()
    .value();

  };

};

Msgs = new MsgsHandler();