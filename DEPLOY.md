# Tasnova Agro — VPS Deploy (Docker Compose)

Next.js 14 + PostgreSQL, সব একটা VPS-এ Docker দিয়ে চলবে।
App container + Postgres container একসাথে `docker-compose.yml`-এ।

---

## 0) VPS-এ SSH দিয়ে ঢুকুন

```bash
ssh root@YOUR_VPS_IP
```

Hostinger VPS panel → "SSH details" থেকে IP আর password পাবেন।

---

## 1) Docker + Docker Compose ইনস্টল (একবারই)

Ubuntu VPS ধরে নিয়ে:

```bash
curl -fsSL https://get.docker.com | sh
docker --version
docker compose version
```

`docker compose version` কাজ করলেই হবে (নতুন Docker-এ compose বিল্ট-ইন)।

---

## 2) কোড clone করুন

```bash
cd /opt
git clone https://github.com/mehedialif002/Tasnova_agro.git
cd Tasnova_agro
```

> পরে আপডেট নিতে চাইলে এই ফোল্ডারেই `git pull` করবেন।

---

## 3) Production env ফাইল বানান

```bash
cp .env.production.example .env
nano .env
```

অবশ্যই বদলান:
- `DATABASE_URL` — managed PostgreSQL (Neon) connection string
- `JWT_SECRET` — র‍্যান্ডম স্ট্রিং (`openssl rand -base64 32` দিয়ে বানান)
- `SMTP_*` / `SELLER_EMAIL` — Gmail App Password (সাধারণ পাসওয়ার্ড না)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp নম্বর (8801XXXXXXXXX ফরম্যাটে)

> Admin email/password এখানে **রাখবেন না** — অ্যাপ চালু হওয়ার পর আলাদাভাবে বানাবেন (ধাপ ৬ দেখুন)।

সেভ: `Ctrl+O`, `Enter`, তারপর `Ctrl+X`।

> `.env` কখনো GitHub-এ push করবেন না (ইতিমধ্যে `.gitignore`-এ আছে)।

---

## 4) বিল্ড করে চালু করুন

```bash
docker compose up -d --build
```

প্রথমবার কয়েক মিনিট লাগবে (npm install + next build)।
চালু হলে app নিজে থেকেই:
1. Postgres-এ schema বসাবে (`prisma db push`)
2. products + admin seed করবে
3. Next.js চালু করবে port 3000-এ

---

## 5) ফায়ারওয়াল খুলুন + দেখুন

```bash
ufw allow 3000/tcp   # ufw চালু থাকলে
```

ব্রাউজারে যান: **http://YOUR_VPS_IP:3000**

লগ দেখতে:
```bash
docker compose logs -f app
```

---

## 5.1) Admin অ্যাকাউন্ট বানান (একবারই)

Admin credential `.env`-এ নেই। অ্যাপ চালু হওয়ার পর একবার এই কমান্ড চালান — email আর password টার্মিনালে চাইবে (password masked, কোথাও log হবে না):

```bash
docker compose exec app node scripts/create-admin.js
```

এরপর `http://YOUR_VPS_IP:3000/admin/login` দিয়ে ঢুকতে পারবেন।
পরে password বদলাতে চাইলে একই কমান্ড আবার চালান (একই email দিলে password আপডেট হবে)।

---

## 6) দরকারি কমান্ড

```bash
docker compose ps              # স্ট্যাটাস
docker compose logs -f app     # app লগ
docker compose restart app     # শুধু app রিস্টার্ট
docker compose down            # বন্ধ করা (ডেটা থাকবে)
docker compose down -v         # বন্ধ + DB ডেটা মুছে ফেলা (সাবধান!)
```

### নতুন কোড deploy (GitHub-এ push করার পর)

```bash
cd /opt/Tasnova_agro
git pull
docker compose up -d --build
```

---

## 7) পরে: ডোমেইন + HTTPS (Nginx + Let's Encrypt)

IP দিয়ে ঠিকমতো চললে ডোমেইন যোগ করবেন:

1. ডোমেইনের DNS-এ একটা **A record** → VPS IP।
2. VPS-এ Nginx + certbot:
   ```bash
   apt update && apt install -y nginx certbot python3-certbot-nginx
   ```
3. `/etc/nginx/sites-available/agro` বানিয়ে reverse proxy → `http://127.0.0.1:3000`।
4. `certbot --nginx -d yourdomain.com` দিয়ে ফ্রি SSL।

এই ধাপে এলে বলবেন, Nginx config-টা বানিয়ে দেবো।
