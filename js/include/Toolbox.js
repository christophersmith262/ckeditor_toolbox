/**
 * @file
 * CKEDITOR Lineutils Finder for Drop Locations.
 *
 * @ignore
 */
(function ($, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.Toolbox = function(editor, toolboxView, dragHandler) {
    this._editor = editor;
    this.view = toolboxView;
    this.dragHandler = dragHandler;
    editor.document.on('dragover', this._dragEnter, this);
    editor.document.on('dragleave', this._dragLeave, this);
  }

  $.extend(Drupal.ckeditor_toolbox.Toolbox.prototype, {

    destroy: function() {
      this._editor.document.removeListener('dragover', this._dragEnter);
      this._editor.document.removeListener('dragleave', this._dragLeave);
      this.view.remove();
    },

    insert: function(toolboxItemModel) {
    },

    _dragEnter: function(evt) {
      if (evt.data.$.dataTransfer.types.includes('cke/toolbox-item')) {
        this.dragHandler.enter(evt);
      }
    },

    _dragLeave: function(evt) {
      if (evt.data.$.dataTransfer.types.includes('cke/toolbox-item')) {
        this.dragHandler.leave(evt);
      }
    }
  });

})(jQuery, Drupal);
