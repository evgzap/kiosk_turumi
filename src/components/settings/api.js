const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

var WooCommerce = new WooCommerceRestApi({
    url: 'https://turumi.ru',
    consumerKey: 'ck_0c1a9c67cb1973229d643aafcc77359f44f34f05',
    consumerSecret: 'cs_dca4390fd15c26493a28bf5683c3394554a359e3',
    version: 'wc/v3',
    queryStringAuth: false
})

export async function getCategories(){
    var mainCategories = [] //Основной массив который отправится обратно
    await WooCommerce.get("products/categories?per_page=100").then((response) => {
        var categories = response.data;
        var subCategories = [] //Массив с подкотегорями 
        for(var i = 0; i < categories.length; i++){
            if(categories[i].parent == 0){
                mainCategories.push(categories[i]) //добавление в основной массив категорию если она основная
            }else{
                subCategories.push(categories[i]) //добавление в массив категории которая имеет атрибует дочерности
            }
        }
        //Алгоритм который добавляет к основому объекту категории, подобъект если он относится к нему
        for(var i = 0; i< mainCategories.length; i++){
            var SC = [] //временный массив для сбора подкотегорий для одного родителя
            for(var j = 0; j< subCategories.length; j++){
                if(mainCategories[i].id == subCategories[j].parent){
                    SC.push(subCategories[j]) // добавления подкатегорий к массиву который потом прикрепится к нужной категории
                    mainCategories[i].subCheck = true
                }
                
            }
            mainCategories[i].subCategories = SC //добавления подкотегорий к основной категории.
            
        }
    })
    return mainCategories
}
export async function getMainProducts(count, id){
    var arr = []
    var arr2 = []
    console.log(id)
    await WooCommerce.get("products?category="+id+"&per_page="+count+"&purchasable=true").then((response)=>{
        for (var i = 0; i < response.data.length; i++){
            if (response.data[i].images.length == 0){
                if(response.data[i].price == ''){
                }
            }else{
                arr.push(response.data[i])
            }
        }
    })
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].categories.length; j++){
            if(arr[i].categories[j].slug == "new"){
                arr[i].is_new = true
            }
        }
    }
    return arr
}

export async function getProducts(id){
    var product = []
    await WooCommerce.get("products/"+id).then((response)=>{
        product = response.data
    })
    for(var i = 0; i < product.categories.length; i++){
        if(product.categories[i].slug == "new"){
            product.is_new = true
        }
    }
    return product
}