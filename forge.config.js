module.exports = {
    packagerConfig: {
        icon: 'src/assets/icon',
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
                icon: 'src/assets/icon.icns',
                name: 'Agralog Installer',
                overwrite: true,
                // background: './assets/dmg-background.png',
            }
        },
        {
            name: '@electron-forge/maker-zip',
            config: {}
        }
    ]
}
