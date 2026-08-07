<?php
require_once __DIR__ . '/includes/init.php';

$action = $_POST['action'] ?? $_GET['action'] ?? '';
$id = (int) ($_POST['id'] ?? $_GET['id'] ?? 0);

switch ($action) {
  case 'add':
    foreach (products() as $p) {
      if ((int) $p['id'] === $id) {
        cart_add([
          'id'     => $p['id'],
          'name'   => $p['name'],
          'price'  => $p['price'],
          'image'  => $p['image'],
          'vendor' => $p['vendor'],
          'unit'   => $p['unit'],
        ]);
        set_flash($p['name'] . ' added to cart.');
        break;
      }
    }
    break;
  case 'increment':
    $items = cart_items();
    if (isset($items[$id])) cart_set_quantity($id, $items[$id]['quantity'] + 1);
    break;
  case 'decrement':
    $items = cart_items();
    if (isset($items[$id])) cart_set_quantity($id, $items[$id]['quantity'] - 1);
    break;
  case 'remove':
    cart_remove($id);
    set_flash('Item removed from cart.', 'error');
    break;
  case 'clear':
    cart_clear();
    set_flash('Cart cleared.', 'error');
    break;
}

// Return to wherever the request came from (default: cart for edits, home for adds).
$back = $_POST['redirect'] ?? $_GET['redirect'] ?? ($action === 'add' ? 'index.php#products' : 'cart.php');
header('Location: ' . $back);
exit;
