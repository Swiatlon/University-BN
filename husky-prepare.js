if (process.env.NODE_ENV !== 'production') {
    const { execSync } = require('child_process');
    execSync('husky install', { stdio: 'inherit' });
}
