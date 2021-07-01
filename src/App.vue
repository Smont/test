<template>
  <div>
    <header>
      <div class="container-repositorio">
        <div class="left">
          <figure class="user-img">
            <img :src="user.avatar_url" :alt="user.name" />
          </figure>
          <h2 class="user-name">{{ user.name }}</h2>
        </div>

        <div class="right">
          <p class="user-number-repo">Repos: {{ user.public_repos }}</p>
        </div>
      </div>
    </header>
    <main>
      <div class="repositorios ">
        <div class="repositorios-item container-repos">
          <div
            class="row container-repo "
            v-for="repositorio of repositorios"
            :key="repositorio.id"
          >
            <div class="col">
              <h3>{{ repositorio.name }}</h3>
            </div>
            <div class="col">
              <p class="repo-description">{{ repositorio.description }}</p>
            </div>
            <div class="col">{{ repositorio.forks }}</div>
            <div class="col">{{ repositorio.updated_at }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Repositorios from "./config/Repositorios";
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      repositorios: [],
      user: []
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      Repositorios.listar()
        .then(resposta => {
          this.repositorios = resposta.data;
          axios
            .get("https://api.github.com/users/laravel")
            .then(resposta => {
              this.user = resposta.data;
              console.log(user);
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style lang="scss">
* {
  font-family: "Montserrat", sans-serif;
}
body {
  margin: 0 auto;
  outline: none;
}

header {
  height: 50px;
  margin: 0;
  border-bottom: 1px solid #ccc;
  padding: 14px 0;
  .container-repositorio {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .right,
  .left {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .user-img img {
    border-radius: 50%;
    width: 32px;
    border: #ccc dashed 1px;
  }

  h2 {
    font-size: 21px;
  }

  .user-number-repo {
    background: #ccc;
    border-radius: 3px;
    width: 150px;
    text-align: center;
    padding: 3px;
    font-size: 14px;
  }
}

main {
  max-width: 100vw;
  color: #555;
}
a {
  color: inherit;
  text-decoration: none;
}
.container-repos {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
}
.container-repo {
  padding: 7px;
  margin: 7px;
  width: 300px;
  background: #e1e1e1;
  border-radius: 3px;
  transition: all 0.5s ease;
  cursor: pointer;
  border: 2px solid transparent;
  min-height: 200px;

  &:hover {
    border: 2px solid navy;

    color: black;
  }
  h3 {
    font-size: 18px;
    text-transform: capitalize;
    text-align: center;
    border-bottom: 1px dashed grey;
    padding-bottom: 14px;
  }
  p.repo-description {
    font-size: 14px;
    font-style: italic;
    line-height: 1.5em;
  }
}
</style>
