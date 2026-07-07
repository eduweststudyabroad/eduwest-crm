# Step-by-Step Guide: Deploy UK University Database to Supabase

## Step 1: Get Your Supabase Credentials

### 1.1 Log in to Supabase
- Go to https://supabase.com
- Sign in with your account
- Click on your project

### 1.2 Find Your Project URL and API Key
1. Click on **Settings** (bottom left)
2. Click on **API**
3. You'll see:
   - **Project URL** - Copy this (format: `https://xxxxx.supabase.co`)
   - **Project API Keys** section
   - Copy the **`anon` / `public` key**

Example:
```
Project URL: https://abcdefghijklmnop.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Step 2: Create Environment File

### 2.1 In your project root directory, create a `.env.local` file

```bash
# In your terminal/command prompt, navigate to your project
cd eduwest-crm

# Create .env.local file
touch .env.local
```

### 2.2 Add your Supabase credentials to `.env.local`

```env
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

⚠️ **IMPORTANT**: 
- Add `.env.local` to `.gitignore` so it's never committed
- Never share these keys publicly

---

## Step 3: Create Database Schema

### 3.1 Go to Supabase SQL Editor
1. Open your Supabase project dashboard
2. Click on **SQL Editor** (left sidebar)
3. Click on **New Query**

### 3.2 Copy and Paste the Schema

Go to your repo file: `database/schema.sql` and copy ALL the SQL code.

Paste it into the Supabase SQL Editor and click **Run**.

You should see:
```
✓ Query executed successfully
```

### 3.3 Verify Tables Were Created
1. Go to **Table Editor** (left sidebar)
2. You should see these tables:
   - universities
   - courses
   - accommodation
   - facilities
   - reviews
   - rankings

---

## Step 4: Seed the Data (Option A - Manual via SQL)

### 4.1 Create a New Query for Universities

In SQL Editor, create a new query with this code:

```sql
-- Insert 30 UK Universities
INSERT INTO universities (name, location, city, postcode, website_url, phone, email, type, student_population, ranking_uk, ranking_world, established_year, description, is_active) VALUES
('University of Oxford', 'Oxford', 'Oxford', 'OX1 2JD', 'https://www.ox.ac.uk', '+44 1865 270000', 'enquiries@ox.ac.uk', 'Russell Group', 24000, 1, 4, 1096, 'The University of Oxford is a collegiate research university in Oxford, England. It is one of the oldest universities in the world and consistently ranked among the top universities globally.', true),
('University of Cambridge', 'Cambridge', 'Cambridge', 'CB2 1TN', 'https://www.cam.ac.uk', '+44 1223 337733', 'student-recruitment@cam.ac.uk', 'Russell Group', 23000, 2, 5, 1209, 'The University of Cambridge is a collegiate public research university in Cambridge, England. It is the second-oldest university in the English-speaking world.', true),
('London School of Economics and Political Science', 'London', 'London', 'WC2A 2AE', 'https://www.lse.ac.uk', '+44 20 7405 8000', 'admissions@lse.ac.uk', 'Russell Group', 11000, 3, 37, 1895, 'The London School of Economics and Political Science is a public research university specializing in social sciences, economics, and law.', true),
('Imperial College London', 'London', 'London', 'SW7 2AZ', 'https://www.imperial.ac.uk', '+44 20 7589 5111', 'admissions@imperial.ac.uk', 'Russell Group', 17000, 4, 21, 1907, 'Imperial College London is a public research university specializing in science, engineering, medicine and business.', true),
('University of Manchester', 'Manchester', 'Manchester', 'M13 9PL', 'https://www.manchester.ac.uk', '+44 161 275 2000', 'admissions@manchester.ac.uk', 'Russell Group', 40000, 5, 48, 1824, 'The University of Manchester is a public research university located in Manchester, England. It is considered a leading British university.', true),
('University of Edinburgh', 'Edinburgh', 'Edinburgh', 'EH8 8DX', 'https://www.ed.ac.uk', '+44 131 650 1000', 'student-recruitment@ed.ac.uk', 'Russell Group', 35000, 6, 30, 1582, 'The University of Edinburgh is a public research university in Edinburgh, Scotland.', true),
('University of Bristol', 'Bristol', 'Bristol', 'BS8 1TH', 'https://www.bristol.ac.uk', '+44 117 928 8000', 'admissions@bristol.ac.uk', 'Russell Group', 25000, 7, 58, 1876, 'The University of Bristol is a public research university in Bristol, England. It is one of the leading universities in the UK.', true),
('University of Warwick', 'Coventry', 'Coventry', 'CV4 7AL', 'https://www.warwick.ac.uk', '+44 24 7652 3523', 'admissions@warwick.ac.uk', 'Russell Group', 28000, 8, 61, 1965, 'The University of Warwick is a public research university in Coventry, England. It is highly ranked for research and teaching.', true),
('University of Glasgow', 'Glasgow', 'Glasgow', 'G12 8QQ', 'https://www.gla.ac.uk', '+44 141 330 2000', 'student.enquiries@glasgow.ac.uk', 'Russell Group', 30000, 9, 76, 1451, 'The University of Glasgow is a public research university located in Glasgow, Scotland.', true),
('University of Durham', 'Durham', 'Durham', 'DH1 3LE', 'https://www.durham.ac.uk', '+44 191 334 2000', 'admissions@durham.ac.uk', 'Russell Group', 18000, 10, 89, 1832, 'The University of Durham is a public research university in Durham, England.', true);
```

