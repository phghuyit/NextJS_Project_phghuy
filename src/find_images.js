const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
};

const srcDir = 'd:/03.Code/06.JS/01.NextJS/NextJS_Project_phghuy/src';

walk(srcDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const imageRegex = /<Image\b([\s\S]*?)\/?>/g;
        let match;
        while ((match = imageRegex.exec(content)) !== null) {
            const tagContent = match[1];
            const hasWidth = /\bwidth\s*=\s*/.test(tagContent);
            const hasHeight = /\bheight\s*=\s*/.test(tagContent);
            
            if (!hasWidth || !hasHeight) {
                const line = content.substring(0, match.index).split('\n').length;
                console.log(`${filePath}:${line}`);
                console.log(`  ${match[0].trim().replace(/\n/g, ' ')}`);
                console.log(`  Missing: ${!hasWidth && !hasHeight ? 'both' : (!hasWidth ? 'width' : 'height')}`);
            }
        }
    }
});
