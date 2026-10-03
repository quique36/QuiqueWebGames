@echo off
rem Local test server (Godot web games do not run from file://)
cd /d %~dp0
echo Open http://localhost:8000/  (Ctrl+C to stop)
start "" http://localhost:8000/
python -m http.server 8000
