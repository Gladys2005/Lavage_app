// Script pour initialiser la base de données
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('./config/db');

async function initDatabase() {
  console.log('\n🔄 Initialisation de la base de données...\n');

  try {
    // Lire le fichier SQL
    const sqlPath = path.join(__dirname, 'sql', 'schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Exécuter le schéma SQL
    console.log('📝 Exécution du schéma SQL...');
    await pool.query(sql);
    console.log('✅ Schéma SQL exécuté avec succès!\n');

    // Vérifier les tables créées
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log(`📊 Tables créées (${tables.rows.length}):`);
    tables.rows.forEach(row => {
      console.log(`   ✅ ${row.table_name}`);
    });

    // Vérifier les services
    const services = await pool.query('SELECT COUNT(*) FROM services');
    console.log(`\n🛠️  Services: ${services.rows[0].count}`);

    console.log('\n✅ Base de données initialisée avec succès!\n');
    process.exit(0);

  } catch (err) {
    if (err.message.includes('already exists')) {
      console.log('⚠️  Certaines tables existent déjà.');
      console.log('   Pour réinitialiser, supprimez d\'abord les tables existantes.\n');
    } else {
      console.error('❌ Erreur lors de l\'initialisation:', err.message);
      console.error('\n💡 Vérifiez que:');
      console.error('   1. PostgreSQL est démarré');
      console.error('   2. La base de données "lavage_app" existe');
      console.error('   3. Le fichier .env est correctement configuré\n');
    }
    process.exit(1);
  }
}

initDatabase();


