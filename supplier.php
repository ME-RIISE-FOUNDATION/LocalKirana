<?php
require_once __DIR__ . '/includes/init.php';
require_once __DIR__ . '/includes/dashboard.php';

$user = require_role('supplier');
$tab  = $_GET['tab'] ?? 'dashboard';

$myEmail     = $user['email'] ?? '';
$myProducts  = array_values(array_filter(supplier_products(), fn($p) => ($p['supplier'] ?? '') === $myEmail));
$requests    = supplier_requests(); // populated only by real vendor requests
$vendorList  = vendors_list();

$editProduct = isset($_GET['edit']) ? find_by_id($myProducts, (int) $_GET['edit']) : null;
$showForm    = isset($_GET['new']) || $editProduct;

$statusFilter = $_GET['status'] ?? 'All';
$shownReqs = $statusFilter === 'All' ? $requests : array_values(array_filter($requests, fn($r) => $r['status'] === $statusFilter));
$pendingReq = count(array_filter($requests, fn($r) => $r['status'] === 'Pending'));
$CATS = category_names();

$notifList = [];
if ($pendingReq) $notifList[] = [$pendingReq . ' pending request' . ($pendingReq > 1 ? 's' : ''), 'Awaiting your action'];

function req_badge(string $status): string {
  $map = ['Approved' => 'bg-green-100 text-green-700', 'Rejected' => 'bg-red-100 text-red-700', 'Pending' => 'bg-gray-100 text-gray-700'];
  return '<span class="text-xs font-medium px-2 py-1 rounded-full ' . ($map[$status] ?? 'bg-gray-100 text-gray-700') . '">' . e($status) . '</span>';
}

$shell = [
  'panelTitle' => 'Supplier Panel', 'panelSubtitle' => $user['name'], 'baseUrl' => 'supplier.php',
  'activeTab' => $tab, 'headerSubtitle' => 'Manage your supply operations', 'roleLabel' => 'Supplier',
  'userName' => $user['name'], 'notifList' => $notifList,
  'nav' => [
    ['id' => 'dashboard', 'icon' => 'layout-dashboard', 'label' => 'Dashboard'],
    ['id' => 'products',  'icon' => 'package',          'label' => 'Products'],
    ['id' => 'orders',    'icon' => 'shopping-cart',    'label' => 'Requests', 'badge' => $pendingReq ? (string) $pendingReq : null],
    ['id' => 'vendors',   'icon' => 'trending-up',      'label' => 'Vendors'],
  ],
];

$page_title = 'Supplier Dashboard · Local Kirana Connect';
require __DIR__ . '/partials/head.php';
render_dashboard_start($shell);
?>

<?php if ($tab === 'dashboard'): ?>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <?php
      stat_card((string) count($myProducts), 'Catalog Products', 'package', 'bg-green-100', 'text-green-600');
      stat_card((string) count($requests), 'Total Requests', 'shopping-cart', 'bg-blue-100', 'text-blue-600');
      stat_card((string) $pendingReq, 'Pending Requests', 'truck', 'bg-orange-100', 'text-orange-600');
      stat_card((string) count($vendorList), 'Vendors on Platform', 'trending-up', 'bg-purple-100', 'text-purple-600');
      ?>
    </div>

    <div class="bg-white rounded-xl border p-6">
      <h3 class="font-bold text-lg mb-4">Catalog Stock</h3>
      <?php if ($myProducts): ?>
        <?php render_chart('supStock', 'bar', ['data' => ['labels' => array_column($myProducts, 'name'), 'datasets' => [['label' => 'Stock', 'data' => array_map('intval', array_column($myProducts, 'stock')), 'backgroundColor' => '#16a34a']]], 'options' => ['plugins' => ['legend' => ['display' => false]], 'maintainAspectRatio' => false]], 280); ?>
      <?php else: empty_state('Your catalog is empty — add products you supply.', 'package', 'supplier.php?tab=products&new=1', 'Add Product'); endif; ?>
    </div>

    <div class="bg-white rounded-xl border p-6 overflow-x-auto">
      <h3 class="font-bold text-lg mb-4">Recent Vendor Requests</h3>
      <?php if ($requests): ?>
        <table class="w-full text-sm">
          <thead><tr class="text-left text-gray-500 border-b"><th class="py-2 pr-4">Vendor</th><th class="py-2 pr-4">Product</th><th class="py-2 pr-4">Quantity</th><th class="py-2 pr-4">Amount</th><th class="py-2 pr-4">Status</th><th class="py-2">Actions</th></tr></thead>
          <tbody>
            <?php foreach ($requests as $r): ?>
              <tr class="border-b last:border-0">
                <td class="py-3 pr-4 font-medium"><?= e($r['vendor']) ?></td><td class="py-3 pr-4"><?= e($r['product']) ?></td><td class="py-3 pr-4"><?= e($r['quantity']) ?> units</td><td class="py-3 pr-4">₹<?= e($r['amount']) ?></td><td class="py-3 pr-4"><?= req_badge($r['status']) ?></td>
                <td class="py-3"><?php if ($r['status'] === 'Pending'): ?><div class="flex gap-2">
                  <form method="post" action="actions.php"><input type="hidden" name="do" value="supplier_request" /><input type="hidden" name="id" value="<?= e($r['id']) ?>" /><input type="hidden" name="status" value="Approved" /><button class="border rounded-lg h-8 w-8 flex items-center justify-center hover:bg-green-50"><i data-lucide="check-circle" class="w-4 h-4 text-green-600"></i></button></form>
                  <form method="post" action="actions.php"><input type="hidden" name="do" value="supplier_request" /><input type="hidden" name="id" value="<?= e($r['id']) ?>" /><input type="hidden" name="status" value="Rejected" /><button class="border rounded-lg h-8 w-8 flex items-center justify-center hover:bg-red-50"><i data-lucide="x-circle" class="w-4 h-4 text-red-600"></i></button></form>
                </div><?php else: ?><span class="text-xs text-gray-400">—</span><?php endif; ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php else: empty_state('No vendor requests yet.', 'shopping-cart'); endif; ?>
    </div>
  </div>