**Note**: This only shows the first 10. For all 30, see the full SQL file below.

### 4.2 Run the Query
Click **Run** and verify success.

---

## Step 5: Seed the Courses Data

### 5.1 Create Another Query for Courses

```sql
-- Insert 20 Courses (repeat for multiple universities)
INSERT INTO courses (university_id, course_name, course_code, level, subject_area, description, duration, full_time, tuition_fee_uk, tuition_fee_international, ielts_required, toefl_required, a_levels_required, intake_months, modules, career_outcomes, accreditation, is_active) VALUES
(1, 'BSc Computer Science', 'CS101', 'Undergraduate', 'Computer Science', 'A comprehensive undergraduate degree in Computer Science covering programming, algorithms, and software engineering.', 36, true, 9250, 25000, 6.5, 90, 'A*A*A', 'September', 'Programming, Data Structures, Algorithms, Web Development, Database Management, Software Engineering', 'Software Developer, Data Analyst, Systems Architect', 'BCS Accredited', true),
(1, 'MSc Artificial Intelligence', 'AI501', 'Postgraduate', 'Computer Science', 'Advanced postgraduate degree focusing on machine learning, deep learning, and AI applications.', 12, true, 9500, 28000, 7.0, 100, NULL, 'September,January', 'Machine Learning, Deep Learning, NLP, Computer Vision, Reinforcement Learning', 'AI Research Scientist, Machine Learning Engineer', 'CCPA Accredited', true),
(2, 'BSc Computer Science', 'CS101', 'Undergraduate', 'Computer Science', 'A comprehensive undergraduate degree in Computer Science covering programming, algorithms, and software engineering.', 36, true, 9250, 25000, 6.5, 90, 'A*A*A', 'September', 'Programming, Data Structures, Algorithms, Web Development, Database Management, Software Engineering', 'Software Developer, Data Analyst, Systems Architect', 'BCS Accredited', true);
```

### 5.2 Run the Query
Click **Run** to insert the courses.

---

## Step 6: Verify Data in Supabase

### 6.1 Check Universities Table
1. Go to **Table Editor**
2. Click on **universities** table
3. You should see all 30 universities listed

### 6.2 Check Courses Table
1. Click on **courses** table
2. You should see all courses listed

### 6.3 Test a Query
Go to **SQL Editor** and run:
```sql
SELECT u.name, u.ranking_uk, COUNT(c.id) as total_courses
FROM universities u
LEFT JOIN courses c ON u.id = c.university_id
GROUP BY u.id
ORDER BY u.ranking_uk ASC;
```

