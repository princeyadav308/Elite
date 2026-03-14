const https = require('https');
const fs = require('fs');
const path = require('path');

const screens = [
  { id: '6d8c87c910714e14be7f5e451676d0bd', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzUyNmY4OGI1NGNkNjQ3MmNhNTk5YzA5YTNiY2JiNjMzEgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: '66edc48d7883408fa2103a580970fcd5', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzc1OTI0NjBkOWY2MzRhZTNiZGE1ZjhmOGUzZTcxNTM1EgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: '45ac0bba2b9c466f8926a2d53230ebae', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2YxNTdiNTdhNmE4NTRjNDBiZmI4ZWYwMjE3M2M4MzM3EgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: 'c08e65adcd9e4c538f4c625e09fd4f05', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzUxZmJhYzdkMDBjNjQ4YjJiOTQ1MTMwYmJlMTI5ZWRjEgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: '49911c37231742be83911d47fbd247a7', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2FmNTQ3ZmE2MjdhYjRlMjNhYjg0MTBiY2M3OGNhNzFkEgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: 'dbdc84cacf70461e91bf596c261c5cec', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzgxNjQxZjlhYmEzZDRmODliM2FlYWFkMGM2ODE5NWIzEgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: '1239e72e44cf49e2ae8e792102bc37b2', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzYyZTcwNmI0NDZhMDQ1YTg4MTc1MTNhMzJiZDJlNzk0EgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: 'cc954cbc0a084d8798a15a07e2ee7250', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzdlOGE4ZjlhZmVjMjQ1OTk5YjQ2ZmY3NTI5Yjk0NjY0EgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: '5c8535e2f85e4316888e6ec095daccfd', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzhjYjA0NDZkMWM0NjQ2NTFhYTNhYzZhNzE3MjAyZDQyEgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' },
  { id: 'babe39eb352c45ba923db180b2631abc', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzQ0NTgzNDkxNGJiNDQ5M2JhNDM0OGZiNzkzOTNjYWNhEgsSBxDpuYuO1hsYAZIBJAoKcHJvamVjdF9pZBIWQhQxMTU0NTc2MTEyMzg5MTczMTUxNQ&filename=&opi=89354086' }
];

const outDir = path.join(__dirname, 'tmp_screens');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

screens.forEach(screen => {
  https.get(screen.url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      fs.writeFileSync(path.join(outDir, `${screen.id}.html`), data, 'utf8');
      console.log(`Downloaded ${screen.id}.html`);
      
      // Parse the title to get a rough idea:
      const titleMatch = data.match(/<title>(.*?)<\/title>/);
      if (titleMatch) {
          console.log(`${screen.id} -> ${titleMatch[1]}`);
      }
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${screen.id}:`, err);
  });
});
