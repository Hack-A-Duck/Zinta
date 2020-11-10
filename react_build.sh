#!/bin/sh
cd frontend/ && npm install && npm run build
echo "static files build"
cd ..
if [ -d "backend/build" ]; then
    rm -rf backend/build
    echo "previous build deleted"
fi
mv frontend/build backend/
echo "react files moved"