/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

(function ($, Backbone, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.ToolboxToggleView = Backbone.View.extend({

    containerClass: 'ckeditor-toolbox-toggle',
    iconClass: 'ckeditor-toolbox-toggle__icon',
    textClass: 'ckeditor-toolbox-toggle__text',

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
      if (!this.$el.hasClass(this.containerClass)) {
        this.$el.addClass(this.containerClass);
        this.$el.html(this.template());
        this.$iconEl = this.$el.find('.' + this.iconClass);
        this.$textEl = this.$el.find('.' + this.textClass);
      }

      if (this.model.get('expanded')) {
        this.$el.addClass(this.containerClass + '--active');
        this.$iconEl.addClass(this.iconClass + '--active');
        this.$textEl.addClass(this.textClass + '--active');
      }
      else {
        this.$el.removeClass(this.containerClass + '--active');
        this.$iconEl.removeClass(this.iconClass + '--active');
        this.$textEl.removeClass(this.textClass + '--active');
      }

      return this;
    },
  });

}(jQuery, Backbone, Drupal));
