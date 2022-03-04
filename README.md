# Butress-nodejs

$ pm2 startup                   # Detect init system, generate and configure pm2 boot on startup
$ pm2 save                      # Save current process list
$ pm2 resurrect                 # Restore previously saved processes

$pm2 start index.js --name "Api"
$pm2 start server.js --name "Admin"
