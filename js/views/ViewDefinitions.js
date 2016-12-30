
  Drupal.ckeditor_toolbox.ViewDefinitions = {
    'toolbox': {
      dataType: 'collection',
      prototype: Drupal.ckeditor_toolbox.ToolboxView,
      insertType: 'after',
    },
    'group': {
      dataType: 'model',
      prototype: Drupal.ckeditor_toolbox.ToolboxCardGroupView,
      insertType: 'append',
    },
    'card': {
      dataType: 'model',
      prototype: Drupal.ckeditor_toolbox.ToolboxCardView,
      insertType: 'append',
    },
  }

