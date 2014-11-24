MsgsHandler = function () {
	
	var that = this;

	// Config vars
  that.resetTime = 5000;

  // Handling of hide butotn
  that.hideButton = {};

  that.hideButton.buttonHtml = 'x';

  that.hideButton.setButtonHtml = function ( html ) {

    check( html, String );

    that.hideButton.buttonHtml = html;

  };

  that.hideButton.show = false;

  that.hideButton.setVisibility = function ( showBool ) {

    check( showBool, Boolean );

    that.hideButton.show = showBool;
    
  };

  // Method for setting resetTime
  that.setResetTime = function ( newTime ) {

    check( newTime, Number );

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

    check( message, String );
    check( type, String );

    // category is optional
    if (category)
      check( category, String );
    
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

    check( messages, Array );

    Session.set('matryoshkaMessages', messages );

  };

  that.getMessagesFiltered = function ( filters ) {

    check( filters, Array );

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