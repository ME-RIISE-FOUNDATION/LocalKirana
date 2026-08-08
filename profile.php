<?php
require_once __DIR__ . '/includes/init.php';

$user = require_role('customer');
$needsAddress = !profile_complete($user);

$brand = brand_name();
$page_title = 'My Profile · ' . $brand;
require __DIR__ . '/partials/head.php';
?>
<div class="min-h-screen bg-gray-50">
  <header class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-3xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-2">
      <a href="index.php" class="flex items-center gap-2 min-w-0 shrink">
        <i data-lucide="shopping-cart" class="w-7 h-7 md:w-8 md:h-8 text-green-600 shrink-0"></i>
        <h1 class="text-lg md:text-2xl font-bold text-green-600 truncate"><?= e($brand) ?></h1>
      </a>
      <div class="flex items-center gap-0.5 sm:gap-2 shrink-0 text-sm">
        <a href="index.php" class="px-2.5 md:px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Shop</a>
        <a href="orders.php" class="px-2.5 md:px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">My Orders</a>
        <a href="logout.php" class="px-2.5 md:px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Logout</a>
      </div>
    </div>
  </header>

  <main class="max-w-3xl mx-auto px-4 py-10">
    <h2 class="text-3xl font-bold mb-2">My Profile</h2>
    <p class="text-gray-600 mb-8">Your details and delivery address are used for your orders.</p>

    <?php if ($needsAddress): ?>
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
        <i data-lucide="map-pin" class="w-5 h-5 text-amber-600 mt-0.5"></i>
        <p class="text-sm text-amber-800">Please add your <strong>delivery address</strong> to complete your profile — it's required before you can place an order.</p>
      </div>
    <?php endif; ?>

    <form method="post" action="actions.php" class="bg-white rounded-xl border p-6 space-y-6">
      <input type="hidden" name="do" value="profile_save" />

      <div>
        <h3 class="font-semibold text-lg mb-4 flex items-center gap-2"><i data-lucide="user" class="w-5 h-5 text-green-600"></i>Personal details</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block text-sm font-medium mb-1">Full name</label><input name="name" required value="<?= e($user['name'] ?? '') ?>" class="w-full border rounded-lg px-3 py-2" /></div>
          <div><label class="block text-sm font-medium mb-1">Email</label><input value="<?= e($user['email'] ?? '') ?>" disabled class="w-full border rounded-lg px-3 py-2 bg-gray-50 text-gray-500" /></div>
          <div><label class="block text-sm font-medium mb-1">Phone</label><input name="phone" value="<?= e($user['phone'] ?? '') ?>" placeholder="+91 ..." class="w-full border rounded-lg px-3 py-2" /></div>
        </div>
      </div>

      <div class="pt-2 border-t">
        <h3 class="font-semibold text-lg mb-4 flex items-center gap-2"><i data-lucide="map-pin" class="w-5 h-5 text-green-600"></i>Delivery address</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2"><label class="block text-sm font-medium mb-1">Address (house / street / area)</label><textarea name="address" required rows="2" placeholder="e.g. A-101, Green Apartments, Main Market" class="w-full border rounded-lg px-3 py-2"><?= e($user['address'] ?? '') ?></textarea></div>
          <div><label class="block text-sm font-medium mb-1">City</label><input name="city" value="<?= e($user['city'] ?? '') ?>" placeholder="e.g. Delhi" class="w-full border rounded-lg px-3 py-2" /></div>
          <div><label class="block text-sm font-medium mb-1">Pincode</label><input name="pincode" value="<?= e($user['pincode'] ?? '') ?>" placeholder="e.g. 110001" class="w-full border rounded-lg px-3 py-2" /></div>
        </div>
      </div>

      <div class="flex gap-3 pt-2">
        <button class="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg">Save Profile</button>
        <a href="index.php" class="px-6 py-2.5 border rounded-lg hover:bg-gray-50">Back to shop</a>
      </div>
    </form>
  </main>
</div>
<?php require __DIR__ . '/partials/foot.php'; ?>
