/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

(function ($, Backbone, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.ToolboxCardView = Backbone.View.extend({

    cardClass: 'ckeditor-toolbox-card__card',

    initialize: function(options) {
      this._viewFactory = options.viewFactory;
      this._dragHandler = options.dragHandler;
      this.listenTo(this.model, 'change:title', this.renderContents);
      this.listenTo(this.model, 'change:dragging change:dropable', this.renderAttributes);
    },

    template: function() {
      return Drupal.theme.ckeditorToolboxCard();
    },

    render: function() {
      if (!this.$el.hasClass(this.cardClass)) {
        var $el = $(this.template());
        this.$el.replaceWith($el);
        this.setElement($el[0]);

        var view = this;
        this.ckEl.on('dragstart', function(evt) {
          view._dragHandler.start(evt, view);
        });
        this.ckEl.on('dragend', function(evt) {
          view._dragHandler.stop(evt, view);
        });
      }

      this.renderContents();

      return this;
    },

    renderContents: function() {
      this.$el.html(this.model.get('title'));
    },

    renderAttributes: function() {
      var dragging = this.model.get('dragging');
      var dropable = this.model.get('dropable');

      if (dragging) {
        this.$el.addClass(this.cardClass + '--dragging');
      }
      else {
        this.$el.removeClass(this.cardClass + '--dragging');
      }

      if (dragging && dropable) {
        this.$el.addClass(this.cardClass + '--dropable');
      }
      else {
        this.$el.removeClass(this.cardClass + '--dropable');
      }
    },

    setElement: function(element) {
      var rtn = Backbone.View.prototype.setElement.call(this, element);
      this.ckEl = new CKEDITOR.dom.element(this.el);
      return rtn;
    },

    remove: function() {
      this.ckEl.removeAllListeners();
      delete this.ckEl;
      return Backbone.View.prototype.remove.call(this);
    }
  });

}(jQuery, Backbone, Drupal));
