# Vento OS

Fatura ve fiş yükleme akışı bulunan basit bir Next.js PWA. Supabase istemcisi `lib/supabase.js` üzerinden kullanılabilir.

## Yerel geliştirme

Proje kökünde `.env.local` dosyasını oluşturun:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Geliştirme sunucusunu çalıştırın:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Tarayıcıda `http://localhost:3000` adresini açın.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Supabase istemcisi

İstemciyi bir server veya client modülünde şu şekilde içe aktarabilirsiniz:

```js
import { supabase } from "../../lib/supabase";
```

`.env.local` dosyası `.gitignore` tarafından hariç tutulur. Supabase değerlerini Git'e göndermeyin.

## Vercel'e dağıtım

1. Vercel'de `Import Project` ile `vento-os` klasörünü seçin.
2. Framework olarak **Next.js** otomatik seçilir; Build Command `npm run build` olarak bırakılabilir.
3. Project Settings > Environment Variables bölümüne `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` değişkenlerini Production, Preview ve Development ortamları için ekleyin.
4. Deploy edin. Env değerlerini sonradan eklediyseniz yeni bir deployment başlatın.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