<?php elseif ($tab === 'products'): ?>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-bold">Your Products Catalog</h3>
      <a href="supplier.php?tab=products&new=1" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"><i data-lucide="plus" class="w-4 h-4"></i>Add Product</a>
    </div>

    <?php if ($showForm): ?>
      <div class="bg-white rounded-xl border p-6">
        <h3 class="font-bold text-lg mb-4"><?= $editProduct ? 'Edit Product' : 'Add Product' ?></h3>
        <form method="post" action="actions.php" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="hidden" name="do" value="<?= $editProduct ? 'sup_product_update' : 'sup_product_add' ?>" />
          <?php if ($editProduct): ?><input type="hidden" name="id" value="<?= e($editProduct['id']) ?>" /><?php endif; ?>
          <div><label class="block text-sm font-medium mb-1">Name</label><input name="name" required value="<?= e($editProduct['name'] ?? '') ?>" class="w-full border rounded-lg px-3 py-2" /></div>
          <div><label class="block text-sm font-medium mb-1">Category</label><select name="category" class="w-full border rounded-lg px-3 py-2"><?php foreach ($CATS as $c): ?><option <?= ($editProduct['category'] ?? '') === $c ? 'selected' : '' ?>><?= e($c) ?></option><?php endforeach; ?></select></div>
          <div><label class="block text-sm font-medium mb-1">Price (₹/unit)</label><input name="price" type="number" min="0" required value="<?= e($editProduct['price'] ?? '') ?>" class="w-full border rounded-lg px-3 py-2" /></div>
          <div><label class="block text-sm font-medium mb-1">Stock</label><input name="stock" type="number" min="0" required value="<?= e($editProduct['stock'] ?? '') ?>" class="w-full border rounded-lg px-3 py-2" /></div>
          <div class="md:col-span-2 flex gap-3"><button class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"><?= $editProduct ? 'Save Changes' : 'Add Product' ?></button><a href="supplier.php?tab=products" class="px-5 py-2 border rounded-lg hover:bg-gray-50">Cancel</a></div>
        </form>
      </div>
    <?php endif; ?>

    <?php if ($myProducts): ?>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <?php foreach ($myProducts as $p): ?>
          <div class="bg-white rounded-xl border p-4">
            <div class="flex items-start justify-between mb-3">
              <div><h3 class="font-bold"><?= e($p['name']) ?></h3><p class="text-sm text-gray-600"><?= e($p['category']) ?></p></div>
              <span class="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700"><?= e($p['stock']) ?> units</span>
            </div>
            <div class="flex items-center justify-between mt-4">
              <span class="text-xl font-bold text-green-600">₹<?= e($p['price']) ?>/unit</span>
              <div class="flex gap-2">
                <a href="supplier.php?tab=products&edit=<?= e($p['id']) ?>" class="text-sm border rounded-lg px-3 py-1.5 hover:bg-gray-50">Edit</a>
                <form method="post" action="actions.php" data-confirm="Delete &quot;<?= e($p['name']) ?>&quot;?"><input type="hidden" name="do" value="sup_product_delete" /><input type="hidden" name="id" value="<?= e($p['id']) ?>" /><button class="text-sm border rounded-lg px-3 py-1.5 hover:bg-red-50 text-red-600 border-red-200">Del</button></form>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php elseif (!$showForm): empty_state('Your catalog is empty.', 'package', 'supplier.php?tab=products&new=1', 'Add your first product'); endif; ?>
  </div>

