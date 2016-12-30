/**
 * @file
 * CKEDITOR Lineutils Finder for Drop Locations.
 *
 * @ignore
 */
(function ($, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.ViewFactory = function(viewDefs) {
    this._viewDefs = viewDefs;
    this._options = {};
  }

  $.extend(Drupal.ckeditor_toolbox.ViewFactory.prototype, {
    create: function(viewName, data, $containerEl) {
      if (this._viewDefs[viewName]) {
        var viewDef = this._viewDefs[viewName];
        var options = $.extend({
          viewFactory: this,
        }, this._options);

        if (viewDef.insertType == 'replace') {
          options.el = $containerEl.get(0);
        }

        if (viewDef.dataType == 'collection') {
          options.collection = data;
        }
        else {
          options.model = data;
        }

        var view = new viewDef.prototype(options);
        if (viewDef.insertType && viewDef.insertType !== 'replace') {
          $containerEl[viewDef.insertType](view.$el);
        }

        view.render();

        return view;
      }
    },

    addOptions: function(options) {
      $.extend(this._options, options);
    }
  });

})(jQuery, Drupal);
