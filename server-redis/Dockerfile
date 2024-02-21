FROM node:latest
LABEL org.opencontainers.image.documentation="https://github.com/itning/hit-count/blob/master/README.md"
LABEL org.opencontainers.image.authors="itning@itning.top"
LABEL org.opencontainers.image.source="https://github.com/itning/hit-count"
LABEL org.opencontainers.image.title="HitCount"
LABEL org.opencontainers.image.description="HitCount App"
LABEL org.opencontainers.image.licenses="Apache License 2.0"
COPY dist/app.js /home/app.js
EXPOSE 9000
ENTRYPOINT ["node", "/home/app.js"]