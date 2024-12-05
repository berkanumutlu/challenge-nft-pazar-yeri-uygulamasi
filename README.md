<div align="center">
    <p align="center">
        <a href="https://nodejs.org/">
            <img src="https://avatars.githubusercontent.com/u/9950313?s=200&v=4" alt="Node.js logo" height="140">
        </a>
    </p>
</div>
<br>
<p align="center">
    <a href="https://github.com/berkanumutlu/challenge-nodejs-nft-marketplace-app/stargazers" rel="nofollow"><img src="https://img.shields.io/github/stars/berkanumutlu/challenge-nodejs-nft-marketplace-app?style=flat&logo=github" alt="NFT Marketplace App Repo stars"></a>
    <a href="https://github.com/berkanumutlu/challenge-nodejs-nft-marketplace-app/blob/master/LICENSE" target="_blank" rel="nofollow"><img src="https://img.shields.io/github/license/berkanumutlu/challenge-nodejs-nft-marketplace-app" alt="NFT Marketplace App Repo License"></a>
    <a href="https://nodejs.org" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Node.js-v20.18.0-5FA04E?logo=nodedotjs&logoColor=white&labelColor=5FA04E" alt="Node.js Version"></a>
    <a href="https://nuxt.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Nuxt.js-v3.14.159-00DC82?logo=nuxtdotjs&logoColor=white&labelColor=00DC82" alt="Nuxt.js Version"></a>
    <a href="https://vuejs.org" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Vue.js-v3.5.13-4FC08D?logo=vuedotjs&logoColor=white&labelColor=4FC08D" alt="Vue.js Version"></a>
    <a href="https://tailwindcss.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/@nuxtjs/tailwindcss-v6.12.2-06B6D4?logo=tailwindcss&logoColor=white&labelColor=06B6D4" alt="@nuxtjs/tailwindcss Version"></a>
    <a href="https://vuetifyjs.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Vuetify-v3.7.4-1867C0?logo=vuetify&logoColor=white&labelColor=1867C0" alt="Vuetify Version"></a>
    <a href="https://sequelize.org" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Sequelize-v6.37.5-52B0E7?logo=sequelize&logoColor=white&labelColor=52B0E7" alt="Sequelize Version"></a>
    <a href="https://www.postgresql.org/docs/release/15.7" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/PostgreSQL-v15.7-4169E1?logo=postgresql&logoColor=white&labelColor=4169E1" alt="PostgreSQL Version"></a>
    <a href="https://www.npmjs.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/NPM-v10.8.2-CB3837?logo=npm&logoColor=F7F7F7&labelColor=CB3837" alt="NPM Version"></a>
    <a href="https://www.docker.com" target="_blank" rel="nofollow"><img src="https://img.shields.io/badge/Docker-v4.25.2-2496ED?logo=docker&logoColor=white&labelColor=2496ED" alt="Docker Version"></a>
</p>

# [Challenge] NodeJS ile NFT Pazar Yeri Uygulaması

It is a challenge project based on Node.js with Typescript, API(Express.js, Sequlize PostgreSQL), APP(Nuxt.js v3, Vuetify, Axios).

## Installation

**1)** Clone repository

```shell
$ git clone https://github.com/berkanumutlu/challenge-nodejs-nft-marketplace-app.git
```

Or with SSH

```shell
$ git clone git@github.com:berkanumutlu/challenge-nodejs-nft-marketplace-app.git
```

Or with Github CLI

```shell
$ git clone gh repo clone berkanumutlu/challenge-nodejs-nft-marketplace-app
```

**2)** Copy the example.env file and **make the required configuration changes** in the file

```shell
$ cp /src/api/.env.example /src/api/.env
$ cp /src/app/.env.example /src/app/.env
```

**3)** Install docker container (required docker)

```shell
$ docker-compose up -d
```

**4)** After installation, find your app and api container id on docker

```shell
$ docker ps

# Output:
CONTAINER ID   IMAGE                                            COMMAND                  CREATED        STATUS       PORTS                           NAMES
...
6f4a83c3731e   challenge-nodejs-nft-pazar-yeri-uygulamasi-app   "docker-entrypoint.s…"   26 hours ago   Up 5 hours   0.0.0.0:3000->3000/tcp          nft-marketplace-app    
...
```

- And connect to the terminal of your app and api container (Use different terminals)

```shell
$ docker exec -it {APP_CONTAINER_ID} bash
$ docker exec -it {API_CONTAINER_ID} bash
```

**5)** Install all the dependencies using npm (In different terminals)

```shell
/user/local/api $ npm install
/user/local/app $ npm install
```

**6)** Generate mock data

```shell
/user/local/api $ npm run generate:mock-data
```

**7)** Restart your docker container

```shell
$ docker-compose restart
```

**8)** Now you're ready to use project

- To stop the Docker container, use the following command

```shell
$ docker-compose stop
```

## Screenshots

- Home
  ![Home](screenshots/home.png)
- NFT list
  ![NFT list](screenshots/nft-list.png)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.