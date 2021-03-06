/**
 * @file
 * CKEDITOR Lineutils Finder for Drop Locations.
 *
 * @ignore
 */
(function ($, Drupal, Backbone) {

  'use strict';

  Drupal.ckeditor_toolbox.ToolboxManager = function(prototypes) {
    this._types = {};
    this._prototypes = prototypes;
  }

  $.extend(Drupal.ckeditor_toolbox.ToolboxManager.prototype, {

    attach: function(editor) {
      this.detach(editor);
 
      // Attach the toolbox if it has not already been attached.
      var viewFactory = new Drupal.ckeditor_toolbox.ViewFactory(this._prototypes.ViewDefinitions);

      var toolboxGroupCollection = new Drupal.ckeditor_toolbox.ToolboxGroupCollection([
        {
          id: "components",
          title: Drupal.t('Components'),
          items: [
            {
              id: "paragraph:tabs",
              type: "paragraph",
              bundle: "tabs",
              title: "Tabs"
            },
            {
              id: "paragraph:sometype",
              type: "paragraph",
              bundle: "sometype",
              title: "User Reference"
            }
          ]
        },
        {
          id: "layout",
          title: Drupal.t('Layout'),
          items: [
            {
              id: "toolbox-widget:grid",
              title: "Grid"
            },
            {
              id: "toolbox-widget:row",
              title: "Row"
            },
            {
              id: "toolbox-widget:col",
              title: "Column"
            }
          ]
        },
      ]);

      var dropTargetTracker = new this._prototypes.DropTargetTracker(editor.widgets.finder, editor.widgets.locator, editor.widgets.liner);
      var dragHandler = new this._prototypes.DragHandler(editor, editor.widgets.finder, dropTargetTracker);
      viewFactory.addOptions({
        dragHandler: dragHandler,
      });
      var $contents = $(editor.container.$).find('.cke_contents');
      var view = viewFactory.create('toolbox', toolboxGroupCollection, $contents.addClass('ckeditor-toolbox-processed'));
      editor.plugins.ckeditortoolbox.toolbox = new this._prototypes.Toolbox(editor, this._types, view, dragHandler);

      return editor.plugins.ckeditortoolbox.toolbox;
    },

    detach: function(editor) {
      if (editor.plugins.ckeditortoolbox.toolbox) {
        editor.plugins.ckeditortoolbox.toolbox.destroy();
        delete editor.plugins.ckeditortoolbox.toolbox;
      }
    },

    registerType: function(typeName, definition) {
      this._types[typeName] = definition;
    }
  });

})(jQuery, Drupal, Backbone);
