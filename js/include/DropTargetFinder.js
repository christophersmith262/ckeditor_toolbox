/**
 * @file
 * CKEDITOR Lineutils Finder for Drop Locations.
 *
 * @ignore
 */
(function ($, Drupal, CKEDITOR) {

  Drupal.ckeditor_toolbox.DropTargetFinder = function(editor) {
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

})(jQuery, Drupal, CKEDITOR);
