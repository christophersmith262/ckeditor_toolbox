<?php

namespace Drupal\ckeditor_toolbox\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\ckeditor\CKEditorPluginContextualInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "ckeditortoolbox" plugin.
 *
 * @CKEditorPlugin(
 *   id = "ckeditortoolbox",
 *   label = @Translation("Toolbox"),
 *   module = "ckeditor_toolbox"
 * )
 */
class CKEditorToolbox extends CKEditorPluginBase implements CKEditorPluginContextualInterface {

  /**
   * {@inheritdoc}
   */
  public function isEnabled(Editor $editor) {
    // If the module is enabled, the plugin should be enabled.
    return true;
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    return drupal_get_path('module', 'ckeditor_toolbox') . '/js/plugins/ckeditortoolbox/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return array(
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getButtons() {
    return array();
  }

  /**
   * {@inheritdoc}
   */
  function getLibraries(Editor $editor) {
    return array(
      'ckeditor_toolbox/toolbox',
    );
  }
}
