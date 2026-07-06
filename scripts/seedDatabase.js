/**
 * Database Seeding Script
 * Populate the database with initial UK university and course data
 */

const db = require('../config/database');
const fs = require('fs');
const path = require('path');

// Load seed data
const universitiesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/uk-universities-seed.json'), 'utf8')
);

// Sample courses data
const coursesTemplates = [
  {
    course_name: 'BSc Computer Science',
    level: 'Undergraduate',
    subject_area: 'Computer Science',
    duration: 36,
    full_time: true,
    tuition_fee_uk: 9250,
    tuition_fee_international: 25000,
    ielts_required: 6.5,
    toefl_required: 90,
    a_levels_required: 'A*A*A',
    intake_months: 'September',
    description: 'A comprehensive undergraduate degree in Computer Science covering programming, algorithms, and software engineering.'
  },
  {
    course_name: 'MSc Artificial Intelligence',
    level: 'Postgraduate',
    subject_area: 'Computer Science',
    duration: 12,
    full_time: true,
    tuition_fee_uk: 9500,
    tuition_fee_international: 28000,
    ielts_required: 7.0,
    toefl_required: 100,
    intake_months: 'September,January',
    description: 'Advanced postgraduate degree focusing on machine learning, deep learning, and AI applications.'
  },
  {
    course_name: 'BA Business Administration',
    level: 'Undergraduate',
    subject_area: 'Business',
    duration: 36,
    full_time: true,
    tuition_fee_uk: 9250,
    tuition_fee_international: 22000,
    ielts_required: 6.0,
    toefl_required: 80,
    a_levels_required: 'ABB',
    intake_months: 'September',
    description: 'Comprehensive business degree covering management, finance, marketing, and entrepreneurship.'
  },
  {
    course_name: 'BEngineering Mechanical',
    level: 'Undergraduate',
    subject_area: 'Engineering',
    duration: 36,
    full_time: true,
    tuition_fee_uk: 9250,
    tuition_fee_international: 26000,
    ielts_required: 6.5,
    toefl_required: 90,
    a_levels_required: 'A*AB',
    intake_months: 'September',
    description: 'Degree in mechanical engineering covering design, manufacturing, and thermal dynamics.'
  },
  {
    course_name: 'BSc Molecular Biology',
    level: 'Undergraduate',
    subject_area: 'Biology',
    duration: 36,
    full_time: true,
    tuition_fee_uk: 9250,
    tuition_fee_international: 24000,
    ielts_required: 6.5,
    toefl_required: 90,
    a_levels_required: 'A*AB',
    intake_months: 'September',
    description: 'Study of molecular mechanisms in cells and organisms with practical laboratory experience.'
  },
  {
    course_name: 'MA History',
    level: 'Postgraduate',
    subject_area: 'History',
    duration: 12,
    full_time: true,
    tuition_fee_uk: 8000,
    tuition_fee_international: 18000,
    ielts_required: 7.0,
    toefl_required: 100,
    intake_months: 'September',
    description: 'Advanced study of historical periods and methodologies with research opportunities.'
  }
];

function seedDatabase() {
  console.log('Starting database seeding...');

  // Seed Universities
  universitiesData.universities.forEach((university, index) => {
    const query = `
      INSERT INTO universities 
      (name, location, city, postcode, website_url, type, student_population, ranking_uk, ranking_world, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [
        university.name,
        university.location,
        university.city,
        university.postcode,
        university.website_url,
        university.type,
        university.student_population,
        university.ranking_uk,
        university.ranking_world,
        university.description
      ],
      (err, results) => {
        if (err) {
          console.error(`Error seeding university ${university.name}:`, err);
        } else {
          const universityId = results.insertId;
          console.log(`✓ Seeded university: ${university.name} (ID: ${universityId})`);

          // Seed courses for this university
          coursesTemplates.forEach((courseTemplate) => {
            const courseQuery = `
              INSERT INTO courses 
              (university_id, course_name, level, subject_area, description, duration, full_time,
               tuition_fee_uk, tuition_fee_international, ielts_required, toefl_required, 
               a_levels_required, intake_months)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.query(
              courseQuery,
              [
                universityId,
                courseTemplate.course_name,
                courseTemplate.level,
                courseTemplate.subject_area,
                courseTemplate.description,
                courseTemplate.duration,
                courseTemplate.full_time,
                courseTemplate.tuition_fee_uk,
                courseTemplate.tuition_fee_international,
                courseTemplate.ielts_required,
                courseTemplate.toefl_required,
                courseTemplate.a_levels_required || null,
                courseTemplate.intake_months
              ],
              (err) => {
                if (err) {
                  console.error(`Error seeding course ${courseTemplate.course_name}:`, err);
                } else {
                  console.log(`  ✓ Added course: ${courseTemplate.course_name}`);
                }
              }
            );
          });
        }
      }
    );
  });

  setTimeout(() => {
    console.log('\nDatabase seeding completed!');
    process.exit(0);
  }, 10000);
}

// Run seeding
seedDatabase();
