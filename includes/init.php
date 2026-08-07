<?php
// Session, auth and cart helpers for Local Kirana Connect

if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

require_once __DIR__ . '/data.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/store.php';
require_once __DIR__ . '/accounts.php';

/** HTML-escape a value for safe output. */
function e($value): string {
  return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

/* ------------------------------ flash messages ------------------------------ */

/** Queue a one-shot flash message shown on the next page render. */
function set_flash(string $message, string $type = 'success'): void {
  $_SESSION['flash'] = ['message' => $message, 'type' => $type];
}

/** Return and clear the pending flash message, or null. */
function take_flash(): ?array {
  if (empty($_SESSION['flash'])) return null;
  $f = $_SESSION['flash'];
  unset($_SESSION['flash']);
  return $f;
}

/** Safe local redirect target (prevents open-redirects to other hosts). */
function safe_redirect(string $fallback = 'index.php'): string {
  $to = $_POST['redirect'] ?? $_GET['redirect'] ?? $fallback;
  if (preg_match('#^https?://#i', $to) || str_starts_with($to, '//')) {
    return $fallback;
  }
  return $to;
}

/** The currently logged-in user, or null. */
function current_user(): ?array {
  return $_SESSION['user'] ?? null;
}

/** Log the current user out. */
function logout(): void {
  unset($_SESSION['user']);
}

/** Map a role to its landing page after login. */
function dashboard_for(string $role): string {
  return [
    'customer'   => 'index.php',
    'vendor'     => 'vendor.php',
    'supplier'   => 'supplier.php',
    'delivery'   => 'delivery.php',
    'admin'      => 'admin.php',
    'superadmin' => 'superadmin.php',
  ][$role] ?? 'index.php';
}

/** Redirect to login unless the current user matches $role. Returns the user. */
function require_role(string $role): array {
  $user = current_user();
  if (!$user || ($user['role'] ?? null) !== $role) {
    header('Location: login.php');
    exit;
  }
  return $user;
}

/* ------------------------------- Cart ------------------------------- */

function cart_items(): array {
  return $_SESSION['cart'] ?? [];
}

function cart_add(array $item): void {
  $cart = cart_items();
  $id = $item['id'];
  if (isset($cart[$id])) {
    $cart[$id]['quantity']++;
  } else {
    $item['quantity'] = 1;
    $cart[$id] = $item;
  }
  $_SESSION['cart'] = $cart;
}

function cart_set_quantity(int $id, int $qty): void {
  $cart = cart_items();
  if ($qty <= 0) {
    unset($cart[$id]);
  } elseif (isset($cart[$id])) {
    $cart[$id]['quantity'] = $qty;
  }
  $_SESSION['cart'] = $cart;
}

function cart_remove(int $id): void {
  $cart = cart_items();
  unset($cart[$id]);
  $_SESSION['cart'] = $cart;
}

function cart_clear(): void {
  $_SESSION['cart'] = [];
}

function cart_total_items(): int {
  $n = 0;
  foreach (cart_items() as $i) { $n += $i['quantity']; }
  return $n;
}

function cart_total_price(): int {
  $t = 0;
  foreach (cart_items() as $i) { $t += $i['price'] * $i['quantity']; }
  return $t;
}
