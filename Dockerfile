FROM mcr.microsoft.com/playwright:v1.37.0-jammy

WORKDIR /app


COPY package.json /app/
COPY tests/ /app/tests/
COPY locators /app/locators
COPY pages/ /app/pages
COPY data/ /app/data
COPY integration/ /app/integration
COPY playwright.config.js /app/

RUN npm install