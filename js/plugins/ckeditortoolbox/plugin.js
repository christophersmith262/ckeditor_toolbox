/**
 * @file
 * Drupal CKEditor Toolbox plugin.
 *
 * @ignore
 */
(function ($, Drupal, CKEDITOR) {

  'use strict';

  CKEDITOR.plugins.add('ckeditortoolbox', {
    icons: null,
    hidpi: false,
    init: function (editor) {

      /**
       * Attach the toolbox when the content dom is ready.
       */
      editor.on('contentDom', function(evt) {
        var $contents = $(editor.container.$).find('.cke_contents');
        if (!$contents.hasClass('ckeditor-toolbox-processed')) {
          var $frame = $contents.find('.cke_wysiwyg_frame');
          Drupal.ckeditor_toolbox.manager.attach(editor);
          editor.plugins.ckeditortoolbox.toolbox.view.resize($frame, $contents);
        }
      });

      editor.on('resize', function(evt) {
        if (editor.plugins.ckeditortoolbox.toolbox) {
          var $contents = $(editor.container.$).find('.cke_contents');
          var $frame = $contents.find('.cke_wysiwyg_frame');
          editor.plugins.ckeditortoolbox.toolbox.view.resize($frame, $contents);
        }
      });

      /**
       * Detach the toolbox when the content dom is being destroyed.
       */
      editor.on('contentDomUnload', function(evt) {
        Drupal.ckeditor_toolbox.manager.detach(editor);
        $(editor.container.$).find('.cke_contents').removeClass('ckeditor-toolbox-processed');
      });

      /**
       * Handle the paste event for a card item to build a proper widget.
       *
       * This generates the data that will be inserted into the editor.
       */
      editor.on('paste', function(evt) {
        var toolboxItemModel = evt.data.dataTransfer.getData('cke/toolbox-item');
        if (toolboxItemModel && editor.plugins.ckeditortoolbox.toolbox) {
          var markup = editor.plugins.ckeditortoolbox.toolbox.insert(toolboxItemModel);
          if (markup) {
            evt.data.dataValue = markup;
          }
          else {
            evt.cancel();
          }
        }
      });
    }
  });
  
})(jQuery, Drupal, CKEDITOR);
