define(['backbone','CKEditor'], function (Backbone,CKEDITOR)
	{
		var EditElementOverlayView = Backbone.View.extend({
			el: $(".edit-overlay"),
			events: {
				"submit #editElementForm": "saveElement",
				"click .remove-element": "removeElement",
				"click .close" : "close",
				"click .cancel" : "close"
			},
			template: _.template($("#editElementItemTemp").html()),
			initialize: function (options) {
				this.dispatch = options.dispatch;
			},
			saveElement: function (e){
				e.preventDefault();
				this.model.set("name", this.$el.find(".input-name").val());
				this.model.set("content", this.$el.find(".input-content").val());
				this.model.set("bcolor", this.$el.find(".input-bcolor").val());
				this.model.set("opacity", this.$el.find(".input-opacity").val());
				this.close();
			},
			removeElement: function (e) {
				e.preventDefault();
				this.model.destroy();
				this.close();
			},
			show: function(model){
				this.model = model;
				this.render();
			},
			close: function (e) {
				this.$el.addClass("hidden");
			},
			render: function () {
				this.$el.html(this.template(this.model.toJSON()));
				//this.$el.find(".input-content").height(this.model.get("height")).width(this.model.get("width"));
				CKEDITOR.replace("element-content");
				this.$el.removeClass("hidden");
				return this;
			}
		});

		return EditElementOverlayView;
	}
);