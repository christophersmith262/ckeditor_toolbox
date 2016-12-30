/**
 * @file
 * A Backbone model for representing paragraphs_editor edit buffer items.
 */

(function (Backbone, Drupal) {

  Drupal.ckeditor_toolbox.ToolboxGroupCollection = Backbone.Collection.extend({
    model: Drupal.ckeditor_toolbox.ToolboxGroupModel,
  });

}(Backbone, Drupal));