<?php elseif ($tab === 'orders'): ?>
  <div class="bg-white rounded-xl border p-6 overflow-x-auto">
    <div class="flex gap-2 mb-6 flex-wrap">
      <?php foreach (['All', 'Pending', 'Approved', 'Rejected'] as $s): ?>
        <a href="supplier.php?tab=orders&status=<?= urlencode($s) ?>" class="text-sm border rounded-lg px-3 py-1.5 <?= $statusFilter === $s ? 'bg-green-50 text-green-600 border-green-200' : 'hover:bg-gray-50' ?>"><?= e($s) ?></a>
      <?php endforeach; ?>
    </div>
    <?php if ($shownReqs): ?>
      <table class="w-full text-sm">
        <thead><tr class="text-left text-gray-500 border-b"><th class="py-2 pr-4">Request ID</th><th class="py-2 pr-4">Vendor</th><th class="py-2 pr-4">Product</th><th class="py-2 pr-4">Quantity</th><th class="py-2 pr-4">Amount</th><th class="py-2 pr-4">Status</th><th class="py-2">Actions</th></tr></thead>
        <tbody>
          <?php foreach ($shownReqs as $r): ?>
            <tr class="border-b last:border-0">
              <td class="py-3 pr-4 font-medium">#REQ<?= str_pad((string) $r['id'], 3, '0', STR_PAD_LEFT) ?></td><td class="py-3 pr-4"><?= e($r['vendor']) ?></td><td class="py-3 pr-4"><?= e($r['product']) ?></td><td class="py-3 pr-4"><?= e($r['quantity']) ?> units</td><td class="py-3 pr-4 font-semibold">₹<?= e($r['amount']) ?></td><td class="py-3 pr-4"><?= req_badge($r['status']) ?></td>
              <td class="py-3"><?php if ($r['status'] === 'Pending'): ?><div class="flex gap-2">
                <form method="post" action="actions.php"><input type="hidden" name="do" value="supplier_request" /><input type="hidden" name="id" value="<?= e($r['id']) ?>" /><input type="hidden" name="status" value="Approved" /><input type="hidden" name="redirect" value="supplier.php?tab=orders" /><button class="text-xs border rounded-lg px-2 py-1 hover:bg-green-50 text-green-600">Approve</button></form>
                <form method="post" action="actions.php"><input type="hidden" name="do" value="supplier_request" /><input type="hidden" name="id" value="<?= e($r['id']) ?>" /><input type="hidden" name="status" value="Rejected" /><input type="hidden" name="redirect" value="supplier.php?tab=orders" /><button class="text-xs border rounded-lg px-2 py-1 hover:bg-red-50 text-red-600">Reject</button></form>
              </div><?php else: ?><span class="text-xs text-gray-400">Done</span><?php endif; ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php else: empty_state($statusFilter === 'All' ? 'No vendor requests yet.' : 'No ' . $statusFilter . ' requests.', 'shopping-cart'); endif; ?>
  </div>

<?php else: /* vendors */ ?>
  <div class="bg-white rounded-xl border p-6">
    <h3 class="font-bold text-lg mb-4">Vendors on the Platform</h3>
    <?php if ($vendorList): ?>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <?php foreach ($vendorList as $v): ?>
          <div class="bg-white rounded-xl border p-4">
            <div class="flex items-start justify-between mb-3"><div><h3 class="font-bold"><?= e($v['name']) ?></h3><p class="text-sm text-gray-600"><?= e($v['owner']) ?></p></div><span class="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">Active</span></div>
            <div class="pt-3 border-t text-sm text-gray-600"><?= e($v['city'] ?: '—') ?> · <?= e($v['phone'] ?: '—') ?></div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php else: empty_state('No vendors on the platform yet.', 'store'); endif; ?>
  </div>
<?php endif; ?>

<?php
render_dashboard_end();
require __DIR__ . '/partials/foot.php';
