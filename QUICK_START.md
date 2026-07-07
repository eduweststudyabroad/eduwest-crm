# 🚀 EduWest CRM - Quick Start Guide

Get your UK University Database up and running in **10 minutes**!

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Clone Repository](#step-1-clone-repository)
3. [Step 2: Install Dependencies](#step-2-install-dependencies)
4. [Step 3: Setup Environment Variables](#step-3-setup-environment-variables)
5. [Step 4: Deploy to Supabase](#step-4-deploy-to-supabase)
6. [Step 5: Verify Setup](#step-5-verify-setup)
7. [Common Issues](#common-issues)

---

## 📦 Prerequisites

Before you begin, make sure you have:

- ✅ **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- ✅ **npm** or **yarn** - Usually comes with Node.js
- ✅ **Supabase Account** - [Sign up free](https://supabase.com)
- ✅ **Git** - [Download](https://git-scm.com/)

### Verify Installation
```bash
node --version  # Should be v14+
npm --version   # Should be v6+
git --version   # Should show a version
```

---

## Step 1: Clone Repository

```bash
# Navigate to where you want to save the project
cd ~/projects

# Clone the repository
git clone https://github.com/eduweststudyabroad/eduwest-crm.git

# Navigate into the project
cd eduwest-crm

# Switch to the feature branch with the database
git checkout feature/uk-university-database
```

---

## Step 2: Install Dependencies

```bash
# Install Node.js packages
npm install

# Verify installation
npm list @supabase/supabase-js
```

You should see output like:
```
eduwest-crm@1.0.0 /path/to/eduwest-crm
└── @supabase/supabase-js@2.38.0
```

---

## Step 3: Setup Environment Variables

### 3.1 Get Your Supabase Credentials

1. Go to **https://supabase.com** and sign in
2. Open your project dashboard
3. Click **Settings** (⚙️ icon, bottom left)
4. Click **API**
5. Copy these two values:
   - **Project URL** (format: `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ...`)

### 3.2 Create `.env.local` File

```bash
# Copy the example file
cp .env.example .env.local

# Open it in your text editor and fill in your credentials
# On Mac/Linux:
nano .env.local

# On Windows:
notepad .env.local
```

### 3.3 Add Your Credentials

Edit `.env.local` and add your Supabase values:

```env
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

**Example:**
```env
SUPABASE_URL=https://abcdefghijklmnop.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzQwMDAwMH0...
```

✅ **Save the file!**

---

## Step 4: Deploy to Supabase

### 4.1 Create Database Schema

1. Open your Supabase project dashboard
2. Go to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Open the file: `database/schema.sql`
5. Copy ALL the SQL code
6. Paste it into the Supabase SQL Editor
7. Click **Run** button

You should see: ✅ `Query executed successfully`

### 4.2 Seed the Universities Data

1. In Supabase, go to **SQL Editor** → **New Query**
2. Open `database/seed-universities.sql` from your project
3. Copy all the code
4. Paste into SQL Editor
5. Click **Run**

### 4.3 Seed the Courses Data

1. Create another **New Query**
2. Open `database/seed-courses.sql`
3. Copy all the code
4. Paste into SQL Editor
5. Click **Run**

---

## Step 5: Verify Setup

### 5.1 Run the Test Script

```bash
npm run test:supabase
```

You should see output like:

```
╔════════════════════════════════════════════════════╗
║  EduWest CRM - Supabase Database Test             ║
╚════════════════════════════════════════════════════╝

🧪 Testing Supabase connection...

Test 1: Checking universities table...
✅ Universities table OK - Found 30 records

Test 2: Checking courses table...
✅ Courses table OK - Found 60 records

Test 3: Fetching sample university...
✅ Sample query OK - University of Oxford (UK Rank: #1)

Test 4: Testing join query...
✅ Join query OK - Oxford has 6 courses

Test 5: Testing search functionality...
✅ Search OK - Found 2 results for "Manchester"

═══════════════════════════════════════════════════
✅ ALL TESTS PASSED!
═══════════════════════════════════════════════════
📊 Database Summary:
   • Universities: 30
   • Courses: 60
   • Average Courses per University: 2.0
═══════════════════════════════════════════════════
```

### 5.2 Check Data in Supabase Dashboard

1. Go to your Supabase project
2. Click **Table Editor** (left sidebar)
3. Click **universities** table → You should see 30 rows
4. Click **courses** table → You should see 60 rows

---

## 🎯 Using the Database

### Example 1: Get All Universities

```javascript
import { getUniversities } from './lib/supabase-queries.js'

async function showUniversities() {
  const universities = await getUniversities()
  console.log(universities)
}

showUniversities()
```

**Output:**
```javascript
[
  {
    id: 1,
    name: "University of Oxford",
    ranking_uk: 1,
    city: "Oxford",
    website_url: "https://www.ox.ac.uk"
  },
  // ... 29 more universities
]
```

### Example 2: Search for Universities

```javascript
import { searchUniversities } from './lib/supabase-queries.js'

async function findUniversities() {
  const results = await searchUniversities('Manchester')
  console.log(results)
}

findUniversities()
```

### Example 3: Get Courses by Subject

```javascript
import { getCoursesBySubject } from './lib/supabase-queries.js'

async function findComputerScienceCourses() {
  const courses = await getCoursesBySubject('Computer Science')
  console.log(courses)
}

findComputerScienceCourses()
```

### Example 4: Match Student with Universities

```javascript
import { matchStudentWithCourses } from './lib/supabase-queries.js'

async function findMatchForStudent() {
  const matches = await matchStudentWithCourses({
    preferredRanking: 20,  // Top 20 UK universities
    interest: 'Computer Science',
    maxFee: 30000  // Maximum £30,000 per year
  })
  
  console.log(`Found ${matches.courses.length} suitable courses`)
}

findMatchForStudent()
```

---

## 📚 Available Functions

### Universities
- `getUniversities(filters)` - Get all universities
- `getUniversityById(id)` - Get specific university with courses
- `searchUniversities(keyword)` - Search by name/city
- `getUniversitiesByType(type)` - Filter by type (Russell Group, etc.)

### Courses
- `getCourses(filters)` - Get all courses
- `getCourseById(id)` - Get specific course
- `searchCourses(keyword)` - Search courses
- `getCoursesByUniversity(id)` - Get courses for a university
- `getCoursesBySubject(subject)` - Filter by subject
- `getCoursesByLevel(level)` - Filter by level (Undergrad/Postgrad)

### Matching
- `matchStudentWithCourses(profile)` - Find matching courses

---

## 🐛 Common Issues

### Issue: "Missing Supabase credentials"

**Solution:**
```bash
# Check if .env.local exists
ls -la .env.local

# Make sure it has your credentials
cat .env.local
```

### Issue: "Connection refused"

**Solution:**
1. Verify your SUPABASE_URL is correct
2. Check if your Supabase project is active
3. Try testing the connection manually:
```bash
curl https://your-project-url.supabase.co/rest/v1/
```

### Issue: "Table does not exist"

**Solution:**
1. Go to Supabase Dashboard
2. Check **Table Editor** - you should see all tables
3. If missing, re-run the schema SQL from Step 4.1

### Issue: "No data returned"

**Solution:**
1. Make sure you ran the seed scripts (Step 4.2 and 4.3)
2. Go to Supabase **Table Editor** and verify data exists
3. Check that `is_active` is set to `true`

### Issue: "401 Unauthorized"

**Solution:**
1. Your anon key might be wrong
2. Go to Supabase Settings → API
3. Copy the correct **anon public** key (not service role key)
4. Update `.env.local`

---

## 📖 Next Steps

1. **Learn the API**: Read [SUPABASE_DEPLOYMENT_GUIDE.md](./SUPABASE_DEPLOYMENT_GUIDE.md)
2. **Build Components**: Create React components using the functions
3. **Add More Data**: Extend the database schema as needed
4. **Deploy Your App**: Deploy to Vercel, Netlify, or your hosting

---

## 🤝 Need Help?

- 📖 [Supabase Documentation](https://supabase.com/docs)
- 💬 [Supabase Community](https://discord.supabase.com)
- 📧 Contact: eduweststudyabroad@gmail.com

---

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with Supabase credentials
- [ ] Database schema deployed to Supabase
- [ ] Universities data seeded
- [ ] Courses data seeded
- [ ] Test script passes (`npm run test:supabase`)
- [ ] Data visible in Supabase Table Editor

**Once all checked, you're ready to build your CRM! 🎉**
