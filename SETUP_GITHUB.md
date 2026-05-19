# Pushing LoveEats to GitHub

Follow these steps to push your LoveEats project to GitHub using VSCode:

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Enter repository name: `loveats` (or your preferred name)
3. Add description: "Romantic restaurant booking platform built with Next.js"
4. Choose visibility: Public or Private
5. **Do NOT initialize** with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Initialize Git Locally

Open Terminal in VSCode and run:

```bash
cd /path/to/loveats  # Navigate to your project directory

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: LoveEats platform with home, search, restaurant detail, and booking pages"

# Rename branch to main (if not already)
git branch -M main
```

## Step 3: Connect to GitHub Repository

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/loveats.git
git push -u origin main
```

If you encounter authentication issues, you may need to:
- Use a Personal Access Token instead of password
- Set up SSH keys (recommended for frequent pushes)

## Step 4: Verify on GitHub

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/loveats`
2. You should see all your files and the README
3. GitHub should automatically detect it's a Next.js project

## Step 5: (Optional) Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Continue with GitHub"
3. Find and select your `loveats` repository
4. Click Import
5. Leave default settings and click Deploy
6. Your app will be live in ~60 seconds!

## Useful Git Commands

```bash
# Check git status
git status

# View commit history
git log --oneline

# Add changes after editing files
git add .
git commit -m "Your message here"
git push

# Create a new branch for features
git checkout -b feature/new-feature
git push -u origin feature/new-feature
```

## Project Summary

Your LoveEats platform includes:

✅ **5 Pages**: Home, Search, Restaurant Detail, Booking Confirmation, 404
✅ **8 Reusable Components**: Header, Hero Banner, Category Nav, Restaurant Card, Hot Deals, Voucher Strip, Booking Modal, Footer
✅ **Complete Data Layer**: 6 restaurants, 8 categories, 4 vouchers, time slots
✅ **Design System**: Custom colors, typography, responsive breakpoints
✅ **Interactive Features**: Auto-sliding banner, countdown timer, filtering, sorting, date picker, guest stepper
✅ **Mobile Optimized**: Works perfectly on 375px, 768px, and 1280px+ screens

## What's Next?

After pushing to GitHub:

1. **Backend Integration**: Connect to a real database (Supabase, PostgreSQL, MongoDB)
2. **User Authentication**: Add sign-up, login, user profiles
3. **Payment Processing**: Integrate Stripe for bookings
4. **Email Notifications**: Send confirmation emails
5. **Real Availability**: Pull real-time availability from restaurants
6. **Admin Dashboard**: Create restaurant management interface

## Support

For issues or questions:
- Check the main [README.md](./README.md)
- Review the code structure in your VSCode explorer
- Refer to Next.js documentation: https://nextjs.org/docs

Happy coding! 🚀
