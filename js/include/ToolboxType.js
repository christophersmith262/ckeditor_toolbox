/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

/**
 * @file
 * Drupal CKEditor Toolbox plugin.
 *
 * @ignore
 */
(function ($, Drupal, CKEDITOR) {

  Drupal.ckeditor_toolbox.ToolboxType = function() {
  }

  $.extend(Drupal.ckeditor_toolbox.ToolboxType.prototype, {
    filter: function() {},
    insert: function(toolboxItemModel, editor) {},
  });

  Drupal.ckeditor_toolbox.ToolboxType.extend = Backbone.Model.extend;

})(jQuery, Drupal, CKEDITOR);
