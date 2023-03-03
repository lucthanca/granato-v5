import md5 from 'md5';
export default function makeid() {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 20; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return md5(text + Date.now());
}
