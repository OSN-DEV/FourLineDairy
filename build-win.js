const builder = require('electron-builder');

builder.build({
    config: {
        'appId': 'electorn-test',
        'win':{
            'target': {
                'target': 'zip',
                'arch': [
                    'x64',
                    'ia32',
                ]
            }
        }
    }
});