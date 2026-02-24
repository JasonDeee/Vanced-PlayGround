@echo off
setlocal EnableDelayedExpansion

echo ========================================================
echo   Vanced PopUp CDN Packager
echo ========================================================

:: 1. Ask for Version
set /p version="Enter Version Number (e.g. v1.1): "
if "%version%"=="" (
    echo Version cannot be empty!
    pause
    exit /b
)

:: 2. Set Paths
set "DIST_DIR=cdn_dist\%version%"
set "STYLES_DIR=%DIST_DIR%\Styles"

echo Packaging for version: %version%...
echo Destination: %DIST_DIR%

:: 3. Create Directories
if not exist "%DIST_DIR%" mkdir "%DIST_DIR%"
if not exist "%STYLES_DIR%" mkdir "%STYLES_DIR%"

:: 4. Copy JS Files
echo Copying JavaScript files...
copy "ScriptGenerator.js" "%DIST_DIR%\" >nul
if %errorlevel% neq 0 (
    echo [ERROR] ScriptGenerator.js not found!
) else (
    echo [OK] ScriptGenerator.js copied.
)

copy "animation.js" "%DIST_DIR%\" >nul
if %errorlevel% neq 0 (
    echo [ERROR] animation.js not found!
) else (
    echo [OK] animation.js copied.
)

:: 5. Copy CSS
echo Copying Styles...
if exist "Styles\style.css" (
    copy "Styles\style.css" "%STYLES_DIR%\" >nul
    echo [OK] Styles\style.css copied.
) else (
    echo [ERROR] Styles\style.css not found! Please compile SCSS first.
)

echo.
echo ========================================================
echo   Packaging Complete!
echo   Location: %CD%\%DIST_DIR%
echo ========================================================
pause
