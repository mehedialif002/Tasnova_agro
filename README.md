# Agro Landing Page — Setup Guide (Ubuntu)

Ei guide-e ekdom scratch theke Ubuntu-te Next.js project run korার steps deya holo.

---

## 1. Node.js install korun

Ubuntu-te best way holo `nvm` (Node Version Manager) use kora, karon eta version switch korte shohoj kore.

```bash
# nvm install
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# terminal bondho kore abar khulun, othoba:
source ~/.bashrc

# Node LTS install
nvm install --lts
nvm use --lts

# check
node -v
npm -v
```

---

## 2. Project files রাখুন

Ei zip file-ta ekta folder-e extract করুন, jemon:

```bash
cd ~/Projects   # jekhane rakhte chan
unzip agro-landing.zip
cd agro-landing
```

---

## 3. Dependencies install korun

```bash
npm install
```

Eta `node_modules` folder create korbe — ei package gulo download hobe: Next.js, React, Tailwind CSS, Nodemailer.

---

## 4. `.env.local` file banan

`.env.example` file-ta copy kore `.env.local` banan:

```bash
cp .env.example .env.local
```

Tarpor `.env.local` file-ta nano/VS Code diye open kore nicher value gulo bosan:

```bash
nano .env.local
```

### WhatsApp number

```
NEXT_PUBLIC_WHATSAPP_NUMBER=8801712345678
```

Country code shoho, "+" chara, space chara likhben.

### Email (order pele apnar email-e message ashbe)

Gmail use korle:

1. Google Account-e jan → **Security** → **2-Step Verification** on korun (na thakle age eta on korte hobe)
2. Tarpor **App Passwords** e jan (security settings-er nichey pabben, othoba directly: https://myaccount.google.com/apppasswords)
3. "Mail" er jonno ekta 16-digit password generate korun
4. Eta `.env.local`-e bosan (normal Gmail password na, ei generated password ta):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=youremail@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
SELLER_EMAIL=youremail@gmail.com
```

`SMTP_USER` theke mail pathano hobe, `SELLER_EMAIL`-e mail ashbe — same email address dile o hobe.

---

## 5. Development server run korun

```bash
npm run dev
```

Browser-e open korun: **http://localhost:3000**

Ekhon site dekhte parben. Order form theke test order dile apnar email-e mail ashbe.

---

## 6. Logo o Ad video replace korun

- **Logo**: apnar logo image-ta `public/logo.png` name diye replace kore din (square image best, jemon 200x200px)
- **Ad video**: apnar video-ta `public/ads/ad-video.mp4` name diye replace kore din
  - Video size choto rakhun (10-20MB er moddhe), nahole page slow load hobe
  - Video-te sound thakleo shomossha nai, but eta muted+autoplay-e set kora ache (browser policy onujayi)

Tarpor abar browser refresh korle notun logo/video dekha jabe (dev server chalu thakle automatic reload hoy).

---

## 7. Production-e deploy korun (jokhon ready hobe)

Shobcheye shohoj free option: **Vercel** (Next.js-er nijoshsho company).

```bash
npm install -g vercel
vercel
```

Prompt gulo follow korun. Deploy howar por Vercel dashboard-e giye same `.env.local` variable gulo "Environment Variables" section-e add korte hobe (WhatsApp number, SMTP creds ityadi) — karon `.env.local` file GitHub-e push hoy na, security-r jonno.

---

## Kono shomossha hole check korun

- **"Cannot find module" error** → `npm install` abar run korun
- **Order form submit korle "email pathano jayni" ashe** → `.env.local`-e SMTP_USER/SMTP_PASS thik ache kina check korun; Gmail App Password use korte hobe, normal password na
- **Logo/video dekha jacche na** → file name exact `logo.png` o `ad-video.mp4` kina, `public/` o `public/ads/` folder-e ache kina check korun
- **WhatsApp button click korle wrong number-e jachche** → `.env.local`-e `NEXT_PUBLIC_WHATSAPP_NUMBER` thik ache kina check korun, tarpor dev server restart korun (env variable change korle restart lage)

---

## Project structure shortcut

```
agro-landing/
├── app/
│   ├── api/order/route.js   ← order form er email pathay
│   ├── layout.js
│   ├── page.js               ← homepage, shob section ekhane jora
│   └── globals.css
├── components/
│   ├── Header.jsx             ← logo + nav
│   ├── VideoAd.jsx            ← top-er video ad section
│   ├── ProductHighlights.jsx  ← product card gulo
│   ├── OrderForm.jsx          ← order form
│   ├── WhatsAppButton.jsx     ← floating WhatsApp button
│   └── Footer.jsx
├── lib/site-config.js         ← business naam, WhatsApp number ityadi
├── public/
│   ├── logo.png                ← apnar logo (replace korun)
│   └── ads/ad-video.mp4        ← apnar ad video (replace korun)
└── .env.local                  ← apnar secret info (WhatsApp, email)
```
