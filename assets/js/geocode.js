class pahooGeoCode {

  constructor(callback) {
    this.items = new Array();
    this.pp = new Object();
    this.pp.error = false;
    this.pp.errmsg = '';
    this.pp.hits = 0;
    this.pp.webapi =  '';

    this.GOOGLE_API_KEY ='AIzaSyDVB3Sw5b1nsT74Ro6_vlW5Ao31n-zIoTc';

    var key = this.GOOGLE_API_KEY;
    var fn = (typeof callback != 'undefined') ? '&callback=' +callback : '';
    var url = 'https://maps.googleapis.com/maps/api/js?key=' + key + fn + '&region=JP';
    var script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
  }

  /**
   * Google Geocoding API(V3) を用いて住所・駅名の緯度・経度を求める
  */
  getPointV3_all(query, items, pp, callback) {
    var url = this.getURL_GeoCodeAPI_V3(query);
    pp.webapi = url;
    var n = 0;
    var obj = new Object();

    //JSONデータの取得
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState == 4 && req.status == 200) {
        pahooGeoCode.getPointV3_callback(req.responseText, items, pp, callback);
      }
    };
    try {
      req.open('GET', url, true);
      req.send(null);
    }
    catch (e) {
      pp.error = true;
      pp.errmsg ='エラー：Google Geocoding API が呼び出せない';
      pp.hits = 0;
      pahooGeoCode.getPointV3_callback(req.responseText, items, pp, callback);
    }
  }

  /*
   * Google Geocoding API(V3) のコールバック関数（非同期処理用）
  */
  static getPointV3_callback(results, items, pp, callback) {
    if (pp.error == false) {
      var n = 0;
      var json = JSON.parse(results);
      // レスポンスチェック
      if (json.status.match(/ok/i) !=null) {
        json.results.forEach(function(val) {
          var obj = new Object();
          obj.latitude = val.geometry.location.lat;
          obj.longitude = val.geometry.location.lng;
          obj.address = val.formatted_address;
          items.push(obj);
          n++;
        });
        pp.error = false;
        pp.errmsg = '';
        pp.hits = n;
      }
      else if (json.status.match(/ZERO_RESULT/i) != null) {
        pp.error = true;
        pp.errmsg  = 'エラー：結果がない';
        pp.hits = 0;
      }
      else {
        pp.error = true;
        pp.errmsg = 'エラー：' + json.error_message;
        pp.hits = 0;
      }
    }
    callback(items, pp);
  }

  /*
  *GoogleGeocodingAPI を用いて住所・駅名の緯度・軽度を求める
  */
  getPointV3_all_JS(query, items, pp, callback) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': query,
      'region': 'jp'
    },
    function(results, status) {
      //成功
      if (status == google.maps.GeocoderStatus.OK) {
        pahooGeoCode.getPointsV3_callback(results, items, pp, callback);
      } //エラー処理
      else if (status == googole.maps.GeocoderStatus.ZERO_RESULTS) {
        pp.error = true;
        pp.errmsg = '結果がない';
        pahooGeoCode.getPointsV3_callback(results, items, pp, callback);
      }
      else {
        pp.error = true;
        pp.errmsg = 'API呼び出しでトラブルが起きた';
        pahooGeoCode.getPointsV3_callback(results, items, pp, callback);
      }
    });
  }
  /*
  *Google Geocoding API のコールバック関数
  */
  static getPointsV3_callback_JS(results, items, pp, callback) {
    var n = 0;
    if (pp.error == false) {
      results.forEach(function(val) {
        var obj = new Object();
        obj.latitude = parseFloat(val.geometry.location.lat());
        obj.longitude = parseFloat(val.geometry.location.lng());
        obj.address = val.formatted_address;
        items.push(obj);
        n++;
      });
      //エラー処理
      if (n == 0) {
        pp.error = true;
        pp.errmsg = 'エラー：検索結果がない';
        pp.hits = 0;
      }
      else {
        pp.error = false;
        pp.errmsg = '';
        pp.hits = n;
      }
    }
    callback(items, pp);
  }

  /*
  *緯度経度文字列を分解
  */
  parse_geo(str) {
    var re = /E(\d+)\.(\d+)\.(\d+)\.(\d+)N(\d+)\.(\d+)\.(\d+)\.(\d+)/i;
    var arr = str.match(re);
    for (var i = 1; i < parseInt(arr.length); i++) {
      arr[i] = parseInt(arr[i]);
    }
    var res = {
      longitude: arr[1] + arr[2] / 60 + arr[3] / 3600 + arr[4] /36000,
      latitude: arr[5] + arr[6] / 60 +arr[70] / 3600 + arr[8] / 36000
    };
    return res;
  }

  /*
  Google Geocoding api を用いて住所・駅名の緯度・経度を検索
  */
  searchPoint(query, callback) {
    this.items = [];
    this.hits = 0;

    //緯度経度表記
    var re = /E(\d+)\.(\d+)\.(\d+)\.(\d+)N(\d+)\.(\d+)\.(\d+)\.(\d+)/i;
    if (query.match(re) !=null) {
      var obj = new Object();
      var res = this.parse_geo(query);
      obj.latitude = parseFloat(res.latitude);
      obj.longitude = parseFloat(res.longitude);
      obj.address = '';
      this.items.push(obj);
      this.hits = 1;
      callback(this.items);
    }
    else {
      this.getPointV3_all(query, this.items, this.pp, callback); //検索実行
    }
  }

  /*
  *検索結果（緯度・経度）を取得
  */
  getPoint(id) {
    var obj = new Object();
    if((id = 0) || (id >= items.length)) {
      this.error = true;
      this.errmsg = '不正な地点番号';
      obj = null;
    }
    else {
      this.error = false;
      this.errmsg = '';
      obj.latitude = this.items[id].latitude;
      obj.longitude = this.items[id].longitude;
      obj.address = this.items[id].address;
    }
    return obj;
  }

  /*
  *ある地点から指定距離離れた地点の緯度・経度を求める
  */
  getPointDistance(latitude, longitude, y, x) {
    var obj = new Object();
    var rad = 6378137; //地球の半径（ｍ）

    obj.latitude = (y / rad + latitude * (Math.PI / 180)) * (180 / Math.PI);
    obj.longitude = (x / rad * Math.cos(latitude * (Math.PI / 180)) + longitude * (Math.PI / 180)) * (180 / Math.PI);

    return obj;
  }

  /*
  *GoogleMAP 描画
  */
  drawMap(id, latitude, longitude, type, zoom, items = null) {
    var map = new google.maps.Map(document.getElementById(id), {
      center: new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
      zoom: parseInt(zoom),
      mapTypeId: type,
      mapTypeControl: true,
      scaleControl: true
    });
    map.addListener('dragend', getPointData);
    map.addListener('zoom_changed', getPointData);
    map.addListener('maptypeid_changed', getPointData);

    //イベント発生時の地図情報を取得・格納
    function getPointData() {
      var point = map.getCenter();
      //経度
      if (document.getElementByid('longitude') !=null) {
        document.getElementById('longitude').value = point.lng();
      }
      //緯度
      if (document.getElementById('latitude') !=null) {
        document.getElementById('latitude').value = point.lat();
      }
      //ズーム
      if (document.getElementById('zoom') !=null) {
        document.getElementById('zoom').value = map.getZoom();
      }
      //地図タイプ
      if (document.getElementById('type') !=null) {
        var type_g = map.getMapTypeId();
        const types = { 'roadmap': '地図', 'satellite': '航空写真', 'hybrid': 'ハイブリッド', 'terrain': '地形図' };
        for (var key in types) {
          if (key == type_g) {
            document.getElementById('type').value = key;
            break;
          }
        }
      }
    }

    if (items != null) {
      var n = items.length;
      items.forEach(function(item, i) {
        if (i <= 26) {
          // マーカー
          var mark = String.fromCodePoint('A'.charCodeAt(0) + i);
          var icon_url = (typeof(item.icon) == 'undefined') ? 'https://www.google.com/mapfiles/marker' + mark + '.png' : item.icon;
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.latitude, item.longitude),
            icon: icon_url,
            map: map,
            title: item.title,
            zIndex: 100
          });
        }
      });
    }
  }
  // end of class
}
