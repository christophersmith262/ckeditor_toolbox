/**
 * @file
 * Drupal Image plugin.
 *
 * This alters the existing CKEditor image2 widget plugin to:
 * - require a data-entity-type and a data-entity-uuid attribute (which Drupal
 *   uses to track where images are being used)
 * - use a Drupal-native dialog (that is in fact just an alterable Drupal form
 *   like any other) instead of CKEditor's own dialogs.
 *
 * @see \Drupal\editor\Form\EditorImageDialog
 *
 * @ignore
 */
(function ($, Drupal, CKEDITOR) {

  'use strict';

  CKEDITOR.plugins.add('ckeditortoolbox', {
    icons: null,
    hidpi: false,
    init: function (editor) {
      editor.on('contentDom', function(evt) {
        var view = new Drupal.ckeditor_toolbox.ToolboxView();
        $(evt.editor.container.$).find('.cke_contents').after(view.$el);
        $(evt.editor.container.$).find('.cke_contents').addClass('ckeditor-toolbox-processed');
      });
    }
  });
  
})(jQuery, Drupal, CKEDITOR);
