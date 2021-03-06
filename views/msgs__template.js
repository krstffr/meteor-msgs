Template.msgs.helpers({
	showHideButton: function () {
		return Msgs.hideButton.show;
	},
	hideButtonHtml: function () {
		return Msgs.hideButton.buttonHtml;
	},
	messages: function () {
		
		// Filter messages using this array
		var filters = [];
		
		// Add various types of filters to the filters array if they are set
		if (this.type)
			filters.push({ filterKey: 'type', filterValue: this.type });
		if (this.category)
			filters.push({ filterKey: 'category', filterValue: this.category });
		
		// If there are items in the filters array, use it to filter the messages
		if (filters.length > 0)
			return Msgs.getMessagesFiltered(filters);

		// If there are no filter, just return all messages
		return Msgs.getMessages();

	}
});

Template.msgs.events({
	'click .msgs__message__hide-message-link': function ( e ) {
		e.preventDefault();
		Msgs.removeMessage( this );
	}
});