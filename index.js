import { imageSync } from 'qr-image';

/**
 * @param {string} text - Text to convert to QR
 * @returns {Promise<Response>} - The converted QR code image
 */
async function generate(text) {
  const headers = { 'Content-Type': 'image/png' };
  const qrImg = imageSync(text);
  return new Response(qrImg, { headers });
}

/**
 * @param {Request} request
 */
async function handleRequest(request) {
  let text;
  switch (request.method) {
    case 'GET': {
      const { searchParams } = new URL(request.url);
      text = searchParams.get('text');
      break;
    }
    case 'POST': {
      try {
        const res = await request.json();
        text = res.text;
        break;
      } catch (e) {
        return new Response('Invalid JSON', { status: 400 });
      }
    }
    default:
      return new Response('Method not allowed', { status: 405 });
  }

  if (!text || text.length === 0) {
    return new Response('"text" parameter is missing.', { status: 400 });
  }

  return generate(text);
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
