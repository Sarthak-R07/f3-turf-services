@echo off
echo Starting the website development server...
echo The website will open in your default browser.
echo Do not close this window while you are using the website!
echo.
call npm install
call npm run dev
pause
