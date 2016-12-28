
/**
 * @file
 * Provides Drupal API integrations for paragraphs_editor.
 */

(function ($, window, Drupal, drupalSettings) {

  Drupal.theme.ckeditorToolbox = function() {
    return ''
      +      '<input type="text" placeholder="search..." value="" class="ckeditor-toolbox-search">'
      +      '<h4 class="ckeditor-toolbox-header">Components</h4>'
      +      '<ul class="ckeditor-toolbox-cards">'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Image</li>'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Slideshow</li>'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Accordion</li>'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Hero Image</li>'
      +      '</ul>'
      +      '<h4 class="ckeditor-toolbox-header">Layout</h4>'
      +      '<ul class="ckeditor-toolbox-cards">'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Grid</li>'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Row</li>'
      +        '<li class="ckeditor-toolbox-cards__card" draggable="true">Column</li>'
      +      '</ul>';
  }

  /**
   * {@namespace}
   */
  Drupal.ckeditor_toolbox = {};

})(jQuery, window, Drupal, drupalSettings);
