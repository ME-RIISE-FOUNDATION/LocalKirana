<!-- Shared modal shell (used by [data-modal] triggers and inline forms) -->
<div id="modal-overlay" class="fixed inset-0 z-[90] hidden items-center justify-center bg-black/40 p-4">
  <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-auto">
    <div class="flex items-center justify-between px-6 py-4 border-b">
      <h3 id="modal-title" class="font-bold text-lg">Details</h3>
      <button type="button" onclick="closeModal()" class="text-gray-400 hover:text-gray-700"><i data-lucide="x" class="w-5 h-5"></i></button>
    </div>
    <div id="modal-body" class="p-6"></div>
  </div>
</div>

<script>
  function closeModal() {
    var o = document.getElementById('modal-overlay');
    o.classList.add('hidden'); o.classList.remove('flex');
  }
  function openModal(title, html) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = html;
    var o = document.getElementById('modal-overlay');
    o.classList.remove('hidden'); o.classList.add('flex');
    if (window.lucide) lucide.createIcons();
  }
  document.addEventListener('click', function (e) {
    // Open a modal from a trigger that carries data-modal-title + data-modal-body,
    // or that points at a hidden template via data-modal-target.
    var t = e.target.closest('[data-modal]');
    if (t) {
      e.preventDefault();
      var title = t.getAttribute('data-modal-title') || 'Details';
      var tgt = t.getAttribute('data-modal-target');
      var html = tgt ? (document.querySelector(tgt) ? document.querySelector(tgt).innerHTML : '')
                     : (t.getAttribute('data-modal-body') || '');
      openModal(title, html);
      return;
    }
    // Click on the dark overlay (but not the dialog) closes it.
    if (e.target.id === 'modal-overlay') closeModal();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // Notification bell dropdown toggle.
  document.addEventListener('click', function (e) {
    var bell = e.target.closest('[data-bell]');
    var panel = document.getElementById('notif-panel');
    if (bell) { e.preventDefault(); if (panel) panel.classList.toggle('hidden'); return; }
    if (panel && !e.target.closest('#notif-panel')) panel.classList.add('hidden');
  });

  // Confirm before destructive form submits.
  document.addEventListener('submit', function (e) {
    var msg = e.target.getAttribute('data-confirm');
    if (msg && !window.confirm(msg)) e.preventDefault();
  });

  // Show/hide password (eye toggle).
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-toggle-password]');
    if (!btn) return;
    e.preventDefault();
    var input = document.querySelector(btn.getAttribute('data-toggle-password'));
    if (!input) return;
    var reveal = input.type === 'password';
    input.type = reveal ? 'text' : 'password';
    btn.setAttribute('aria-label', reveal ? 'Hide password' : 'Show password');
    var eye = btn.querySelector('.icon-eye'), off = btn.querySelector('.icon-eye-off');
    if (eye) eye.classList.toggle('hidden', reveal);
    if (off) off.classList.toggle('hidden', !reveal);
  });

  // Render Lucide icons.
  if (window.lucide) lucide.createIcons();
</script>
</body>
</html>
