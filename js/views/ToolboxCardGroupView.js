/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

(function ($, Backbone, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.ToolboxCardGroupView = Backbone.View.extend({

    initialize: function(options) {
      this._viewFactory = options.viewFactory;
      this._renderedCards = {};
      this.listenTo(this.model, 'change:title', this.renderTitle);
      this.listenTo(this.model.toolboxItemCollection, 'add remove', this.renderCards);
    },

    template: function() {
      return Drupal.theme.ckeditorToolboxGroup();
    },

    render: function() {
      if (!this.$el.hasClass('ckeditor-toolbox-group')) {
        this.$el.addClass('ckeditor-toolbox-group');
        this.$el.html(this.template());
        this.$titleEl = this.$el.find('.ckeditor-toolbox-header');
        this.$cardContainerEl = this.$el.find('.ckeditor-toolbox-cards');
      }

      this.renderTitle().renderCards();

      return this;
    },

    renderTitle: function() {
      this.$titleEl.html(this.model.get('title'));
      return this;
    },

    resetCards: function() {
      for (var i in this._renderedGroups) {
        this._renderedCards[i].remove();
      }
      this._renderedCards = {};
      return this;
    },

    renderCards: function() {
      var view = this;
      this.resetCards();
      this.model.toolboxItemCollection.each(function(toolboxItemModel) {
        view.renderCard(toolboxItemModel);
      });
      return this;
    },

    renderCard: function(toolboxItemModel) {
      var view = this._viewFactory.create('card', toolboxItemModel, this.$cardContainerEl);
      if (view) {
        this._renderedCards[toolboxItemModel.get('id')] = view;
      }
      return this;
    },

    remove: function() {
      this.resetCards();
      return Backbone.View.prototype.remove.call(this);
    }

  });

}(jQuery, Backbone, Drupal));

