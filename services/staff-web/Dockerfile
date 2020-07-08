FROM node:10.16.0-jessie

LABEL maintainer_email="universetennis@gmail.com"
LABEL maintainer="Daniel Lin"

RUN npm i -g npm@10.16.0
RUN useradd --user-group --create-home --shell /bin/bash app
RUN mkdir -p /home/staff-web/node_modules
RUN chown -R app:app /home/staff-web/

USER app
WORKDIR /home/staff-web
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 4999
CMD ["npm", "run", "prod"]