module.exports = {
    packagerConfig: {
        icon: 'src/assets/icon.icns',
        executableName: 'Agralog',
        arch: 'all'
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
                icon: 'src/assets/icon.icns',
                // background: './assets/dmg-background.png',
            }
        },
    ]
}
