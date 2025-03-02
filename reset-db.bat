@echo off
echo 🔄 Suppression de la base de données SQLite existante...
if exist packages\database\prisma\dev.db (
    del /f packages\database\prisma\dev.db
    echo Base de données supprimée.
) else (
    echo Aucune base de données existante trouvée.
)

echo 🔧 Régénération du client Prisma et création d'une nouvelle base de données...
cd packages\database
call pnpm db:generate
call pnpm db:push
cd ..\..

echo ✅ Base de données réinitialisée avec succès!
echo.
echo Vous pouvez maintenant démarrer l'application avec 'start-dev.bat'
