// Script pour initialiser les services dans la base de données
require('dotenv').config();
const pool = require('./config/db');

async function initServices() {
  console.log('\n🔄 Initialisation des services...\n');

  try {
    // Vérifier si des services existent déjà
    const existing = await pool.query('SELECT COUNT(*) FROM services');
    const count = parseInt(existing.rows[0].count);

    if (count > 0) {
      console.log(`⚠️  ${count} service(s) existent déjà.`);
      const services = await pool.query('SELECT * FROM services ORDER BY id');
      console.log('\nServices actuels:');
      services.rows.forEach(service => {
        console.log(`   - ${service.nom} (${service.tarif_kg}€/kg)`);
      });
      console.log('\nPour réinitialiser, supprimez d\'abord les services existants.\n');
      process.exit(0);
    }

    // Insérer les services par défaut
    const services = [
      ['Nettoyage à sec', 'Nettoyage professionnel à sec pour tous types de vêtements.', 5.50],
      ['Repassage', 'Service de repassage au poids.', 3.00],
      ['Complet', 'Nettoyage à sec et repassage.', 8.00]
    ];

    for (const [nom, description, tarif] of services) {
      await pool.query(
        'INSERT INTO services (nom, description, tarif_kg) VALUES ($1, $2, $3)',
        [nom, description, tarif]
      );
      console.log(`✅ Service ajouté: ${nom} (${tarif}€/kg)`);
    }

    console.log('\n✅ Initialisation terminée avec succès!\n');
    process.exit(0);

  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation:', err.message);
    console.error('\n💡 Vérifiez que:');
    console.error('   1. La base de données existe');
    console.error('   2. Le schéma SQL a été exécuté');
    console.error('   3. La table "services" existe\n');
    process.exit(1);
  }
}

initServices();

