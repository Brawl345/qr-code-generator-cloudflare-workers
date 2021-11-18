import { imageSync } from 'qr-image';

/**
 * @param {string} text - Text to convert to QR
 * @returns {Promise<Response>} - The converted QR code image
 */
async function generate(text) {
  const headers = {
    'Content-Type': 'image/png',
    'cache-control': 'public, max-age=604800',
  };
  const qrImg = imageSync(text);
  return new Response(qrImg, { headers });
}

/**
 * @param {Event} event
 */
async function handleRequest(event) {
  let text;
  switch (event.request.method) {
    case 'GET': {
      const { searchParams } = new URL(event.request.url);
      text = searchParams.get('text');
      break;
    }
    case 'POST': {
      try {
        const res = await event.request.json();
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

  const cache = caches.default;
  let response = await cache.match(event.request);
  if (!response) {
    response = await generate(text);
    event.waitUntil(cache.put(event.request, response.clone()));
  }

  return response;
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event));
});
