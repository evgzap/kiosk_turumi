<template>
  <div class="wrapper">
    <div class="right_wrapper">
      <div class="card">
        <div class="name_section">Ваша корзина</div>
        <div class="cardItems">
          <div class="cardItem">
            <div class="image_product"></div>
            <div class="name_product">Нзавание</div>
            <div class="count_product">Количество</div>
            <div class="price_product">Сумма за 1шт:</div>
            <div class="price_product">Сумма:*</div>
          </div>
          <div class="cardItem" v-for="(item, i) in card" :key="i">
            <div class="image_product">
              <img :src="item.image" alt="" />
            </div>
            <div class="name_product">
              {{ item.name }}
            </div>
            <div class="count_product">
              <div class="input full">
                <div class="minus" @click="change_count(false, i)">
                  <i class="fa fa-minus" aria-hidden="true"></i>
                </div>
                {{ item.count }}
                <div class="plus" @click="change_count(true, i)">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            <div class="price_product one">
              {{ item.price }} <i class="fa fa-rub" aria-hidden="true"></i>
            </div>
            <div class="price_product">
              {{ item.price * item.count }}
              <i class="fa fa-rub" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <p>*Сумма предоставлена за количество данного товара</p>
        <div class="center">
          <div class="left_price">
            <div class="text">Для уведомления о акциях</div>
            <div class="inputsForSales">
              <input type="text" placeholder="Ваша почта" />
              <input type="num" placeholder="Ваш телефон" />
            </div>
          </div>
          <div class="right_price">
            <div class="text">Итого:</div>
            <div class="prices">
              {{ total_price }} <i class="fa fa-rub" aria-hidden="true"></i>
            </div>
          </div>
          <div class="center">
            <div class="qr">
              <div class="text">
                Открыть в приложении
              </div>

              <img :src="srcQr" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/styles/card.scss";
export default {
  data: () => ({
    card: undefined,
    total_price: 0,
    srcQr: 'turumi.ru',
  }),
  methods: {
    change_count(check, i) {
      console.clear();
      if (!check) {
        this.card[i].count--;
        if (this.card[i].count <= 1) {
          this.card[i].count = 1;
        }
      }
      if (check) {
        this.card[i].count++;
        if (this.card[i].count >= 10) {
          this.card[i].count = 10;
        }
      }

      this.total();
      this.$forceUpdate();

      console.log(this.card[i].count, i);
    },
    total() {
      this.total_price = 0;
      for (var i = 0; i < this.card.length; i++) {
        console.log(i);
        this.total_price += this.card[i].count * this.card[i].price;
      }
     
      this.srcQr = this.getQr()
    },
    getQr(){
      var json = []
      var sizeQr = 200
      for(var i = 0; i < this.card.length; i++){
        json.push({
          id: this.card[i].id,
          count: this.card[i].count
        })
      }
      
      if(json == []){
        json = "turumi.ru"
        return "https://api.qrserver.com/v1/create-qr-code/?size="+sizeQr+"x"+sizeQr+"&data="+json+"&color=5181b8&bgcolor=fff&format=svg&ecc=L"
      }
      json = JSON.stringify(json)
      return "https://api.qrserver.com/v1/create-qr-code/?size="+sizeQr+"x"+sizeQr+"&data="+json+"&color=5181b8&bgcolor=fff&format=svg&ecc=L"
    }
  },
  computed:{

  },
  mounted() {
    this.card = this.$store.state.basket;
    console.clear();
    this.total();
  },
};
</script>