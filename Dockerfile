FROM dat-docker.jfrog.io/node:18.12.1-slim AS build

COPY package*.json ts*.json newrelic.js .npmrc src/

WORKDIR /src

RUN npm ci --loglevel=error --ignore-scripts --verbose

COPY . .

RUN npm run lint

RUN npm run build

FROM build AS test

ARG TIMESTAMP=

RUN JUNIT_REPORT_PATH=build/reports/unit/junit.xml npm run test

FROM build AS prune

RUN npm prune --production --verbose

FROM dat-docker.jfrog.io/node:18.12.1-slim

# update gid/uid to not conflict with host gid/uid values
RUN groupmod -g 5000 node && \
    usermod -u 5000 node

COPY --from=prune /src/node_modules node_modules
COPY --from=build /src/build build

COPY --from=build /src/package.json .
COPY --from=build /src/newrelic.js .
COPY --from=build /src/wait-for-it.sh .

# run as unprivileged user node
USER node

ENTRYPOINT [ "npm" ]
CMD [ "run", "node" ]
