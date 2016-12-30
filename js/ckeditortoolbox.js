
/**
 * @file
 * Provides Drupal API integrations for paragraphs_editor.
 */

(function ($, Drupal) {

  Drupal.behaviors.ckeditor_toolbox = {
    attach: function(context) {
      if (!Drupal.ckeditor_toolbox.manager) {
        Drupal.ckeditor_toolbox.manager = new Drupal.ckeditor_toolbox.ToolboxManager(Drupal.ckeditor_toolbox);
      }
    }
  };

  Drupal.theme.ckeditorToolbox = function() {
    return '<input type="text" placeholder="search..." value="" class="ckeditor-toolbox-search">'
      +    '<div class="ckeditor-toolbox-groups"></div>'
  }

  Drupal.theme.ckeditorToolboxGroup = function() {
    return '<h4 class="ckeditor-toolbox-header"></h4>'
      +    '<ul class="ckeditor-toolbox-cards"></ul>';
  }

  Drupal.theme.ckeditorToolboxCard = function(title) {
    return '<li class="ckeditor-toolbox-cards__card" draggable="true">' + title + '</li>';
  }

  /**
   * {@namespace}
   */
  Drupal.ckeditor_toolbox = {};

})(jQuery, Drupal);
