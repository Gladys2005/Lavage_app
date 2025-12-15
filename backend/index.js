require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const port = process.env.PORT || 3000;

// Lancement local uniquement. En environnement serverless (Vercel), on n'appelle pas listen().
if (require.main === module) {
  app.listen(port, async () => {
    console.log(`\n🚀 Backend server starting on http://localhost:${port}`);

    try {
      const result = await pool.query('SELECT NOW()');
      console.log('✅ Database connection successful');
      console.log(`   Database time: ${result.rows[0].now}`);

      const tablesCheck = await pool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      console.log(`✅ Found ${tablesCheck.rows.length} tables in database`);
    } catch (err) {
      console.error('❌ Database connection error:', err.message);
      console.error('   Please check your .env file and ensure PostgreSQL is running');
      console.error('   Expected config:');
      console.error('   - DB_HOST:', process.env.DB_HOST || 'localhost');
      console.error('   - DB_NAME:', process.env.DB_NAME || 'lavage_app');
      console.error('   - DB_USER:', process.env.DB_USER || 'postgres');
    }

    console.log(`\n📡 API endpoints available:`);
    console.log(`   GET  /health - Health check`);
    console.log(`   POST /api/auth/register - Register user`);
    console.log(`   POST /api/auth/login - Login user`);
    console.log(`   GET  /api/services - List services`);
    console.log(`   POST /api/orders - Create order (auth required)`);
    console.log(`   GET  /api/orders/:code - Track order`);
    console.log(`\n`);
  });
}

module.exports = app;
