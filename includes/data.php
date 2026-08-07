<?php
// Configuration (not demo data): the product category taxonomy used by the
// add/edit product forms and the customer category filters.

$CATEGORIES = [
  ['id' => 1, 'name' => 'Groceries',  'icon' => '🛒'],
  ['id' => 2, 'name' => 'Vegetables', 'icon' => '🥕'],
  ['id' => 3, 'name' => 'Fruits',     'icon' => '🍎'],
  ['id' => 4, 'name' => 'Dairy',      'icon' => '🥛'],
  ['id' => 5, 'name' => 'Beverages',  'icon' => '☕'],
  ['id' => 6, 'name' => 'Snacks',     'icon' => '🍿'],
];

/** Category names, for <select> dropdowns. */
function category_names(): array {
  global $CATEGORIES;
  return array_column($CATEGORIES, 'name');
}
