# Build stage
FROM node:24-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

# Production stage
FROM node:24-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Create a non-root user
RUN addgroup -g 1001 -S arc42 && \
    adduser -S arc42 -u 1001

# Change to non-root user
USER arc42

# Set the entrypoint
ENTRYPOINT ["node", "dist/index.js"]

# Default project path (can be overridden)
CMD ["/project"]
