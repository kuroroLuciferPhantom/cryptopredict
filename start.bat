@echo off
echo 🚀 Démarrage simplifié de CryptoPredict...

REM Installation de Python si nécessaire
echo 📦 Vérification de Python (nécessaire pour les dépendances natives)...
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️ Python n'est pas installé ou n'est pas dans le PATH.
    echo ⚠️ Vous pouvez l'installer depuis https://www.python.org/downloads/
    echo ⚠️ Assurez-vous de cocher l'option "Add Python to PATH" pendant l'installation.
    echo.
    echo ℹ️ Le script va continuer, mais certains modules natifs pourraient ne pas s'installer correctement.
    echo.
    pause
)

REM Vérification de Node.js
echo 📦 Vérification de Node.js...
node --version | findstr /C:"v20" >nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️ Node.js v20 n'est pas détecté. Certaines dépendances peuvent ne pas fonctionner correctement.
    echo.
    pause
)

REM Installation de pnpm globalement
echo 📦 Installation de pnpm globalement...
npm install -g pnpm

REM Installation des dépendances à la racine
echo 📦 Installation des dépendances racine...
call pnpm install

REM Configuration de la base de données
echo 🗄️ Configuration de la base de données...
cd packages\database
call pnpm install
call npx prisma generate
call npx prisma db push
cd ..\..

REM Installation des dépendances web et api séparément
echo 📦 Installation des dépendances du frontend...
cd apps\web
call pnpm install
cd ..\..

echo 📦 Installation des dépendances du backend...
cd apps\api
call pnpm install
cd ..\..

echo ✅ Configuration terminée!
echo.
echo 🌐 Pour démarrer le frontend: cd apps\web && npx next dev
echo 🔌 Pour démarrer le backend: cd apps\api && npx nest start --watch
echo.
echo Vous pouvez également utiliser les commandes suivantes depuis la racine:
echo - pnpm dev:web   : Pour démarrer le frontend
echo - pnpm dev:api   : Pour démarrer le backend
echo - pnpm db:studio : Pour explorer la base de données
echo.
echo Appuyez sur une touche pour terminer...
pause