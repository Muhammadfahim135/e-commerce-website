# 📦 GitHub Setup Guide

This guide will help you push your project to GitHub for submission.

## 🎯 Prerequisites

1. GitHub account created
2. Git installed on your computer
3. Basic understanding of Git commands

---

## 📋 Step-by-Step Instructions

### Step 1: Initialize Git Repository

Open PowerShell in your project folder and run:

```powershell
# Navigate to project folder
cd "c:\Users\muham\OneDrive\Desktop\ecommerce-frontend-design"

# Initialize git
git init

# Check status
git status
```

### Step 2: Add Files to Git

```powershell
# Add all files
git add .

# Verify files are staged
git status
```

### Step 3: Make First Commit

```powershell
# Commit with message
git commit -m "Week 1: Initial project setup with header and footer"

# Verify commit
git log --oneline
```

### Step 4: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon (top right)
3. Select "New repository"
4. Name it: `ecommerce-frontend-design`
5. Description: "eCommerce frontend development project"
6. Keep it **Public** (so supervisor can access)
7. Do NOT initialize with README (we already have one)
8. Click "Create repository"

### Step 5: Connect to GitHub

GitHub will show you commands. Use these:

```powershell
# Add remote repository
git remote add origin https://github.com/YOUR-USERNAME/ecommerce-frontend-design.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR-USERNAME` with your actual GitHub username!**

---

## 🔄 Weekly Workflow

After completing each week's work:

### Check What Changed
```powershell
git status
git diff
```

### Stage Changes
```powershell
# Add specific files
git add index.html
git add css/styles.css

# Or add all changes
git add .
```

### Commit Changes
```powershell
# Week 2 commit
git commit -m "Week 2: Added home page and product listing"

# Week 3 commit
git commit -m "Week 3: Added product details and interactivity"
```

### Push to GitHub
```powershell
git push origin main
```

---

## 📝 Commit Message Guidelines

### Good Commit Messages ✅
```
Week 1: Initial project setup with header and footer
Week 2: Added hero section and product grid
Week 3: Implemented product details page
Fix: Corrected header alignment issue
Style: Updated button hover effects
Docs: Updated README with new instructions
```

### Bad Commit Messages ❌
```
update
fixed stuff
changes
asdf
.
```

---

## 🌿 Branching Strategy (Optional but Recommended)

### Create Feature Branches
```powershell
# Create and switch to new branch
git checkout -b week-2-home-page

# Make your changes, then commit
git add .
git commit -m "Week 2: Home page implementation"

# Switch back to main
git checkout main

# Merge your changes
git merge week-2-home-page

# Push to GitHub
git push origin main
```

---

## 🔍 Useful Git Commands

### View History
```powershell
# View commit history
git log

# View compact history
git log --oneline

# View last 5 commits
git log -5
```

### Undo Changes
```powershell
# Discard changes in working directory
git checkout -- filename.html

# Unstage files
git reset HEAD filename.html

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

### View Differences
```powershell
# See what changed
git diff

# See staged changes
git diff --staged

# Compare with specific commit
git diff HEAD~1
```

---

## 📊 GitHub Repository Structure

Your GitHub repo should look like this:

```
ecommerce-frontend-design/
├── .gitignore
├── README.md
├── GETTING-STARTED.md
├── GITHUB-SETUP.md
├── NOTES.md
├── index.html
├── products.html
├── product-detail.html
├── css/
├── js/
└── assets/
```

---

## ✅ Submission Checklist

Before submitting to your supervisor:

- [ ] All Week 1 files committed
- [ ] Pushed to GitHub
- [ ] Repository is public
- [ ] README.md is visible on GitHub
- [ ] Code is properly formatted
- [ ] No broken links or errors
- [ ] All CSS and JS files included

### How to Share

1. Copy your repository URL:
   ```
   https://github.com/YOUR-USERNAME/ecommerce-frontend-design
   ```

2. Share this link with your supervisor

3. Optionally, enable GitHub Pages:
   - Go to Settings → Pages
   - Source: Deploy from main branch
   - Your site will be live at:
     ```
     https://YOUR-USERNAME.github.io/ecommerce-frontend-design
     ```

---

## 🐛 Troubleshooting

### Error: "Permission denied (publickey)"
**Solution:** Set up SSH keys or use HTTPS
```powershell
# Use HTTPS instead
git remote set-url origin https://github.com/YOUR-USERNAME/ecommerce-frontend-design.git
```

### Error: "Repository not found"
**Solution:** Check repository name and username
```powershell
# Verify remote URL
git remote -v

# Update if needed
git remote set-url origin https://github.com/CORRECT-USERNAME/ecommerce-frontend-design.git
```

### Error: "Updates were rejected"
**Solution:** Pull first, then push
```powershell
git pull origin main
git push origin main
```

### Merge Conflicts
**Solution:**
1. Open conflicted files
2. Look for `<<<<<<<`, `=======`, `>>>>>>>`
3. Edit to keep correct version
4. Save file
5. `git add .`
6. `git commit -m "Resolved merge conflict"`

---

## 📚 Learning Resources

### Git Basics
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

### Interactive Tutorials
- [Learn Git Branching](https://learngitbranching.js.org/)
- [GitHub Learning Lab](https://lab.github.com/)
- [Git Immersion](https://gitimmersion.com/)

### Video Tutorials
- [Git & GitHub Crash Course (YouTube)](https://www.youtube.com/results?search_query=git+github+tutorial)

---

## 🎉 Quick Reference Card

```powershell
# Save your work
git add .
git commit -m "Description of changes"
git push origin main

# Check status
git status

# View history
git log --oneline

# Create backup branch
git branch backup-branch-name

# View remote
git remote -v
```

---

## 💡 Pro Tips

1. **Commit often:** Small, frequent commits are better than large ones
2. **Write clear messages:** Future you will thank you
3. **Pull before push:** Avoid conflicts
4. **Backup important changes:** Create branches for experiments
5. **Use .gitignore:** Keep unnecessary files out of repo

---

## 🆘 Getting Help

If you encounter issues:

1. Check error message carefully
2. Search on [Stack Overflow](https://stackoverflow.com/)
3. Ask your supervisor
4. Consult [GitHub Community](https://github.community/)

---

**Good luck with your project! 🚀**

Remember to commit your work regularly and push to GitHub weekly!

---

**Created:** November 18, 2025  
**For:** eCommerce Frontend Development Internship
