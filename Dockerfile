# ============================================
# DOCKERFILE SIMPLIFIÉ POUR VITE
# ============================================

# ÉTAPE 1: Builder avec toutes les dépendances
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci  # Installe TOUTES les dépendances (dev aussi)
COPY . .
RUN npm run build

# ÉTAPE 2: Production (nginx)
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ÉTAPE 3: Debug (node avec toutes les dépendances)
FROM node:20-alpine AS debug
WORKDIR /app
COPY package*.json ./
RUN npm ci  # Toutes les dépendances
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# TARGET PAR DÉFAUT
FROM production
