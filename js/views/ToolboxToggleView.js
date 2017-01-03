/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

(function ($, Backbone, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.ToolboxToggleView = Backbone.View.extend({

    initialize: function(options) {
      this._viewFactory = options.viewFactory;
      this.listenTo(this.model, 'change:expanded', this.render);
    },

    events: {
      'click': function(evt) {
        evt.preventDefault();
        this.model.set({'expanded': !this.model.get('expanded')});
      }
    },

    template: function() {
      return Drupal.theme.ckeditorToolboxToggle();
    },

    render: function() {
      if (!this.$el.hasClass('ckeditor-toolbox-toggle')) {
        this.$el.addClass('ckeditor-toolbox-toggle');
        this.$el.html(this.template());
        this.$iconEl = this.$el.find('.ckeditor-toolbox-toggle__icon');
        this.$textEl = this.$el.find('.ckeditor-toolbox-toggle__text');
      }

      if (this.model.get('expanded')) {
        this.$el.addClass('ckeditor-toolbox-toggle--active');
        this.$textEl.addClass('ckeditor-toolbox-toggle__text--active');
        this.$iconEl.addClass('ckeditor-toolbox-toggle__icon--active');
      }
      else {
        this.$el.removeClass('ckeditor-toolbox-toggle--active');
        this.$textEl.removeClass('ckeditor-toolbox-toggle__text--active');
        this.$iconEl.removeClass('ckeditor-toolbox-toggle__icon--active');
      }

      return this;
    },
  });

}(jQuery, Backbone, Drupal));
