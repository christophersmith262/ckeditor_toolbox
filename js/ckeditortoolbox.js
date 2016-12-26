
/**
 * @file
 * Provides Drupal API integrations for paragraphs_editor.
 */

(function ($, window, Drupal, drupalSettings) {

  Drupal.theme.ckeditorToolbox = function() {
    return '<h4 class="ckeditor-toolbox-header">Pattern Library</h4>'
      +      '<input type="text" value="search..." class="ckeditor-toolbox-search">'
      +      '<ul class="ckeditor-toolbox-cards">'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Image</li>'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Slideshow</li>'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Accordion</li>'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Hero Image</li>'
      +      '</ul>'
  }

  /**
   * {@namespace}
   */
  Drupal.ckeditor_toolbox = {};

})(jQuery, window, Drupal, drupalSettings);
