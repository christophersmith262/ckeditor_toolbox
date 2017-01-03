
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
    return '<div class="ckeditor-toolbox-table">'
      +      '<a href="#" class="ckeditor-toolbox-table__cell ckeditor-toolbox-table__cell--bar"></a>'
      +      '<div class="ckeditor-toolbox-table__cell">'
      +        '<input type="text" placeholder="search..." value="" class="ckeditor-toolbox-search">'
      +        '<div class="ckeditor-toolbox-groups"></div>'
      +      '</div>'
      +    '</div>';
  }

  Drupal.theme.ckeditorToolboxToggle = function() {
    return '<span class="ckeditor-toolbox-toggle__icon ckeditor-toolbox-toggle__icon--active"></span>'
      +    '<span class="ckeditor-toolbox-toggle__text ckeditor-toolbox-toggle__text--active">Toolbox</span>';
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
