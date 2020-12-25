<template>
  <div class="wrapper">
    <div class="right_wrapper">
      <div class="showItem">
        <div class="is_load" v-if="is_load">
          <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        </div>
        <div class="product" v-else>
          <div class="half">
            <div class="image">
              <img :src="product.images[0].src" alt="" />
            </div>
            <div class="short_desc" v-html="product.short_description"></div>
          </div>
          <div class="half">
            <div class="name">
              {{ product.name }}
            </div>
            <div class="categories_product">
              <div class="category_name">Категории:</div>
              <div
                class="category"
                v-for="(item, i) in product.categories"
                :key="i"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="count">
              <div class="category_name">Количество:</div>
              <div class="input">
                <div class="minus" @click="change_count(false)">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                </div>
                <input type="number" v-model="count" disabled />
                <div class="plus" @click="change_count(true)">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </div>
              </div>
              <div class="price">
                <div class="text">
                  Цена за 1шт :
                </div>
                <div class="item_price" v-if="product.on_sale">
                  <div class="old_price_item">
                    {{ product.regular_price }}
                  </div>
                  <div class="new_price_item">
                    {{ product.price }}
                  </div>
                  <i class="fa fa-rub" aria-hidden="true"></i>
                </div>
                <div class="item_price" v-else>
                  <div class="new_price_item">
                    {{ product.price }}
                  </div>
                  <i class="fa fa-rub" aria-hidden="true"></i>
                </div>
              </div>
              <div class="input"></div>
              <div class="price">
                <div class="text">
                  Цена за {{count}}шт :
                </div>
                <div class="item_price" v-if="product.on_sale">
                  <div class="old_price_item">
                    {{ product.regular_price * count}}
                  </div>
                  <div class="new_price_item">
                    {{ product.price * count}}
                  </div>
                  <i class="fa fa-rub" aria-hidden="true"></i>
                </div>
                <div class="item_price" v-else>
                  <div class="new_price_item">
                    {{ product.price * count}}
                  </div>
                  <i class="fa fa-rub" aria-hidden="true"></i>
                </div>
              </div>
              <div class="makeBasket">
                <div class="btn" @click="makeBasket(product)">
                  Добавить в корзину
                </div>
              </div>
            </div>
            <div class="count">
              <div class="category_name">Открыть на сайте:</div>
              <div class="qr">
                <img :src="qr_src" alt="">
              </div>
            </div>
          </div>
          <div class="center">
            <div class="discription" v-html="product.description"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/styles/product.scss";
import { getProducts } from "@/components/settings/api";
export default {
  data: () => ({
    product: [],
    is_load: true,
    count: 1,
    qr_src:'',
  }),
  methods:{
    change_count(check){
      if(!check){
        this.count-=1
        if(this.count <=1){
          this.count = 1
        }
      }
      if(check){
        this.count+=1
        if(this.count >=10){
          this.count = 10
        }
      }
    },
    makeBasket(item){
      alert("Товар "+ item.name+" Добавлен")
      var itemForBasket = []
      itemForBasket.name = item.name
      itemForBasket.id = item.id
      itemForBasket.price = item.regular_price
      itemForBasket.count = this.count;
      itemForBasket.image = item.images[0].src
      this.$store.state.basket.push(itemForBasket)
      console.log(this.$store.state.basket)
    }
  },
  mounted() {
    if (this.$route.params.id != undefined) {
      getProducts(this.$route.params.id).then((response) => {
        var sizeQr = 200
        this.product = response;
        document.title = "Turumi | " + response.name;
        console.log(response)
        this.$store.state.nameTitle = "Turumi | " + response.name;
        this.qr_src = "https://api.qrserver.com/v1/create-qr-code/?size="+sizeQr+"x"+sizeQr+"&data="+response.permalink+"&color=5181b8&bgcolor=fff&format=svg&ecc=L"
        this.is_load = false;
      });
    }
  },
};
</script>