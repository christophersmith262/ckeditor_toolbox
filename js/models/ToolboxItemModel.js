/**
 * @file
 * A Backbone model for representing paragraphs_editor edit buffer items.
 */

(function (Backbone, Drupal) {

  'use strict';

  /**
   * Backbone  Model for representing paragraphs_editor commands.
   *
   * The id for this model is the uuid of a paragraph entity that the item
   * corresponds to.
   *
   * @constructor
   *
   * @augments Backbone.Model
   */
  Drupal.ckeditor_toolbox.ToolboxItemModel = Backbone.Model.extend({

    /**
     * @type {object}
     *
     * @prop markup
     */
    defaults: /** @lends Drupal.paragraphs_editor.CommandModel# */{

      /**
       * Whether or not the item is ready to be inserted.
       *
       * @type {string}
       */
      "title": '',
    },

  });

}(Backbone, Drupal));
