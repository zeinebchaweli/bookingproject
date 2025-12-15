# booking-app/Dockerfile
# ============================================
# ÉTAPE 1 : INSTALLATION DES DÉPENDANCES
# ============================================
FROM node:20-alpine AS deps
WORKDIR /app

# Copier uniquement les fichiers de dépendances d'abord (cache layer)
COPY package.json package-lock.json* ./
RUN npm ci --silent --only=production

# ============================================
# ÉTAPE 2 : BUILD DE L'APPLICATION
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les node_modules depuis l'étape deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement de build
ARG VERSION=1.0.0
ENV VITE_APP_VERSION=${VERSION}

# Build de l'application
RUN npm run build

# ============================================
# ÉTAPE 3 : IMAGE DE PRODUCTION
# ============================================
FROM nginx:alpine AS production

# Supprimer la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copier notre configuration Nginx optimisée
COPY nginx.conf /etc/nginx/conf.d/

# Copier les fichiers buildés depuis l'étape builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Sécurité : permissions non-root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chmod 644 /etc/nginx/conf.d/nginx.conf

# Health check pour Docker/Kubernetes
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Labels Docker (bonnes pratiques)
LABEL org.label-schema.version="${VERSION}"
LABEL org.label-schema.name="Booking App"
LABEL org.label-schema.description="Application de réservation"

EXPOSE 80

# User non-root pour sécurité
USER nginx

CMD ["nginx", "-g", "daemon off;"]
