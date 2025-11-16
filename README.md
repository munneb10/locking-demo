## **Optimistic vs Pessimistic Locking A Tiny Concurrency Playground 🚦**

Have you ever wondered what actually happens inside a database when two people try to update the same row at the same time?

This tiny project shows it.
No frameworks.
No heavy abstractions.
Just raw PostgreSQL + TypeScript to demonstrate two classic concurrency control strategies:

* **Pessimistic Locking:** “I don’t trust anyone. Lock the row before touching it.”
* **Optimistic Locking:** “Conflicts are rare. I’ll check versions and fail only if needed.”

The goal is to keep it *minimal*, *playable*, and *easy to understand* a little playground where you can literally *see* race conditions, locks, waits, and version mismatches happening.

---

## 🎯 **What This Project Shows**

### **🔒 Pessimistic Locking**

* First transaction locks the row using `SELECT … FOR UPDATE`
* Second transaction tries to update the same row
* It gets **blocked** until the first one commits
* No conflicts, but slower

### **🔄 Optimistic Locking**

* Both transactions read the same row
* Both try to update with `WHERE version = X`
* Only the first succeeds
* The second one fails with a “version mismatch”
* Faster, no locks, but requires retries

Perfect for demonstrating:

* Race conditions
* Lost updates
* Concurrency control
* Why databases need locking strategies
* Real-world patterns used in microservices, banking, inventory, booking systems, etc.

---

## 📦 **Tech Used**

* **Node.js**
* **TypeScript**
* **PostgreSQL**
* `pg` Postgres client
* Raw SQL queries no ORMs
---

## 🚀 **How to Run**

### 1️⃣ Create the PostgreSQL database (only once)

```
createdb locking_demo
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Initialize tables + sample row

```
npm run setup
```

You should see:

```
Setup complete → Table ready.
```

### 4️⃣ Run pessimistic locking demo

```
npm run pessimistic
```

You will see:

* Tx A locks the row
* Tx B waits
* Then Tx B proceeds once A commits

### 5️⃣ Run optimistic locking demo

```
npm run optimistic
```

You will see:

* Worker A updates successfully
* Worker B fails with a version mismatch

---

## 🧠 **Why This Project Exists**

I wanted a tiny, no-nonsense repo that:

* Shows database concurrency in a *visible* way
* Helps beginners understand locking
* Helps juniors see what "lost update" actually means
* Helps interview candidates explain optimistic vs pessimistic locking
* Fits into a portfolio as a clean, minimal engineering concept
* Works instantly on any machine

It’s the kind of demo I wish I had earlier in my career:
simple enough to read in 5 minutes, deep enough to teach real system behavior.

---

## 👍 **Feel free to fork, break, modify, race, stress test that’s the point.**

Happy locking! 🚦