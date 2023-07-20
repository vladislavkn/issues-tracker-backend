# ==================
# Development stage.
# Used with 'npm run start:dev'.
# ==================

FROM node:18-alpine As development

WORKDIR /usr/src/app

# Install dependencies.
COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

USER node

# ============
# Build stage.
# ============

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Reuse node_modules from development stage to run 'npm run build'.
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build
ENV NODE_ENV production

# Optimize node_modules' size.
RUN npm ci --only=production && npm cache clean --force

USER node

# =================
# Production stage.
# =================

FROM node:18-alpine As production

# Reuse node_modules and compiled files from build stage.
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
