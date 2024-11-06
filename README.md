# Strapi Plugin Preview Button

Add a preview button on Strapi CMS.

## How To

- Add preview-button plugin using

```bash
npm install @fiftyfivetech/strapi-plugin-preview-button
```

- Add these env variables in Strapi

```text
STRAPI_ADMIN_PREVIEW_URL=https://frontend_url.com/preview
STRAPI_ADMIN_PREVIEW_URL_SECRET=preview_secret
```

> Make sure your content must have an unique `slug` field. Based on that this plugin will works. If slug is not available you can able to use `documentId` field.

## How it works?

It will add a preview button for every content in content manager. On click it will open `https://frontend_url.com/preview?secret=preview_secret&slug=homepage&collectionName=api::page.page&documentId=x45tnYUnai&isDraft=true`.

You can able to easily intercept this call at your frontend (Next.js) application and read query params to fetch perform action and fetch draft mode content and show a live preview to end user.
