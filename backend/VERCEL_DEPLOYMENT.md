# Vercel Deployment Guide

## Prerequisites
- Vercel account (vercel.com)
- GitHub repository with your code
- MongoDB Atlas account (for cloud database)

## Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/inventory-system`

## Step 2: Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Generate a secure random string
   - `NODE_ENV`: Set to `production`
6. Click "Deploy"

## Step 3: Set Environment Variables
After deployment:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all variables from `.env.example`
4. Redeploy the project

## Step 4: Test Your API
Your API will be available at: `https://your-project-name.vercel.app`

Test with:
\`\`\`bash
curl https://your-project-name.vercel.app/api/auth/login
\`\`\`

## Important Notes
- Vercel has a 10-second timeout for serverless functions
- For long-running operations, consider using Vercel's background jobs
- MongoDB Atlas free tier has connection limits
- Keep your JWT_SECRET secure and unique

## Troubleshooting
- **Connection timeout**: Check MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0)
- **Environment variables not loading**: Redeploy after adding variables
- **CORS errors**: Update CORS_ORIGIN in environment variables
