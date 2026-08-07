<?php
require_once __DIR__ . '/includes/init.php';

$search = trim($_GET['q'] ?? '');
$allProducts = products();
$allVendors  = vendors_list();
$filteredProducts = array_values(array_filter($allProducts, function ($p) use ($search) {
  if ($search === '') return true;
  $needle = mb_strtolower($search);
  return str_contains(mb_strtolower($p['name']), $needle) || str_contains(mb_strtolower($p['category']), $needle);
}));

$me = current_user();
$cartCount = cart_total_items();
$brand = brand_name();
$page_title = $brand;
require __DIR__ . '/partials/head.php';
?>
<div class="min-h-screen bg-gray-50">
  <!-- Header -->
  <header class="bg-white border-b sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <a href="index.php" class="flex items-center gap-2">
          <i data-lucide="shopping-cart" class="w-8 h-8 text-green-600"></i>
          <h1 class="text-2xl font-bold text-green-600"><?= e($brand) ?></h1>
        </a>
        <div class="flex items-center gap-4">
          <a href="index.php#stores" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Stores</a>
          <?php if ($me): ?>
            <span class="text-sm text-gray-600 hidden sm:inline">Hi, <?= e($me['name']) ?></span>
            <?php if (($me['role'] ?? '') === 'customer'): ?>
              <a href="orders.php" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">My Orders</a>
              <a href="profile.php" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Profile</a>
            <?php else: ?>
              <a href="<?= e(dashboard_for($me['role'])) ?>" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Dashboard</a>
            <?php endif; ?>
            <a href="logout.php" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Logout</a>
          <?php else: ?>
            <a href="login.php" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Login</a>
            <a href="login.php?mode=signup" class="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">Sign Up</a>
          <?php endif; ?>
          <a href="cart.php" class="relative inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            <i data-lucide="shopping-cart" class="w-5 h-5 mr-2"></i>Cart
            <?php if ($cartCount > 0): ?><span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"><?= $cartCount ?></span><?php endif; ?>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- Hero -->
  <section class="bg-gradient-to-r from-green-600 to-green-500 text-white py-16">
    <div class="max-w-7xl mx-auto px-4">
      <div class="max-w-2xl">
        <h2 class="text-5xl font-bold mb-4">Your Local Kirana,<br />Now Online</h2>
        <p class="text-xl mb-8 text-green-50"><?= e(brand_tagline()) ?></p>
        <form action="index.php" method="get" class="flex items-center gap-2 bg-white rounded-lg p-2">
          <i data-lucide="search" class="w-5 h-5 text-gray-400 ml-2"></i>
          <input name="q" value="<?= e($search) ?>" placeholder="Search products or categories..." class="flex-1 border-0 outline-none text-gray-900 px-2 py-2" />
          <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">Search</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <?php foreach ([['package', 'Local Selection', 'Products from your neighborhood stores'], ['truck', 'Quick Delivery', 'Delivered from nearby vendors'], ['shield', 'Safe & Secure', 'Secure checkout'], ['star', 'Fresh Quality', 'Sourced from local kirana stores']] as $f): ?>
          <div class="text-center p-6"><i data-lucide="<?= $f[0] ?>" class="w-12 h-12 text-green-600 mx-auto mb-4"></i><h3 class="font-semibold text-lg mb-2"><?= e($f[1]) ?></h3><p class="text-gray-600 text-sm"><?= e($f[2]) ?></p></div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- Nearby Stores -->
  <section id="stores" class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8">Stores Near You</h2>
      <?php if ($allVendors): ?>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <?php foreach ($allVendors as $vendor): ?>
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <img src="<?= e($vendor['image']) ?>" alt="<?= e($vendor['name']) ?>" class="w-full h-48 object-cover rounded-t-lg" />
              <div class="p-6">
                <div class="flex items-center justify-between mb-2"><h3 class="font-bold text-lg"><?= e($vendor['name']) ?></h3><?php if ($vendor['verified']): ?><span class="text-green-600 text-xs">✓ Verified</span><?php endif; ?></div>
                <p class="text-gray-600 text-sm mb-3"><?= e($vendor['address'] ?: $vendor['city'] ?: 'Local store') ?></p>
                <a href="index.php#products" class="block text-center w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">View Products</a>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <div class="bg-white rounded-lg border p-10 text-center">
          <i data-lucide="store" class="w-12 h-12 text-gray-300 mx-auto mb-3"></i>
          <p class="text-gray-500">No stores yet. Vendors who sign up will appear here.</p>
          <a href="login.php?role=vendor&mode=signup" class="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">Register your store</a>
        </div>
      <?php endif; ?>
    </div>
  </section>

  <!-- Products -->
  <section id="products" class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 class="text-3xl font-bold">Products</h2>
        <form action="index.php" method="get" class="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 w-80">
          <i data-lucide="search" class="w-5 h-5 text-gray-400"></i>
          <input name="q" value="<?= e($search) ?>" placeholder="Search products..." class="flex-1 border-0 bg-transparent outline-none" />
        </form>
      </div>
      <?php if ($filteredProducts): ?>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <?php foreach ($filteredProducts as $product): ?>
            <div class="bg-white border rounded-lg hover:shadow-lg transition-shadow">
              <img src="<?= e($product['image']) ?>" alt="<?= e($product['name']) ?>" class="w-full h-48 object-cover rounded-t-lg" />
              <div class="p-4">
                <h3 class="font-semibold mb-1"><?= e($product['name']) ?></h3>
                <p class="text-gray-600 text-sm mb-2"><?= e($product['vendor'] ?: 'Local store') ?></p>
                <div class="flex items-center justify-between mb-3"><span class="text-xl font-bold text-green-600">₹<?= e($product['price']) ?></span><span class="text-sm text-gray-500"><?= e($product['unit']) ?></span></div>
                <p class="text-sm text-gray-500 mb-3"><?= e($product['stock']) ?> in stock</p>
                <form action="cart-action.php" method="post"><input type="hidden" name="action" value="add" /><input type="hidden" name="id" value="<?= e($product['id']) ?>" /><button class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">Add to Cart</button></form>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php else: ?>
        <div class="bg-gray-50 rounded-lg border p-10 text-center">
          <i data-lucide="package" class="w-12 h-12 text-gray-300 mx-auto mb-3"></i>
          <p class="text-gray-500"><?= $search ? 'No products match "' . e($search) . '".' : 'No products listed yet. Vendors add products from their dashboard.' ?></p>
        </div>
      <?php endif; ?>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div><h3 class="font-bold text-lg mb-4"><?= e($brand) ?></h3><p class="text-gray-400 text-sm">Connecting local stores with customers for a better shopping experience.</p></div>
        <div><h4 class="font-semibold mb-4">Quick Links</h4><ul class="space-y-2 text-sm text-gray-400"><li>About Us</li><li>Contact</li><li>Careers</li></ul></div>
        <div><h4 class="font-semibold mb-4">For Business</h4><ul class="space-y-2 text-sm text-gray-400"><li><a href="login.php?role=vendor&mode=signup" class="hover:text-white">Register as Vendor</a></li><li><a href="login.php?role=supplier&mode=signup" class="hover:text-white">Become a Supplier</a></li><li><a href="login.php?role=delivery&mode=signup" class="hover:text-white">Delivery Partner</a></li></ul></div>
        <div><h4 class="font-semibold mb-4">Support</h4><ul class="space-y-2 text-sm text-gray-400"><li>Help Center</li><li>Privacy Policy</li><li>Terms &amp; Conditions</li></ul></div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">© 2026 Local Kirana Connect. All rights reserved.</div>
    </div>
  </footer>
</div>
<?php require __DIR__ . '/partials/foot.php'; ?>
