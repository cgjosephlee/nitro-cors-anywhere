# Nitro CORS Anywhere

A CORS Anywhere server powered by [Nitro](https://nitro.build/).

## [Deploy](https://nitro.build/deploy)

With the power of Nitro, you can deploy anywhere! Includes, but is not limited to:

- AWS Lambda
- Cloudflare
- Netlify functions or edge
- Vercel functions or edge

Edit `NITRO_PRESET` according to your provider. [Read more about changing the deployment preset.](https://nitro.build/deploy#changing-the-deployment-preset)

### Settings

Configure using environment variables at any time.

Example:

```
NITRO_WELCOME_MESSAGE="Temporarily offline."
NITRO_ALLOWED_ORIGINS=""
NITRO_BANNED_ORIGINS="*"
NITRO_ALLOWED_TARGETS=""
NITRO_BANNED_TARGETS="*"
```

## Usage

```
https://nitro.cors.example  # welcome message
https://nitro.cors.example/{url}
https://nitro.cors.example/https://target.site.example
```

## References

- https://github.com/Rob--W/cors-anywhere
- https://github.com/Zibri/cloudflare-cors-anywhere
