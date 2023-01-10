module.exports = {
    packagerConfig: {
        icon: 'src/assets/icon.icns',
        executableName: 'Agralog',
    },
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'uteq',
                    name: 'agralog-electron',
                },
                draft: true,
                prerelease: false,
            }
        }
    ],
    makers: [
        {
            name: '@electron-forge/maker-dmg',
            config: {
                // background: './assets/dmg-background.png',
                format: 'ULFO'
            }
        },
        {
            name: '@electron-forge/maker-zip',
        },
    ]
}
