# Holidaze

Holidaze is a fictional local tourism agency in Bergen, Norway. The site was built to showcase my abilities in my final exam as a student at Noroff. It's my first 'real' webpage built using React, and was also my first time working seriously with TypeScript.

## Heads up

This project relies on icons I've purchased from FontAwesome. As such, it will not install unless you either add your own FontAwesome API token into your environment variables, or remove all icons entirely. If you do not have the pro version, you'll also need to install the free icons and replace all current imports of pro icons.

But you can easily do so by using search and replace in VSCode.

If you decide to install this project, bear in mind that it relies heavily on my public API, which of course you wouldn't be able to access. If you want to hook up your own API, you'll need to fill out these environment variables:

- `FONTAWESOME_NPM_AUTH_TOKEN` - Will prevent installing dependencies if missing. A complete blockage unless you replace it.
- `NEXT_PUBLIC_API_URL` - URL to an API. All my server-side API calls use this.
- `NEXT_PUBLIC_LIVE_API`- URL to the same API. All my client-side API calls use this.
- `NEXT_PUBLIC_GOOGLE_API_KEY` - google maps, for geocoding and map.
- `API_PUBLIC_TOKEN` - API tokens used when doing server-side calls.
- `API_ADMIN_TOKEN` - ^^^^^^^



## Getting started
1. Clone the repo
```git
git clone git@github.com:Hawkas/torbjorn-haukas-project-exam-2.git
```
2. Install dependencies
```node
npm install
``` 
```yarn
yarn install
```

3. Run the app
```node
npm run dev
```
```yarn
yarn dev
```

