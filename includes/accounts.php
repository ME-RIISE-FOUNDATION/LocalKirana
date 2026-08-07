<?php
// Account registry, stored in the SQLite `accounts` table. Passwords are hashed.

require_once __DIR__ . '/db.php';

/** All registered accounts (who can log in). */
function accounts_all(): array {
  return db_all("SELECT * FROM accounts ORDER BY created_at, email");
}

/** Find an account by email (case-insensitive), or null. */
function account_find(string $email): ?array {
  $email = trim($email);
  if ($email === '') return null;
  return db_row("SELECT * FROM accounts WHERE lower(email) = lower(:e)", [':e' => $email]);
}

/** Insert or replace an account (matched by email). */
function account_save(array $account): void {
  $email = strtolower(trim($account['email'] ?? ''));
  if ($email === '') return;
  db_exec("INSERT INTO accounts (email, role, name, shopName, phone, vendorId, password_hash, created_at, address, city, pincode)
           VALUES (:email, :role, :name, :shopName, :phone, :vendorId, :ph, :ca, :address, :city, :pincode)
           ON CONFLICT(email) DO UPDATE SET
             role = :role, name = :name, shopName = :shopName, phone = :phone,
             vendorId = :vendorId, password_hash = :ph", [
    ':email'    => $email,
    ':role'     => $account['role'] ?? 'customer',
    ':name'     => $account['name'] ?? '',
    ':shopName' => $account['shopName'] ?? null,
    ':phone'    => $account['phone'] ?? '',
    ':vendorId' => $account['vendorId'] ?? null,
    ':ph'       => $account['password_hash'] ?? '',
    ':ca'       => date('c'),
    ':address'  => $account['address'] ?? '',
    ':city'     => $account['city'] ?? '',
    ':pincode'  => $account['pincode'] ?? '',
  ]);
}

/** Update just the editable profile fields for an account (no password change). */
function account_update_profile(string $email, array $f): void {
  db_exec("UPDATE accounts SET name = :name, phone = :phone, address = :address, city = :city, pincode = :pincode
           WHERE lower(email) = lower(:e)", [
    ':name'    => $f['name'] ?? '',
    ':phone'   => $f['phone'] ?? '',
    ':address' => $f['address'] ?? '',
    ':city'    => $f['city'] ?? '',
    ':pincode' => $f['pincode'] ?? '',
    ':e'       => trim($email),
  ]);
}

/** True once the customer has entered a delivery address. */
function profile_complete(array $user): bool {
  return trim($user['address'] ?? '') !== '';
}

/** Register/replace an account, hashing the plaintext password. */
function account_register(array $fields, string $password): void {
  $fields['password_hash'] = password_hash($password, PASSWORD_DEFAULT);
  unset($fields['password']);
  account_save($fields);
}

/** Remove an account by email (revoke login). */
function account_delete(string $email): void {
  db_exec("DELETE FROM accounts WHERE lower(email) = lower(:e)", [':e' => trim($email)]);
}

/** Verify credentials. Returns the account on success, null otherwise. */
function account_authenticate(string $email, string $password): ?array {
  $a = account_find($email);
  if ($a && password_verify($password, $a['password_hash'] ?? '')) return $a;
  return null;
}

/** Convert a stored account into the session "user" shape used across the app. */
function account_to_user(array $a): array {
  $user = [
    'id'      => $a['vendorId'] ?? 1,
    'name'    => $a['name']  ?? 'User',
    'email'   => $a['email'] ?? '',
    'role'    => $a['role']  ?? 'customer',
    'phone'   => $a['phone'] ?? '',
    'address' => $a['address'] ?? '',
    'city'    => $a['city'] ?? '',
    'pincode' => $a['pincode'] ?? '',
  ];
  if (($a['role'] ?? '') === 'vendor') {
    $user['shopName'] = $a['shopName'] ?? '';
  }
  return $user;
}
