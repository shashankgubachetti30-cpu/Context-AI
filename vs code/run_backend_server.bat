@echo off
echo =======================================================
echo   ContextAI - Starting Real-Time C Backend Server
echo =======================================================
cd /d "%~dp0"
if not exist "server.exe" (
    echo Compiling server.c with GCC...
    "C:\Program Files\CodeBlocks\MinGW\bin\gcc.exe" server.c -o server.exe -lws2_32 -O2
)
echo Launching C Backend Server on http://localhost:8080 ...
server.exe
pause
