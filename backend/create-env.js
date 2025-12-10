// Script pour créer le fichier .env
const fs = require('fs');
const path = require('path');

const envContent = `# Configuration de la base de données PostgreSQL
DB_USER=postgres
DB_HOST=localhost
DB_NAME=lavage_app
DB_PASSWORD=2005
DB_PORT=5432

# Secret JWT (changez-le en production)
JWT_SECRET=votre_secret_jwt_super_securise_changez_moi_en_production

# Port du serveur
PORT=3000
`;

const envPath = path.join(__dirname, '.env');

try {
  // Vérifier si le fichier existe déjà
  if (fs.existsSync(envPath)) {
    console.log('⚠️  Le fichier .env existe déjà.');
    console.log('   Vérifiez qu\'il contient le bon mot de passe (2005)');
    console.log(`   Fichier: ${envPath}`);
  } else {
    // Créer le fichier .env
    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('✅ Fichier .env créé avec succès!');
    console.log(`   Fichier: ${envPath}`);
    console.log('\n📝 Configuration:');
    console.log('   - DB_USER: postgres');
    console.log('   - DB_PASSWORD: 2005');
    console.log('   - DB_NAME: lavage_app');
    console.log('   - DB_HOST: localhost');
    console.log('   - DB_PORT: 5432');
    console.log('\n💡 Si vous devez changer le mot de passe, modifiez le fichier .env');
  }
} catch (err) {
  console.error('❌ Erreur lors de la création du fichier .env:', err.message);
  process.exit(1);
}


