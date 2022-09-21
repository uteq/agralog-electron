# Agralog Electron
> Electron wrapper for the Agralog website.

This is just a wrapper for the Agralog site inside Electron. Default it will direct to https://agralog.nl/launcher.

## Installation
1. Run `npm install`
2. To startup local environment run `npm start`

### Build
To build the app run `npm run make`. This will build the app in the `out` directory.

### Release
For release we use Github Actions. Release workflow runs when a tag is created. We can utilize the [npm-version](
https://docs.npmjs.com/cli/v6/commands/npm-version) command for versioning and creating tags.
```shell
npm version [ major | minor | patch ]
git push --follow-tags
```
The download files will be available on the release page.

### Credits
- [Github Actions Setup](https://dev.to/erikhofer/build-and-publish-a-multi-platform-electron-app-on-github-3lnd)
- [Menu Items](https://www.electronjs.org/docs/latest/api/menu)