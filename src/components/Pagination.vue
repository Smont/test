<template>
  <div class="repositorios">
    <div class="repositorios-item">
      <div
        class="row"
        v-for="(repositorio, index) in paginationData"
        :key="index"
      >
        <div class="col">{{ repositorio.name }}</div>
        <div class="col">{{ repositorio.name }}</div>
        <div class="col">{{ repositorio.name }}</div>
        <div class="col">{{ repositorio.name }}</div>
        <div class="col">{{ repositorio.name }}</div>
        <div class="col">{{ repositorio.name }}</div>
        <div class="col">{{ repositorio.name }}</div>
      </div>
    </div>
    <ul class="pagination" v-if="data.length > 10 || currentPage > 1">
      <li class="pagination-item" title="a">
        <button
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
        >
          1
        </button>
      </li>
      <li class="pagination-item" title="a">
        <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
        >
          1
        </button>
      </li>
      <li
        class="pagination-item"
        title="a"
        v-for="(page, index) in pages"
        :key="index"
      >
        <button
          type="button"
          @click="onClickPage(page.number)"
          :class="{ activo: isPageActive(page.number) }"
        >
          >
          {{ page.number }}
        </button>
      </li>
      <li class="pagination-item" title="a">
        <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
          >last
        </button>
      </li>

      <li class="pagination-item" title="a">
        <button type="button" @click="onClickLastPage" :disabled="isInLastPage">
          >last
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Pagination",
  props: {
    data: {
      type: Array,
      required: true
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    paginationData() {
      let start = (this.currentPage - 1) * this.perPage,
        end = start + this.perPage;
      return this.data.slice(start, end);
    },
    startPage() {
      if (this.currentPage === 1) return 1;
      if (this.currentPage === this.totalPages)
        return (
          this.totalPages -
          this.maxVisibleButtons +
          (this.maxVisibleButtons - 1)
        );
      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      let range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage
        });
      }
      return range;
    },
    methods: {
      onClickFirstPage() {
        this.$emit("pagechanged", 1);
      },
      onClickPrevious() {
        this.$emit("pagechanged", this.currentPage - 1);
      },
      onClickPage(page) {
        this.$emit("pagechanged", page);
      },
      onClickNextPage() {
        this.$emit("pagechanged", this.currentPage + 1);
      },
      onClickLastPage() {
        this.$emit("pagechanged", this.totalPages);
      },
      isPageActive(page) {
        return this.currentPage === page;
      },
      onPageChange(page) {
        this.currentPage = page;
      }
    }
  }
};
</script>
<style></style>
