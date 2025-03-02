@echo off
echo 📦 Installation des dépendances...
call npm install

echo 🔧 Génération du client Prisma et initialisation de la base de données SQLite...
cd packages\database
call npm run db:generate
call npm run db:push
cd ..\..

echo ✅ Projet configuré avec succès!
echo.
echo Vous pouvez maintenant démarrer le frontend avec 'start-web.bat'
echo et le backend avec 'start-api-simple.bat' dans un autre terminal.
