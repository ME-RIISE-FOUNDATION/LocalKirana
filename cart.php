<?php
require_once __DIR__ . '/includes/init.php';

$items = cart_items();
$total = cart_total_price();
$page_title = 'Your Cart · Local Kirana Connect';
require __DIR__ . '/partials/head.php';
?>
<div class="min-h-screen bg-gray-50">
  <header class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <a href="index.php" class="flex items-center gap-2">
        <i data-lucide="shopping-cart" class="w-8 h-8 text-green-600"></i>
        <h1 class="text-2xl font-bold text-green-600">Local Kirana Connect</h1>
      </a>
      <div class="flex items-center gap-3">
        <?php if (($me = current_user()) && ($me['role'] ?? '') === 'customer'): ?>
          <a href="profile.php" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Profile</a>
          <a href="orders.php" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">My Orders</a>
        <?php endif; ?>
        <a href="index.php" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">← Continue Shopping</a>
      </div>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 py-10">
    <h2 class="text-3xl font-bold mb-8">Your Cart</h2>

    <?php if (empty($items)): ?>
      <div class="bg-white rounded-lg shadow p-12 text-center">
        <i data-lucide="shopping-cart" class="w-16 h-16 text-gray-300 mx-auto mb-4"></i>
        <p class="text-gray-600 mb-6">Your cart is empty.</p>
        <a href="index.php#products" class="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">Browse Products</a>
      </div>
    <?php else: ?>
      <div class="bg-white rounded-lg shadow divide-y">
        <?php foreach ($items as $item): ?>
          <div class="flex items-center gap-4 p-4">
            <img src="<?= e($item['image']) ?>" alt="<?= e($item['name']) ?>" class="w-20 h-20 object-cover rounded-lg" />
            <div class="flex-1">
              <h3 class="font-semibold"><?= e($item['name']) ?></h3>
              <p class="text-sm text-gray-600"><?= e($item['vendor']) ?> · <?= e($item['unit']) ?></p>
              <p class="text-green-600 font-bold">₹<?= e($item['price']) ?></p>
            </div>
            <div class="flex items-center gap-2">
              <a href="cart-action.php?action=decrement&id=<?= e($item['id']) ?>" class="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50">−</a>
              <span class="w-8 text-center font-medium"><?= e($item['quantity']) ?></span>
              <a href="cart-action.php?action=increment&id=<?= e($item['id']) ?>" class="w-8 h-8 flex items-center justify-center border rounded-lg hover:bg-gray-50">+</a>
            </div>
            <div class="w-24 text-right font-semibold">₹<?= e($item['price'] * $item['quantity']) ?></div>
            <a href="cart-action.php?action=remove&id=<?= e($item['id']) ?>" class="text-red-500 hover:text-red-700"><i data-lucide="trash-2" class="w-5 h-5"></i></a>
          </div>
        <?php endforeach; ?>
      </div>

      <div class="flex items-center justify-between mt-6 bg-white rounded-lg shadow p-6">
        <div>
          <p class="text-gray-600">Total (<?= cart_total_items() ?> items)</p>
          <p class="text-3xl font-bold text-green-600">₹<?= e($total) ?></p>
        </div>
        <div class="flex gap-3">
          <a href="cart-action.php?action=clear" class="px-4 py-2 border rounded-lg hover:bg-gray-50">Clear Cart</a>
          <a href="checkout.php" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">Proceed to Checkout</a>
        </div>
      </div>
    <?php endif; ?>
  </main>
</div>
<?php require __DIR__ . '/partials/foot.php'; ?>
