<template>
  <div>
    <header>
      <div class="container-repositorio">
        <div class="left">
          <figure class="user-img">
            <img :src="usuario.avatar_url" :alt="usuario.name" />
          </figure>
          <h2 class="user-name">{{ usuario.name }}</h2>
        </div>

        <div class="right">
          <p class="user-number-repo">{{ usuario.public_repos }}</p>
        </div>
      </div>
    </header>
    <!-- <main>
      <div class="container-repos">
        <div
          class="container-repo"
          v-for="repositorio of repositorios"
          :key="repositorio.id"
        >
          <a
            :href="repositorio.html_url"
            :title="repositorio.name"
            target="_blank"
          >
            <div class="repo-top">
              <h3 class="repo-name">{{ repositorio.name }}</h3>
              <p class="repo-description">{{ repositorio.description }}</p>
            </div>
            <div class="repo-bottom">
              <p class="repo-updated">
                {{ repositorio.updated_at }}
              </p>
              <p class="repo-forks">{{ repositorio.forks_count }}</p>
              <p class="repo-watchers">{{ repositorio.watchers_count }}</p>
            </div>
          </a>
        </div>
      </div>
    </main> -->
    <app-pagination
      :data="repos"
      :total-pages="Math.ceil(repos.length / 4)"
      :total="repos.length"
      :per-page="10"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    ></app-pagination>
  </div>
</template>

<script>
import api from "./config/service";
import { mapActions, mapGetters } from "vuex";
import Pagination from "./components/Pagination";

export default {
  name: "app",
  methods: {
    ...mapActions(["loadRepositorios"]),
    onPageChange(page) {
      this.currentPage = page;
    }
  },
  components: {
    "app-pagination": Pagination
  },
  computed: {
    ...mapGetters(["repos"])
  },
  data() {
    return {
      usuario: [],
      currentPage: 1
    };
  },
  mounted() {
    api.getUser().then(resposta => {
      this.usuario = resposta.data;
    });
  }
};
</script>

<style lang="scss">
* {
  font-family: "Montserrat", sans-serif;
}
body {
  margin: 0;
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
    border-radius: 50%;
    width: 32px;
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
