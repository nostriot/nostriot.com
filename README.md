This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). for nostriot.com

## Deployment

### First install redis on your server

To install and start Redis on Ubuntu, follow these steps:

### 1. Update and Upgrade Your System
Before installing Redis, update your package manager:

```bash
sudo apt update
sudo apt upgrade
```

### 2. Install Redis
You can install Redis directly from the default Ubuntu repository:

```bash
sudo apt install redis-server
```

### 3. Configure Redis (Optional)
After installation, you can modify the Redis configuration file to suit your needs. The configuration file is located at:

```bash
sudo nano /etc/redis/redis.conf
```

You might want to make Redis more secure, such as by disabling access from external IP addresses or setting a password.

### 4. Start and Enable Redis Service
Start the Redis service and enable it to start at boot:

```bash
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### 5. Verify Redis Installation
To check if Redis is running, use:

```bash
sudo systemctl status redis-server
```

You can also use the Redis CLI to test connectivity:

```bash
redis-cli ping
```

If Redis is working properly, it will return:

```
PONG
```

Redis is now installed and running on your Ubuntu system.

### Now set up the server environment


**Install Node.js (if not already installed)**]

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

**Install PM2**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Upload Your Next.js App to the VPS**

```bash
scp -r /path/to/your/nextjs-app user@your-vps-ip:/home/youruser/nextjs-app
```

**Install Dependencies**

```bash
cd /home/youruser/nextjs-app
npm install
npm run build
npm start
```

**Install PM2**

```bash
pm2 start npm --name "nextjs-app" -- start
pm2 save
pm2 startup
```

**Set Up Nginx as a Reverse Proxy**

```bash
sudo vim /etc/nginx/sites-available/default
```

Add the following configuration block inside the server block:

```bash
server {
    listen 80;
    server_name nostriot.com www.nostriot.com;

    location / {
        proxy_pass http://localhost:3000;  # Next.js runs on port 3000 by default
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save and close the file, then test the Nginx configuration:

```bash
sudo nginx -t
```

Restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

**Set up SSL with Certbot**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**Monitor Your Next.js App with PM2**

```bash
pm2 status
pm2 logs nextjs-app
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
