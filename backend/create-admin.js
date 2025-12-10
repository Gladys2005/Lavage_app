// Script pour créer un compte administrateur
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('./config/db');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  console.log('\n🔐 Création d\'un compte administrateur\n');

  try {
    // Demander les informations
    const nom = await question('Nom complet: ');
    const email = await question('Email: ');
    const password = await question('Mot de passe: ');
    const telephone = await question('Téléphone (optionnel): ') || null;
    const adresse = await question('Adresse (optionnel): ') || null;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await pool.query('SELECT * FROM utilisateurs WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      console.log('\n⚠️  Cet email existe déjà.');
      const update = await question('Voulez-vous le transformer en administrateur ? (o/n): ');
      if (update.toLowerCase() === 'o' || update.toLowerCase() === 'oui') {
        await pool.query('UPDATE utilisateurs SET role = $1 WHERE email = $2', ['admin', email]);
        console.log('\n✅ Le compte a été mis à jour en administrateur!');
        console.log(`   Email: ${email}`);
        console.log(`   Rôle: admin\n`);
        rl.close();
        process.exit(0);
      } else {
        console.log('\n❌ Opération annulée.\n');
        rl.close();
        process.exit(0);
      }
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insérer l'administrateur
    const result = await pool.query(
      'INSERT INTO utilisateurs (nom, email, mot_de_passe, telephone, adresse, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, role, nom',
      [nom, email, hashedPassword, telephone, adresse, 'admin']
    );

    console.log('\n✅ Compte administrateur créé avec succès!');
    console.log('\n📋 Informations du compte:');
    console.log(`   ID: ${result.rows[0].id}`);
    console.log(`   Nom: ${result.rows[0].nom}`);
    console.log(`   Email: ${result.rows[0].email}`);
    console.log(`   Rôle: ${result.rows[0].role}`);
    console.log('\n💡 Vous pouvez maintenant vous connecter avec cet email et mot de passe.\n');

    rl.close();
    process.exit(0);

  } catch (err) {
    console.error('\n❌ Erreur lors de la création:', err.message);
    rl.close();
    process.exit(1);
  }
}

createAdmin();


