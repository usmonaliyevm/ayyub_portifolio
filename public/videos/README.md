Video fayllar shu papkada turadi. Nomlar `src/content/site.ts` dagi `cuts` ro'yxatiga mos:

- cut-01.mp4 … cut-06.mp4 (hammasi 9:16, 720×1280, H.264)

Asl (siqilmagan) fayllar `video-src/` papkasida, ular repo'ga kirmaydi.
Yangi video qo'shganda siqib keling, 10 MB dan kichik bo'lsin:

```sh
ffmpeg -i manba.mp4 -vf scale=720:1280 -c:v libx264 -crf 26 -preset medium \
  -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k public/videos/cut-07.mp4
```
