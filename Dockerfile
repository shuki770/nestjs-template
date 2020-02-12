#
# ================ Base stage ================

# Use node-alpine as base image
FROM node:12.15-alpine as base

# Install node dependencies (For packages written in C++ For example: grpc, sharp, etc.)
RUN apk add --update python make g++

# Set working directory
WORKDIR /usr/src/app

# Copy npm package*.json files
COPY package*.json ./

#
# ==================== Audit stage ====================
FROM base as audit

RUN npm audit

#
# ==================== DEV Ready stage ====================
FROM base as dev-ready

# Install all npm dependencies including devDependencie for build and test
RUN npm ci --prefer-offline --progress=false --no-audit

# Copy all app files
COPY . .

#
# ==================== Lint stage ====================

FROM dev-ready as lint

RUN  npm run lint

#
# ==================== Test stage ====================

FROM dev-ready as test
ENV NODE_ENV=test
RUN  npm run test

#
# ==================== Build stage ====================

FROM dev-ready as build
RUN  npm run build:prod

#
# ==================== Release stage ====================

FROM base as release

# Set labels
LABEL APP="nestjs-app"
LABEL MAINTAINER="shuki770"

# Install useful tools
RUN apk add --no-cache --update \
    curl \
    vim \
    bash

# Install production npm dependencies
RUN npm ci --prefer-offline --no-audit --progress=false --only=production

# Copy application files
COPY --from=build /usr/src/app/dist ./

# Set environment variables (on build it can be overridden by adding --build-arg key=value)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

ARG PORT=3000
ENV PORT=$PORT

ARG DEBUG_PORT=9229
ENV DEBUG_PORT=$DEBUG_PORT

# Expose app port and debug port (node inspector)
EXPOSE $PORT $DEBUG_PORT

# Check every 30s that the server returns HTTP 200
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:$PORT/health || exit 1

# Start the app
CMD ["npm", "run", "start:prod"]
