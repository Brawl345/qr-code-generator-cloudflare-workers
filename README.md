# QR Code Generator CloudFlare Worker

QR Code Generator for CloudFlare Workers. Use with GET or POST.

## Usage

Either `GET` with `?text=MYTEXT` or `POST` `application/json` like `{"text": "MYTEXT"}`.

## Setup

1. Rename wrangler.example.toml to wrangler.toml
2. Fill in the Account ID and Zone ID from your domain name page
3. Add a subdomain in CloudFlare, like qr.example.com with the following settings:
   - Type: `A`  (IPv4) and `AAAA` (IPv6)
   - Name: `qr`
   - Content: `192.0.2.1` (IPv4) and `100::` (IPv6)
   - Proxy status: `Proxied` (the orange cloud)
4. Change route = "qr.example.com/\*" in wrangler.toml to your domain
5. Deploy:
   1. `wrangler publish` for workers.dev (Cache won't work)
   2. `wrangler publish --env production` for your domain

## See also

- https://developers.cloudflare.com/workers/get-started/guide/#:~:text=If%20your%20route,and%20resolve%20successfully.
- https://community.cloudflare.com/t/setup-workers-on-personal-domain/88012/11
- https://github.com/wesbos/cloudflare-cloudinary-proxy
