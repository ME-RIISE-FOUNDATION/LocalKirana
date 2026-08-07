# Local Kirana Management Website

A multi-role kirana (neighbourhood grocery) management platform, built as a plain
**PHP + HTML** application — no build step, no Node/npm required.

Originally a Figma Make React/Vite prototype, it was converted to server-rendered PHP.

## Features

- **Customer landing** (`index.php`) — hero, nearby stores, product grid with search,
  and a session-based shopping cart (`cart.php`), checkout (`checkout.php`),
  delivery-address profile (`profile.php`) and order tracking / cancel (`orders.php`).
- **Login / sign-up** (`login.php`) — six roles (customer, vendor, supplier, delivery,
  admin, superadmin), backed by PHP sessions. Accounts are real: sign up first, then
  sign in with those credentials (passwords are hashed in the database).
- **Role dashboards** with tabbed navigation, stat cards, tables and charts:
  - `vendor.php`     — dashboard, products, orders, analytics, settings
  - `admin.php`      — dashboard, vendors, suppliers, delivery, customers, analytics
  - `supplier.php`   — dashboard, products, orders, vendors
  - `delivery.php`   — dashboard, active, completed, earnings
  - `superadmin.php` — overview, all orders (click any order for a full detail card,
    with status + payment control), return requests (approve / reject / refund), customers

Data is stored in a **SQLite database** at `data/localkirana.sqlite` (a single
portable file — copy it to back up or move the app). Tables are created
automatically on first run. Passwords are hashed. Nothing is seeded: the app
starts empty and fills up from real sign-ups and actions.

Tailwind (Play CDN), Lucide icons and Chart.js are loaded from CDNs, so an internet
connection is needed for full styling; the pages still render without it.

## Project layout

```
index.php, login.php, logout.php                             # entry / auth
cart.php, cart-action.php, checkout.php, profile.php, orders.php   # customer flow
actions.php                                                   # central POST dispatcher (PRG)
vendor.php, admin.php, supplier.php, delivery.php, superadmin.php  # role dashboards
includes/   db.php (SQLite + schema), store.php (data access), accounts.php (logins),
            init.php (session/auth/cart), data.php (categories), dashboard.php (shell)
partials/   head.php (<head> + CDNs), foot.php
data/       localkirana.sqlite  (the database — git-ignored, created at runtime)
uploads/    vendor-uploaded product images (git-ignored, created at runtime)
```

Vendors can **upload a product image** (JPG/PNG/WebP/GIF, up to 3 MB) when adding or
editing a product; files are stored under `uploads/` and referenced from the database.

## Running the code

Any PHP 8+ runtime works. With PHP's built-in server:

```bash
php -S localhost:8000
```

On this machine PHP ships with XAMPP, so:

```bash
"C:\xampp\php\php.exe" -S localhost:8000
```

Then open **http://localhost:8000/**.

You can also drop the folder into XAMPP's `htdocs\` and browse via Apache at
`http://localhost/LocalKirana/`.

## Accounts

There are no seeded logins — the app starts empty. Pick a role tab on the login
page, choose **Sign Up**, and create an account; then sign in with those
credentials. Passwords are hashed and stored in the SQLite database, so the same
account works on every later run (until you delete `data/localkirana.sqlite`).
