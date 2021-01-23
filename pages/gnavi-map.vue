<template>
  <div>
    <div id="top-form">
      <h2 id="title">飲食店検索ツール</h2>
      <h4>使い方</h4>
      <p id="how-to">
        検索エンジンにキーワードを入力して検索を押すと、下のリストに検索結果が表示されます。
        表示されたお店のリストをクリックすると、下のMapに場所（ピン）が表示されます。
        リセットボタンを押すと、ピンが消去されます。
      </p>
  <!-- 入力フォーム -->
      <form name="myform">
        <input type="text" id="query" name="query" placeholder="キーワードを入力" v-model="query" />
        <input type="button" id="exec"  name="exec"  value="検索" @click="searchKeyword()" />&nbsp;
        <input type="button" id="clear" name="clear" value="リセット" @click="deleteMakers(marker)"/><br />
      </form>
    </div>
    <div class="container">
        <ul id="shop-list">
          <li v-for="shop in shops" @click="codeAddress(shop)" class="each-shop" :key="shop.id">
            <div class="contents-list">
              <img :src="shop.img_url" class="shop_photo">
              {{ parentMessage1 }} <a :href="shop.url" class="shop-name" target="_blank">{{ shop.name }}</a><br>
              {{ parentMessage2 }} {{ shop.address }}<br>
              {{ parentMessage3 }} {{ shop.tel }}
            </div>
          </li>
        </ul>
      <div id="gmap"></div>
    </div>
  </div>
</template>

<script>
  import { key } from '../gnavi_key'

  export default {
    data() {
      return {
        parentMessage1: '店名：',
        parentMessage2: '住所：',
        parentMessage3: 'TEL：',
        shops: [],
        query: null,
        map: null,
        markers: [],
      };
    },
    mounted() {
      this.map = new google.maps.Map(document.getElementById('gmap'), {
        center: { lat: 34.698699, lng: 135.491591 },
        zoom: 14
      });
    },
    methods: {
      searchKeyword() {
        console.log('this.queryの中身 → ', this.query);

        var usp = new URLSearchParams();
        usp.append('keyid', key);
        usp.append('freeword', this.query);

        fetch('https://api.gnavi.co.jp/RestSearchAPI/v3/?' + usp.toString())
          .then((response) => {
            return response.json();
          })
          .then((json_object) => {
            this.makeList(json_object);
          });
      },
      makeList(json_object) {
        console.log('引数jsonの中身は → ', json_object);

        this.shops = json_object.rest.map(_ => {
          return {
            name: _.name,
            address: _.address,
            url: _.url,
            img_url: _.image_url.shop_image1,
            tel: _.tel
          };
        });

        console.log('this.shopsは =>', this.shops);
      },
      codeAddress(shop) {
        console.log('shop', shop);

        new google.maps.Geocoder().geocode({ address: shop.address }, (results, status) => {
          // ジオコーディングが成功した場合
          if (status == google.maps.GeocoderStatus.OK) {
            console.log(results);
            console.log(status);

            // 地図上に目印となるマーカーを設定
            // google.maps.Marker()コンストラクタにマーカーを設置するMapオブジェクトと
            // 変換した緯度・経度情報を渡してインスタンスを生成
            var ll = results[0].geometry.location;
            var marker = new google.maps.Marker({
              map: this.map,
              position: ll
            });
            this.markers.push(marker);

            // マーカの位置に地図を移動
            this.map.setCenter(ll);
            console.log('markers =>', this.markers);

            // マーカーに吹き出しを表示
            var infowindow = new google.maps.InfoWindow({
              content: '<a href=' + shop.url + 'target="_blank">' + shop.name + '</a>' + '<br />' + shop.address + '<br />' + shop.tel,
              maxWidth: 200
            });

            google.maps.event.addListener(marker, 'click', () => {
              infowindow.open(this.map, marker);
            });


            // ジオコーディングが成功しなかった場合
          }
          else {
            console.log('Geocode was not successful for the following reason: ' + status);
          }
        });
      },
      deleteMakers(marker) {
        if (this.markers != []) {
          this.markers.forEach((marker) => {
            marker.setMap(null)
          })
        }
        this.markers = [];
      },

    }
  };
</script>

<style scoped>
  #top-form {
    margin-top: 80px;
  }

  #top-form h4 {
    text-align: center;
  }


  #title {
    text-align: center;
    padding-top: 20px;
    font-family: "Nico Moji";
    ;
  }

  #how-to {
    margin: 0 5% 0 5%;
  }

  /* 検索フォーム */

  #query {
    border-radius: 2px 0 0 2px;
    background: #eee;
    margin-left: 5%;
  }

  #exec {
    border-radius: 0 2px 2px 0;
    background: #7fbfff;
    border: none;
    color: #fff;
    margin-left: 0;
  }

  #exec:hover {
    color: #666;
  }

  #clear {
    border-radius: 0 2px 2px 0;
    background: #FDC44F;
    border: none;
    color: #fff;
    margin-left: 0;
  }

  #clear:hover {
    color: #666;
  }

  /* マップとリストの配置 */
  .container {
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin-left: 0;
    margin-right: 0;
  }

  /* ショップリスト */

  .contents-list:after {
    content: " ";
    clear: both;
    display: block;
  }


  span {
    display: block;
  }

  .each-shop {
    margin: 10px;
    border-radius: 5px;
    box-shadow: 3px 3px 3px #5555;
    position: relative;
  }

  #shop-list {
    list-style: none;
    overflow: auto;
    width: 30%;
    height: 500px;
    opacity: 0.8;
    z-index: 10;
    padding: 5px;
    border: 1px solid #000;
    background-color: #F9F9F9;
    color: #000;
    float: left;
    position: absolute;
    left: 0;
  }

  .shop_photo {
    width: 80px;
    height: 80px;
    float: left;

  }

  .shop-name {
    font-weight: bold;
    border-bottom: solid 1px #5555;
  }

  /* マップ関連 */

  #gmap {
    height: 500px;
    width: 100%;
    margin: 0 auto;
    position: absolute;
    left: 0;
  }

  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  /* スマホ画面*/

  @media (max-width: 1000px) {
    .shop_photo {
      display: none;
    }
  }

  @media (max-width: 670px) {
    #shop-list {
    list-style: none;
    overflow: auto;
    width: 90%;
    height: 100px;
    margin: 0 auto;
    padding: 5px;
    border: 1px solid #000;
    background-color: #F9F9F9;
    color: #000;
    margin: 0 5% 0 5%;
    }
    #gmap {
    height: 400px;
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    margin: 0 5% 0 5%;
    }
    .container {
    width: 100%;
    display: block;

    }
  }

</style>
