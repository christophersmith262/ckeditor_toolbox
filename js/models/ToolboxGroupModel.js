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
  Drupal.ckeditor_toolbox.ToolboxGroupModel = Backbone.Model.extend({

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

    set: function(attributes, options) {
      if (!this.toolboxItemCollection) {
        this.toolboxItemCollection = new Drupal.ckeditor_toolbox.ToolboxItemCollection();
      }

      if (attributes.items) {
        this.toolboxItemCollection.add(attributes.items, {merge: true});
        delete attributes.items;
      }

      return Backbone.Model.prototype.set.call(this, attributes, options);
    },

  });

}(Backbone, Drupal));
