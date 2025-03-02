#!/bin/sh
echo "Setting up Redis..."
redis-cli CONFIG SET notify-keyspace-events KEA
echo "Redis setup complete!"