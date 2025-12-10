// Script de test de connexion à la base de données
require('dotenv').config();
const pool = require('./config/db');

async function testConnection() {
  console.log('\n🔍 Test de connexion à la base de données...\n');
  
  console.log('Configuration:');
  console.log(`  - Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`  - Database: ${process.env.DB_NAME || 'lavage_app'}`);
  console.log(`  - User: ${process.env.DB_USER || 'postgres'}`);
  console.log(`  - Port: ${process.env.DB_PORT || '5432'}\n`);

  try {
    // Test de connexion
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connexion réussie!');
    console.log(`   Heure du serveur: ${result.rows[0].now}\n`);

    // Vérifier les tables
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log(`📊 Tables trouvées (${tables.rows.length}):`);
    tables.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    // Vérifier les données dans utilisateurs
    const usersCount = await pool.query('SELECT COUNT(*) FROM utilisateurs');
    console.log(`\n👥 Utilisateurs: ${usersCount.rows[0].count}`);

    // Vérifier les données dans services
    const servicesCount = await pool.query('SELECT COUNT(*) FROM services');
    console.log(`🛠️  Services: ${servicesCount.rows[0].count}`);

    // Vérifier les données dans commandes
    const ordersCount = await pool.query('SELECT COUNT(*) FROM commandes');
    console.log(`📦 Commandes: ${ordersCount.rows[0].count}\n`);

    console.log('✅ Tous les tests sont passés!\n');
    process.exit(0);

  } catch (err) {
    console.error('❌ Erreur de connexion:', err.message);
    console.error('\n💡 Solutions possibles:');
    console.error('   1. Vérifiez que PostgreSQL est démarré');
    console.error('   2. Vérifiez votre fichier .env dans backend/');
    console.error('   3. Vérifiez que la base de données existe:');
    console.error('      CREATE DATABASE lavage_app;');
    console.error('   4. Exécutez le schéma SQL:');
    console.error('      psql -U postgres -d lavage_app -f backend/sql/schema.sql\n');
    process.exit(1);
  }
}

testConnection();

