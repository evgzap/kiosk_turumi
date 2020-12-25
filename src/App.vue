<template>
  <div id="app">
    <div id="nav">
      <div class="logo">
        <router-link to="/"
          ><span @click="clickTest(87, true, 12, 'Основные товары')"
            >123</span
          ></router-link
        >
      </div>
      <div class="name">
        {{ this.$store.state.nameTitle }}
      </div>
      <div class="rightNav">
        <div class="time">
          {{ localeDate }}
        </div>
        <div class="basket">
          <router-link to="/card"
            >Ваша корзина
            <i class="fa fa-shopping-basket" aria-hidden="true"></i
          ></router-link>
        </div>
      </div>
    </div>
    <div class="categories">
      <!-- {{$route.params.id}} -->
      <router-link
        class="category"
        v-for="(item, i) in categories"
        :key="i"
        :class="{ haveSub: item.subCheck }"
        to="/"
      >
        <div class="mainCategory">
          <div
            class="nameMainCategory"
            @click="clickTest(item.id, false, 500, item.name)"
          >
            {{ item.name }}
          </div>

          <i
            class="fa fa-arrow-right"
            aria-hidden="true"
            v-if="item.subCheck"
          ></i>
          <div class="image" v-else>
            <img
              src="https://www.flaticon.com/svg/static/icons/svg/2346/2346242.svg"
            />
          </div>
        </div>
        <!-- Подкотегория показывается если она существвует -->
        <div class="subCategory" v-if="item.subCheck">
          <div
            class="unitSubCategory"
            v-for="(category, j) in item.subCategories"
            :key="category.id"
          >
            <div
              class="nameSubCategory"
              @click="clickTest(category.id, false, 500, category.name)"
            >
              {{ category.name }}
            </div>
            <div class="image">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/2346/2346242.svg"
              />
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="right" v-if="this.$store.state.loadSite">
      <router-view :newCheck="newCheck" :key="newCheck.selectIdCategories" />
    </div>
    <div class="right" v-else>
      <h3>Ошибка: 403. Устройство заблокировано или не зарегистрировано </h3>
    </div>
    <!-- <footer>
      <div class="leftHalf">
        <div class="btn" @click="prev">
          Назад
        </div>
      </div>
      <div class="rightHalf">
        <div class="btn" @click="next">
          Вперед
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script>
import "./assets/styles/main.scss";
import "./assets/fa/scss/font-awesome.scss";
import router from "vue-router";
import { getCategories } from "@/components/settings/api";
export default {
  data: () => ({
    categories: [],
    action: "test",
    newCheck: {
      baner: true,
      count: 12,
      selectIdCategories: 87,
    },
    ip: "",
    loadSite: true,
    date: Date.now(),
  }),
  computed: {
    localeDate() {
      return (
        (new Date(this.date).getHours() < 10
          ? "0" + new Date(this.date).getHours()
          : new Date(this.date).getHours()) +
        " : " +
        (new Date(this.date).getMinutes() < 10
          ? "0" + new Date(this.date).getMinutes()
          : new Date(this.date).getMinutes()) +
        " : " +
        (new Date(this.date).getUTCSeconds() < 10
          ? "0" + new Date(this.date).getUTCSeconds()
          : new Date(this.date).getUTCSeconds())
      );
    },
  },
  created() {
    this.intervalId = setInterval(() => (this.date = Date.now()), 1000);
  },
  methods: {
    clickTest(i, baner, count, title) {
      console.log(title);
      document.title = "Turumi | " + title;
      this.$store.state.nameTitle = "Turumi | " + title;
      console.log(this.$store.state.nameTitle);
      this.newCheck.baner = baner;
      this.newCheck.count = count;
      this.newCheck.selectIdCategories = i;
      this.$route.params.id = undefined;
    },
    prev() {
      window.history.back();
    },
    next() {
      window.history.forward();
    },
    getIp(response) {
      this.ip = response.ip;
      console.log(this.ip);
      this.$store.state.loadSite = true;
      if (this.$store.state.loadSite) {
        getCategories().then((response) => {
          this.categories = response;
        });
      }
    },
  },
  mounted() {
    document.title = "Turumi | " + "Товары недели";
    this.$store.state.nameTitle = "Turumi | " + "Товары недели";

    fetch("https://ipapi.co/json/").then((response) => {
      response.json().then((r) => {
        this.getIp(r);
      });
    });
  },
};
</script>