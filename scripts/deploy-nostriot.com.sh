#!/bin/zsh
nvm use
npm run build
rsync -avz .  ubuntu@nostriot.com:nostriot.com --exclude=.next --exclude=.env --exclude=node_modules --exclude=.git
ssh ubuntu@nostriot.com "cd nostriot.com; npm install; npm run build;  pm2 restart nextjs-app"
