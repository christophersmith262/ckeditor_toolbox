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

      var dropTargetTracker;

      /**
       * Attach the toolbox when the content dom is ready.
       */
      editor.on('contentDom', function(evt) {
        var view = new Drupal.ckeditor_toolbox.ToolboxView();
        var $container = $(editor.container.$);
        var $contents = $container.find('.cke_contents');

        var finder = new Drupal.ckeditor_toolbox.DropTargetFinder(editor);
        dropTargetTracker = new Drupal.ckeditor_toolbox.DropTargetTracker(finder, editor.widgets.locator, editor.widgets.liner);

        // Attach the toolbox if it has not already been attached.
        if (!$contents.hasClass('ckeditor-toolbox-processed')) {
          $contents.addClass('ckeditor-toolbox-processed').after(view.$el);

          // Make sure the editable region is at least as tall as the toolbox,
          // otherwise things will look out of whack.
          var $frame = $contents.find('.cke_wysiwyg_frame');
          if ($frame.height() < view.$el.height()) {
            $frame.css({ 'min-height': view.$el.height() + 'px'});
          }

          var viewEl = new CKEDITOR.dom.element(view.el);

          // Attach the DnD handler to decorate drag event data.
          viewEl.on('dragstart', function(evt) {
            var target = evt.data.getTarget();
            var toolboxItemModel = {};

            // Attach the card model to the event data using the clipboard
            // facade.
            CKEDITOR.plugins.clipboard.initDragDataTransfer(evt);
            var dataTransfer = evt.data.dataTransfer;
            dataTransfer.setData('cke/toolbox-item', toolboxItemModel);
            dataTransfer.setData('text/html', target.getText());

            // Focus the editor to show the carot.
            editor.focus();

            dropTargetTracker.startTracking();
          });

          // Attach the DnD handler to handle cleaning up after a drag
          // operation.
          viewEl.on('dragend', function(evt) {
            dropTargetTracker.stopTracking();

            // We can't always rely on the iframe to generate a drop event, so
            // we manually fire it whenever the user stops dragging.
            var dropRange = dropTargetTracker.getTargetRange();
            if (dropRange) {
              editor.fire('drop', {
                dropRange: dropRange,
                target: dropRange.startContainer,
              });
            }
          });
        }

        /**
         * Handle drag events for cards.
         *
         * This handles when a card is dragged from the toolbox over the
         * editor by drawing the same lineutils marker that the core widget
         * plugin uses.
         */
        editor.document.on('dragover', function(evt) {
          if (evt.data.$.dataTransfer.types.includes('cke/toolbox-item')) {
            dropTargetTracker.updateTarget(evt.data.$.clientY);
          }
        });
      });

      /**
       * Handle the paste event for a card item to build a proper widget.
       *
       * This generates the data that will be inserted into the editor.
       */
      editor.on('paste', function(evt) {
        var toolboxItemModel = evt.data.dataTransfer.getData('cke/toolbox-item');
        if (toolboxItemModel) {
          evt.data.dataValue = '!insert-component-here!';
        }
      });
    }
  });
  
})(jQuery, Drupal, CKEDITOR);
