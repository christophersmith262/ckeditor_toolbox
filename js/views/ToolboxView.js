/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

(function ($, Backbone, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.ToolboxView = Backbone.View.extend({

    initialize: function(options) {
      this._viewFactory = options.viewFactory;
      this._renderedGroups = {};
      this.listenTo(this.collection, 'add remove', this.renderGroups);
    },

    events: {
      'keydown .ckeditor-search-toolbar': 'search',
    },

    template: function() {
      return Drupal.theme.ckeditorToolbox();
    },

    render: function() {
      if (!this.$el.hasClass('ckeditor-toolbox')) {
        this.$el.addClass('ckeditor-toolbox');
        this.$el.html(this.template());
        this.$groupsEl = this.$el.find('.ckeditor-toolbox-groups');
      }

      this.renderGroups();

      return this;
    },

    resetGroups: function() {
      for (var i in this._renderedGroups) {
        this._renderedGroups[i].remove();
      }
      this._renderedGroups = {};
      return this;
    },

    renderGroups: function() {
      var view = this;
      this.resetGroups();
      this.collection.each(function(toolboxGroupModel) {
        view.renderGroup(toolboxGroupModel);
      });
      return this;
    },

    renderGroup: function(toolboxGroupModel) {
      var view = this._viewFactory.create('group', toolboxGroupModel, this.$groupsEl);
      if (view) {
        this._renderedGroups[toolboxGroupModel.get('id')] = view;
      }
      return this;
    },

    search: function(query) {
      if (!query) {
        query = this.$el.find('.ckeditor-search-toolbar').attr('value');
      }
    },

    remove: function() {
      this.resetGroups();
      return Backbone.View.prototype.remove.call(this);
    }

  });

}(jQuery, Backbone, Drupal));
