FROM node:17
WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY src/ /app/src/
EXPOSE 4000
CMD [ "node", "src/index.js" ]

# docker build . -t refazul/sickbazar-backend
# docker run -dit -p 4000:4000 --name sickbazar-backend --env-file .env refazul/sickbazar-backend
# docker image prune
# docker push refazul/sickbazar-backend

# k delete -f k8s/apollo-graphql/deployment.yaml
# k apply -f k8s/apollo-graphql/deployment.yaml