Template.msgs.helpers({
	messages: function () {
		return Msgs.getMessages();
	}
});

Template.msgs.events({
	'click .hide-message': function () {
		Msgs.removeMessage( this );
	}
});