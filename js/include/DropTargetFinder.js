/**
 * @file
 * CKEDITOR Lineutils Finder for Drop Locations.
 *
 * @ignore
 */
(function ($, Drupal, CKEDITOR) {

  Drupal.ckeditor_toolbox.DropTargetFinder = function(editor) {
    this._draggedModel = null;

    $.extend(this, new CKEDITOR.plugins.lineutils.finder(editor, {
      lookups: {
        'default': function(el) {

          if (el.is(CKEDITOR.dtd.$listItem)) {
            return;
          }

          if (!el.is( CKEDITOR.dtd.$block)) {
            return;
          }

          if (CKEDITOR.plugins.widget.isDomNestedEditable(el)) {
            return;
          }

          return CKEDITOR.LINEUTILS_BEFORE | CKEDITOR.LINEUTILS_AFTER;
        }
      },
    }));
  }

  $.extend(Drupal.ckeditor_toolbox.DropTargetFinder.prototype, {

    setDraggedModel: function(toolboxItemModel) {
      this._draggedModel = toolboxItemModel;
    },

    getDraggedModel: function(toolboxItemModel) {
      return this._draggedModel;
    }
  });

})(jQuery, Drupal, CKEDITOR);
