export default defineEventHandler(async (event) => {
const ip = event.node.req.headers['x-forwarded-for']?.toString() || event.node.req.socket.remoteAddress || 'unknown';
const key = `rate:${ip}`;
const now = Date.now();
const rate = (await useStorage().getItem<{ count: number, last: number }>(key)) || { count: 0, last: now };

if (now - rate.last > 60_000) {
  rate.count = 1;
  rate.last = now;
} else {
  rate.count++;
}

await useStorage().setItem(key, rate);

if (rate.count > 20) {
  return sendError(event, createError({ statusCode: 429, statusMessage: 'Too Many Requests' }));
}

})
