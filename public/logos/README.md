Mijoz logotiplari. Shaffof PNG, bo'yi 160 px (saytda 40 px da ko'rinadi, 2x uchun).

Nomlash: `kompaniya-light.png` yorug' rejim uchun (rangli yoki qora),
`kompaniya-dark.png` to'q rejim uchun (oq), bitta universal bo'lsa `kompaniya.png`.

Keyin `src/content/site.ts` dagi `clients` ro'yxatiga qo'shing:

```ts
{ name: "Kompaniya", logo: { light: "kompaniya-light.png", dark: "kompaniya-dark.png" } },
{ name: "Boshqasi", logo: "boshqasi.png" },
```

Asl (katta) fayllar `logo-src/` papkasida turadi, repo'ga kirmaydi.
