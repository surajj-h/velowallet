module.exports = {
  apps: [{
    name: 'velowallet',
    cwd: './apps/user-app',
    script: '../../node_modules/next/dist/bin/next',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      PORT: 3000,
      NODE_ENV: 'production'
    }
  }]
}
