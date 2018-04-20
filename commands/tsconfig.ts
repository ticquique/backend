import * as jsonfile from 'jsonfile';
import * as path from 'path';

// tslint:disable-next-line:no-var-requires
const tsconfig = require('../tsconfig.json');

const content: any = tsconfig;
content.include = [
    'src/**/*',
];

const filePath = path.join(process.cwd(), 'tsconfig.build.json');
jsonfile.writeFile(filePath, content, { spaces: 2 }, (err) => {
    if (err === null) {
        process.exit(0);
    } else {
        console.error('Failed to generate the tsconfig.build.json', err);
        process.exit(1);
    }
});
