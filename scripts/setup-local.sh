#!/bin/bash

# Create necessary directories
mkdir -p services/cart/src
mkdir -p services/payment/src
mkdir -p services/request/src

# Copy base package.json to each service
for service in cart payment request; do
  cp package.json "services/$service/package.json"
  
  # Add service-specific scripts and dependencies
  cd "services/$service"
  npm pkg set name="@ecommerce/$service-service"
  npm pkg set scripts.dev="nodemon src/index.js"
  npm pkg set scripts.start="node src/index.js"
  
  # Install additional dependencies
  npm install --save express cors morgan winston prometheus-client
  npm install --save-dev nodemon
  cd ../..
done

# Start the development environment
docker-compose up -d

echo "Local development environment is ready!"
echo "Services are available at:"
echo "- Cart Service: http://localhost:3000"
echo "- Payment Service: http://localhost:3001"
echo "- Request Service: http://localhost:3002"
echo "- Prometheus: http://localhost:9090"
echo "- Grafana: http://localhost:3100 (admin/admin)"