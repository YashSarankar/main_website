const fs = require('fs');
const path = require('path');

// Configurations
const DIRECTORIES = ['.', './insights']; 
const ADSENSE_PUB_ID = 'ca-pub-9441953606119572';

const META_TAG = `<meta name="google-adsense-account" content="${ADSENSE_PUB_ID}">`;
const SCRIPT_TAG = `<!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}"
        crossorigin="anonymous"></script>`;

function processDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Could not list the directory.', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (error, stat) => {
                if (error) {
                    console.error('Error stating file.', error);
                    return;
                }

                if (stat.isFile() && filePath.endsWith('.html')) {
                    addAdSenseTags(filePath);
                }
            });
        });
    });
}

function addAdSenseTags(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${filePath}:`, err);
            return;
        }

        let updated = false;
        let content = data;

        // Check and inject META_TAG
        if (!content.includes('google-adsense-account')) {
            content = content.replace('<head>', `<head>\n    ${META_TAG}`);
            updated = true;
        }

        // Check and inject SCRIPT_TAG
        if (!content.includes('adsbygoogle.js')) {
            content = content.replace('<head>', `<head>\n    ${SCRIPT_TAG}`);
            updated = true;
        }

        if (updated) {
            fs.writeFile(filePath, content, 'utf8', (err) => {
                if (err) {
                    console.error(`Error writing ${filePath}:`, err);
                } else {
                    console.log(`[SUCCESS] Updated AdSense tags in: ${filePath}`);
                }
            });
        } else {
            console.log(`[SKIPPED] Tags already exist in: ${filePath}`);
        }
    });
}

console.log("Starting AdSense Tag injection...");
DIRECTORIES.forEach(dir => processDirectory(path.join(__dirname, dir)));
