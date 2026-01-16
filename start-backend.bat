@echo off
echo ========================================
echo   Nexus Hub Backend Server Launcher
echo ========================================
echo.
cd /d "%~dp0server"
echo Starting backend server on http://localhost:3001...
echo.
node server.js
pause
