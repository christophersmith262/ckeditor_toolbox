/**
 * @file
 * A Backbone model for representing paragraphs_editor commands.
 */

(function ($, Backbone, Drupal) {

  'use strict';

  Drupal.ckeditor_toolbox.ToolboxView = Backbone.View.extend({

    containerClass: 'ckeditor-toolbox',
    groupContainerSelector: '.ckeditor-toolbox-groups',
    heightTargetSelector: '.ckeditor-toolbox-table',
    showHideRegionSelector: 'div.ckeditor-toolbox-table__cell',

    initialize: function(options) {
      this._viewFactory = options.viewFactory;
      this._renderedGroups = {};
      this.listenTo(this.collection, 'add remove', this.renderGroups);
      this.stateModel = new Backbone.Model({
        'expanded': true,
      });
      this.listenTo(this.stateModel, 'change:expanded', this.renderExpanded);
    },

    events: {
      'keydown .ckeditor-search-toolbar': 'search',
    },

    template: function() {
      return Drupal.theme.ckeditorToolbox();
    },

    render: function() {
      if (!this.$el.hasClass(this.containerClass)) {
        this.$el.addClass(this.containerClass);
        this.$el.html(this.template());
        this.$groupsEl = this.$el.find(this.groupContainerSelector);
        this.toggleView = this._viewFactory.create('toggle', this.stateModel, this.$el.find('a'));
      }

      this.renderGroups();
      this.renderExpanded();

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

    renderExpanded: function(stateModel) {
      if (this.stateModel.get('expanded')) {
        this.expand();
      }
      else {
        this.collapse();
      }
    },

    expand: function() {
      this.$el.find(this.showHideRegionSelector).show(500);
    },

    collapse: function() {
      this.$el.find(this.showHideRegionSelector).hide(500);
    },

    search: function(query) {
      if (!query) {
      }
    },

    remove: function() {
      this.resetGroups();
      this.toggleView.remove();
      return Backbone.View.prototype.remove.call(this);
    },

    resize: function($measure, $target) {
      var $table = this.$el.find(this.heightTargetSelector);
      $table.css({'height': ''});
      this.$el.css({'height': ''});
      if ($measure.height() < $table.height()) {
        $target.css({ 'height': ($table.height() - 5) + 'px'});
        this.$el.css({ 'height': ($table.height() - 5) + 'px'});
      }
      else if ($table.height() < $measure.height()) {
        $table.css({ 'height': $target.height() + 'px'});
      }
    }

  });

}(jQuery, Backbone, Drupal));
