# Base image
FROM node:20 AS base
ENV DIR /web-jetixSports
WORKDIR $DIR
ENV USER=node
############################## DEV ##################################
FROM base AS dev
COPY package.json package-lock.json* ./
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
    fi

COPY app ./app
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
EXPOSE $PORT
CMD ["npm", "run", "dev"]

############################## BUILD ##################################
FROM base AS build

COPY package*.json .
COPY app ./app
COPY public ./public
COPY next.config.mjs .
COPY tailwind.config.ts .
COPY tsconfig.json .
COPY postcss.config.mjs .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm install && npm run build && npm prune --production

############################## PRODUCTION ##################################
FROM base AS production

ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=build $DIR/package*.json .
COPY --from=build $DIR/public ./public
COPY --from=build $DIR/.next ./.next
COPY --from=build $DIR/node_modules node_modules
CMD ["npm", "run", "start"]
