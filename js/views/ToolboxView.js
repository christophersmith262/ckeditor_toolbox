/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

(function ($, Backbone, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.ToolboxView = Backbone.View.extend({
    initialize: function(options) {
      this.render();
    },

    render: function() {
      this.$el.addClass('ckeditor-toolbox');
      this.$el.html(Drupal.theme.ckeditorToolbox());
      this.$el.find('.ckeditor-toolbox-cards__card:odd').addClass('odd');
      return this;
    }

  });

}(jQuery, Backbone, Drupal));