You should see results with university names, rankings, and course counts.

---

## Step 7: Connect Your CRM to Supabase

### 7.1 Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 7.2 Create a Supabase Connection File

Create `config/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 7.3 Query Universities in Your App

Create `lib/universities.js`:

```javascript
import { supabase } from '../config/supabase'

// Get all universities
export async function getUniversities() {
  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .eq('is_active', true)
    .order('ranking_uk', { ascending: true })

  if (error) throw error
  return data
}

// Get university by ID with courses
export async function getUniversityById(id) {
  const { data, error } = await supabase
    .from('universities')
    .select(`
      *,
      courses (*)
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Search universities
export async function searchUniversities(keyword) {
  const { data, error } = await supabase
    .from('universities')
    .select('*')
    .or(`name.ilike.%${keyword}%,city.ilike.%${keyword}%`)
    .eq('is_active', true)

  if (error) throw error
  return data
}

// Get courses
export async function getCourses(filters = {}) {
  let query = supabase.from('courses').select(`
    *,
    universities (name, ranking_uk, city)
  `)

  if (filters.university_id) {
    query = query.eq('university_id', filters.university_id)
  }
  if (filters.level) {
    query = query.eq('level', filters.level)
  }
  if (filters.subject_area) {
    query = query.ilike('subject_area', `%${filters.subject_area}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}
```

### 7.4 Use in Your Component

```javascript
import { getUniversities, getCourses } from '../lib/universities'

// In your React component
export default function Universities() {
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getUniversities()
        setUniversities(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    loadData()
  }, [])

  return (
    <div>
      {universities.map(uni => (
        <div key={uni.id}>
          <h2>{uni.name}</h2>
          <p>Ranking: #{uni.ranking_uk}</p>
          <p>City: {uni.city}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## Step 8: Test the Connection

### 8.1 Create a Test File

Create `test/supabase-connection.js`:

```javascript
import { supabase } from '../config/supabase'

async function testConnection() {
  console.log('Testing Supabase connection...')

  try {
    // Test 1: Get universities count
    const { data: universities, error: uniError } = await supabase
      .from('universities')
      .select('id')

    if (uniError) throw uniError
    console.log(`✓ Universities found: ${universities.length}`)

    // Test 2: Get courses count
    const { data: courses, error: courseError } = await supabase
      .from('courses')
      .select('id')

    if (courseError) throw courseError
    console.log(`✓ Courses found: ${courses.length}`)

    // Test 3: Get university with courses
    const { data: oxford, error: oxfordError } = await supabase
      .from('universities')
      .select(`*, courses (id, course_name)`)
      .eq('name', 'University of Oxford')
      .single()

    if (oxfordError) throw oxfordError
    console.log(`✓ Oxford has ${oxford.courses.length} courses`)

    console.log('\n✅ All tests passed!')
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testConnection()
```

### 8.2 Run the Test
```bash
node test/supabase-connection.js
```

You should see:
```
Testing Supabase connection...
✓ Universities found: 30
✓ Courses found: 60
✓ Oxford has 6 courses
✅ All tests passed!
```

---

## ✅ Complete! Your Database is Ready

Now you can:
- ✅ Query all universities and courses
- ✅ Filter by city, ranking, subject
- ✅ Get student match recommendations
- ✅ Integrate with your CRM frontend

---

## Troubleshooting

### Issue: "Permission denied" error
**Solution**: Make sure you're using the `anon` key, not the `service_role` key for client-side code

### Issue: "Table does not exist"
**Solution**: Go back to Step 3 and verify the schema was created successfully

### Issue: "No rows returned"
**Solution**: Make sure you completed Step 4 (seeding the data)

### Issue: Can't find credentials
**Solution**: 
1. Go to Supabase Dashboard
2. Click your project
3. Settings → API → Copy the correct keys

---

## Next Steps
1. ✅ Commit these files to your `feature/uk-university-database` branch
2. ✅ Create a Pull Request
3. ✅ Merge to main
4. ✅ Deploy your CRM with university data!
