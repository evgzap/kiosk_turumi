<template>
  <div class="wrapper">
    <div class="right_wrapper">
      <div class="banner" v-if="newCheck.baner">
        <div class="banner_item first" >
          <div class="name_baner">
            Акция 1
          </div>
          <div class="text_baner">
            Lorem, ipsum dolor.
          </div>
        </div>
        <div class="banner_item second">
          <div class="name_baner">
            Акция 2
          </div>
          <div class="text_baner">
            Lorem, ipsum dolor.
          </div>
        </div>
        <div class="banner_item thrid">
          <div class="name_baner">
            Акция 3
          </div>
          <div class="text_baner">
            Lorem, ipsum dolor.
          </div>
        </div>
      </div>
      <div class="showItem">
        <router-link class="item" v-for="(item, i) in mainProducts" :key="item.id" :to="makeLink(item.id)" :class="{ onsale : item.on_sale, isnew:item.is_new}">
          
          <div class="item_name">
            {{ item.name }}
          </div>
          <div class="item_image">
            <img :src="item.images[0].src" alt="">
          </div>
          <div class="item_price" v-if="item.on_sale">
            <div class="old_price_item">
              {{ item.regular_price }}
            </div>
            <div class="new_price_item">
              {{ item.price }}
            </div>
            <i
              class="fa fa-rub"
              aria-hidden="true"
            ></i>
          </div>
          <div class="item_price" v-else>
            <div class="new_price_item">
              {{ item.price }}
              </div>
              <i
              class="fa fa-rub"
              aria-hidden="true"
            ></i>
          </div>
        </router-link>
      </div>
      <div class="bannerBottom" v-if="newCheck.baner">
        <div class="banner_item first">
          <div class="name_baner">
            Акция 4
          </div>
          <div class="text_baner">
            Lorem, ipsum dolor.
          </div>
        </div>
        <div class="banner_item second">
          <div class="name_baner">
            Акция 5
          </div>
          <div class="text_baner">
            Lorem, ipsum dolor.
          </div>
        </div>
        <div class="banner_item thrid">
          <div class="name_baner">
            Акция 6
          </div>
          <div class="text_baner">
            Lorem, ipsum dolor.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from 'vue-router'
import HelloWorld from "@/components/HelloWorld.vue";
import { getCategories, getMainProducts } from "@/components/settings/api";
import "@/assets/styles/categories.scss";

export default {
  props:{
    id:Number,
    newCheck: Object
  },
  name: "Home",
  data: () => ({
    categories: [],
    mainProducts: [],
  }),
  components: {
    HelloWorld,
  },
  methods: {
    makeLink(id){
      return "/product/"+id
    }
  },
  mounted() {
    getMainProducts(this.newCheck.count, this.newCheck.selectIdCategories).then((response) => {
      this.mainProducts = response;
    });
  },
};
</script>
