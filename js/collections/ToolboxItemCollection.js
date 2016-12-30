/**
 * @file
 * A Backbone model for representing paragraphs_editor edit buffer items.
 */

(function (Backbone, Drupal) {

  Drupal.ckeditor_toolbox.ToolboxItemCollection = Backbone.Collection.extend({
    model: Drupal.ckeditor_toolbox.ToolboxItemModel,
  });

}(Backbone, Drupal));

