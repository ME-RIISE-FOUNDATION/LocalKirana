<?php
// Shared chrome (sidebar + top bar) for the role dashboards.
// Usage:
//   $shell = [
//     'panelTitle'    => 'Sharma Kirana Store',
//     'panelSubtitle' => 'Rajesh Sharma',
//     'baseUrl'       => 'vendor.php',
//     'activeTab'     => 'dashboard',
//     'headerSubtitle'=> 'Manage your store operations',
//     'roleLabel'     => 'Vendor',
//     'userName'      => 'Rajesh Sharma',
//     'notifications' => 3,
//     'nav'           => [ ['id'=>'dashboard','icon'=>'layout-dashboard','label'=>'Dashboard','badge'=>null], ... ],
//   ];
//   render_dashboard_start($shell); ...content... ; render_dashboard_end();

function render_dashboard_start(array $shell): void {
  $active = $shell['activeTab'];
  ?>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r flex flex-col">
      <div class="p-6 border-b">
        <h2 class="font-bold text-xl text-green-600"><?= e($shell['panelTitle']) ?></h2>
        <p class="text-sm text-gray-600"><?= e($shell['panelSubtitle']) ?></p>
      </div>
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <?php foreach ($shell['nav'] as $item): ?>
            <li>
              <a href="<?= e($shell['baseUrl']) ?>?tab=<?= e($item['id']) ?>"
                 class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors <?= $active === $item['id'] ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50' ?>">
                <i data-lucide="<?= e($item['icon']) ?>" class="w-5 h-5"></i>
                <span class="font-medium flex-1 text-left"><?= e($item['label']) ?></span>
                <?php if (!empty($item['badge'])): ?>
                  <span class="bg-red-500 text-white text-xs rounded-full px-2 py-0.5"><?= e($item['badge']) ?></span>
                <?php endif; ?>
              </a>
            </li>
          <?php endforeach; ?>
        </ul>
      </nav>
      <div class="p-4 border-t">
        <a href="logout.php" class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
          <i data-lucide="log-out" class="w-5 h-5"></i><span>Logout</span>
        </a>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="bg-white border-b px-8 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900"><?= e(ucfirst($active)) ?></h1>
          <p class="text-sm text-gray-600"><?= e($shell['headerSubtitle']) ?></p>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <button data-bell type="button" class="relative border rounded-lg p-2 hover:bg-gray-50">
              <i data-lucide="bell" class="w-5 h-5"></i>
              <?php $notifs = $shell['notifList'] ?? []; ?>
              <?php if ($notifs): ?><span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"><?= count($notifs) ?></span><?php endif; ?>
            </button>
            <div id="notif-panel" class="hidden absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-xl z-50">
              <div class="px-4 py-3 border-b font-semibold text-sm">Notifications</div>
              <ul class="max-h-80 overflow-auto divide-y">
                <?php foreach ($notifs as $n): ?>
                  <li class="px-4 py-3 hover:bg-gray-50"><p class="text-sm font-medium"><?= e($n[0]) ?></p><p class="text-xs text-gray-500"><?= e($n[1]) ?></p></li>
                <?php endforeach; ?>
                <?php if (!$notifs): ?><li class="px-4 py-6 text-center text-sm text-gray-400">No new notifications</li><?php endif; ?>
              </ul>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <p class="font-semibold text-sm"><?= e($shell['userName']) ?></p>
              <p class="text-xs text-gray-600"><?= e($shell['roleLabel']) ?></p>
            </div>
            <div class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold"><?= e(mb_substr($shell['userName'], 0, 1)) ?></div>
          </div>
        </div>
      </header>
      <main class="flex-1 overflow-auto p-8">
  <?php
}

function render_dashboard_end(): void {
  ?>
      </main>
    </div>
  </div>
  <?php
}

/** Render a stat card. */
function stat_card(string $value, string $label, string $icon, string $iconBg = 'bg-green-100', string $iconColor = 'text-green-600', ?string $badge = null, bool $badgeUp = true): void {
  ?>
  <div class="bg-white rounded-xl border p-6">
    <div class="flex items-center justify-between <?= $badge ? 'mb-4' : '' ?>">
      <div class="p-3 rounded-lg <?= e($iconBg) ?>"><i data-lucide="<?= e($icon) ?>" class="w-6 h-6 <?= e($iconColor) ?>"></i></div>
      <?php if ($badge !== null): ?>
        <span class="text-xs font-medium px-2 py-1 rounded-full <?= $badgeUp ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700' ?>"><?= e($badge) ?></span>
      <?php endif; ?>
    </div>
    <h3 class="text-3xl font-bold <?= $badge ? '' : 'mt-4' ?> mb-1"><?= e($value) ?></h3>
    <p class="text-sm text-gray-600"><?= e($label) ?></p>
  </div>
  <?php
}

/** Consistent empty-state block. */
function empty_state(string $message, string $icon = 'inbox', ?string $ctaHref = null, ?string $ctaLabel = null): void {
  ?>
  <div class="text-center py-12">
    <i data-lucide="<?= e($icon) ?>" class="w-12 h-12 text-gray-300 mx-auto mb-3"></i>
    <p class="text-gray-500"><?= e($message) ?></p>
    <?php if ($ctaHref && $ctaLabel): ?>
      <a href="<?= e($ctaHref) ?>" class="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"><?= e($ctaLabel) ?></a>
    <?php endif; ?>
  </div>
  <?php
}

/** Emit a canvas + Chart.js init. $type = line|bar|pie. */
function render_chart(string $id, string $type, array $config, int $height = 250): void {
  echo '<div style="position:relative;height:' . $height . 'px"><canvas id="' . e($id) . '"></canvas></div>';
  echo '<script>document.addEventListener("DOMContentLoaded",function(){new Chart(document.getElementById("' . e($id) . '"),'
     . json_encode(['type' => $type] + $config, JSON_UNESCAPED_UNICODE) . ');});</script>';
}
