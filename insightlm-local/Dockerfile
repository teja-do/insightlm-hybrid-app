# Build stage
FROM node:22 as build

WORKDIR /app

# Add build arguments for environment variables
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Make build args available as environment variables during build
ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}

# Copy local frontend code
COPY ./frontend /app

# Install and build
RUN npm install && \
    npm run build

# Production stage
FROM nginx:alpine

# Copy built files from the correct Vite output directory (dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Configure nginx with Supabase proxy
RUN echo 'server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]