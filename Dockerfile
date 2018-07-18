FROM duluca/minimal-node-web-server:8.11.1
WORKDIR ./src/app
COPY dist public
