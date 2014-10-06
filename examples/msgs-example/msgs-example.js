if (Meteor.isClient) {

  var msgCounter = 0;

  Template.msgsDemo.events({
    'click .messages-hide-all': function ( e ) {
      Msgs.removeAllMessages();
    },
    'click .messages-add': function ( e ) {
      
      msgCounter++;
      
      var clickedBtn = $(e.currentTarget);
      var messageType = clickedBtn.data('message-type') || '';
      var messageCategory = clickedBtn.data('category') || '';
      
      var message = 'Message no. ' + msgCounter;
      
      if (messageType)
        message += ' of type: ' + messageType;

      if (messageCategory)
        message += ' in category: ' + messageCategory;

      Msgs.addMessage(message, messageType, messageCategory);

    }
  });
}