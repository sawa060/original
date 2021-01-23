<template>
  <div>
    <header id="top-head">
      <div class="inner">
        <div id="mobile-head">
          <h1 class="logo">Yusaku Sawada's Portfolio</h1>
          <div id="nav-toggle">
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <nav id="global-nav">
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li><a href="#Profile">Profile</a></li>
            <li><a href="#Skills">Skills</a></li>
            <li><a href="#Works">Works</a></li>
            <li><a href="#Nutrition">Nutrition</a></li>
            <li><a href="#Contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
    <div>
      <nuxt />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BootstrapVuw from 'bootstrap-vue'

  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    created() {
      // process.client内に記述したコードは
      // クライアントコードとして実行する
      // 例えば、process.client判定しないでwindowオブジェクトを覗こうとすると
      // Nuxt.jsはサーバーサイドの言語として実行しているのでエラーになる
      if (process.client) {
        console.log('jQuery読み込みのチェック', window.$);

        $(function() {
          // ヘッダーの固定
          var $header = $('#top-head');
          // Nav Fixed
          $(window).scroll(function() {
            if ($(window).scrollTop() > 350) {
              $header.addClass('fixed');
            }
            else {
              $header.removeClass('fixed');
            }
          });
          // Nav Toggle Button
          $('#nav-toggle').click(function() {
            $header.toggleClass('open');
          });

          // モバイルメニュー時、クリックしたらメニューを閉じる
          $('#global-nav a[href]').click(function() {
            $header.toggleClass('open');
          });


          // スクロールのアニメーション
          $("#global-nav a").click(function() {
            var destination = $(this).attr("href");
            $("html, body").animate({
              scrollTop: $(destination).offset().top,
            }, 800);

            return false;
          });
        });
      }
    }
  }
</script>

<style scoped>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Oswald, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    background-color: #f3f3f3;
  }

  .inner {
    width: 980px;
    margin: 0 auto;
  }

  .inner:after {
    content: "";
    clear: both;
    display: block;
  }

  /* header */

  #top-head {
    top: -100px;
    position: absolute;
    width: 100%;
    margin: 100px auto 0;
    padding: 30px 0 0;
    line-height: 1;
    z-index: 999;
    background-image: url('../assets/img/backblack.png');
  }

  #top-head a,
  #top-head {
    color: #fff;
    text-decoration: none;
  }

  #top-head .inner {
    position: relative;
  }

  #top-head .logo {
    float: left;
    font-size: 36px;
    position: relative;
    top: -10px;
    left: -30px;

  }

  #global-nav ul {
    list-style: none;
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 14px;
    padding-bottom: 0px;
  }

  #global-nav ul li {
    float: left;
    transition: 2s;
    font-size: 16px;
  }

  #global-nav ul li:hover {
    background-color: #c0c0c0;
    transform: rotateX(360deg);
  }



  #global-nav ul li a {
    padding: 0 20px;
  }



  /* Fixed */

  #top-head.fixed {
    margin-top: 0;
    top: 0;
    position: fixed;
    padding-top: 10px;
    height: 55px;
    background: black;
    background: rgba(0, 0, 0, .7);
    transition: top 0.65s ease-in;
    -webkit-transition: top 0.65s ease-in;
    -moz-transition: top 0.65s ease-in;
  }

  #top-head.fixed .logo {
    font-size: 24px;
    color: white;
  }

  #top-head.fixed #global-nav ul li a {
    color: white;
    padding: 0 20px;
  }

  /* Toggle Button */

  #nav-toggle {
    display: none;
    position: absolute;
    right: 12px;
    top: 14px;
    width: 34px;
    height: 36px;
    cursor: pointer;
    z-index: 101;
  }

  #nav-toggle div {
    position: relative;
  }

  #nav-toggle span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: #666;
    left: 0;
    -webkit-transition: .35s ease-in-out;
    -moz-transition: .35s ease-in-out;
    transition: .35s ease-in-out;
  }

  #nav-toggle span:nth-child(1) {
    top: 0;
  }

  #nav-toggle span:nth-child(2) {
    top: 11px;
  }

  #nav-toggle span:nth-child(3) {
    top: 22px;
  }

  /* タブレット表示 */

  @media (max-width: 1000px) {
    #top-head,
    .inner {
      width: 100%;
      padding: 0;
      background: black;
      background: rgba(0, 0, 0, .7);
    }
    #top-head {
      top: 0;
      position: fixed;
      margin-top: 0;
    }
    .logo {
      font-size: 26px;
    }
    /* Fixed reset */
    #top-head.fixed {
      padding-top: 0;
      background: transparent;
    }
    #mobile-head {
      background: black;
      background: rgba(0, 0, 0, .7);
      width: 100%;
      height: 56px;
      z-index: 999;
      position: relative;
      padding-bottom: 80px
    }
    #top-head.fixed .logo,
    #top-head .logo {
      position: absolute;
      left: 0px;
      top: 0px;
      color: white;
      font-size: 26px;
    }
    #global-nav {
      position: absolute;
      /* 開いてないときは画面外に配置 */
      top: -500px;
      background: #333;
      width: 100%;
      text-align: center;
      padding: 10px 0;
      -webkit-transition: .5s ease-in-out;
      -moz-transition: .5s ease-in-out;
      transition: .5s ease-in-out;
    }
    #global-nav ul {
      list-style: none;
      position: static;
      right: 0;
      bottom: 0;
      font-size: 14px;
    }
    #global-nav ul li {
      float: none;
      position: static;
    }
    #top-head #global-nav ul li a,
    #top-head.fixed #global-nav ul li a {
      width: 100%;
      display: block;
      color: #fff;
      padding: 18px 0;
    }
    #top-head #global-nav ul li a,
    #top-head.fixed #global-nav ul li:first-child {
      padding-top: 30px;
    }


    #nav-toggle {
      display: block;
    }
    /* #nav-toggle 切り替えアニメーション */
    .open #nav-toggle span:nth-child(1) {
      top: 11px;
      -webkit-transform: rotate(315deg);
      -moz-transform: rotate(315deg);
      transform: rotate(315deg);
    }
    .open #nav-toggle span:nth-child(2) {
      width: 0;
      left: 50%;
    }
    .open #nav-toggle span:nth-child(3) {
      top: 11px;
      -webkit-transform: rotate(-315deg);
      -moz-transform: rotate(-315deg);
      transform: rotate(-315deg);
    }
    /* #global-nav スライドアニメーション */
    .open #global-nav {
      /* #global-nav top + #mobile-head height */
      -moz-transform: translateY(556px);
      -webkit-transform: translateY(556px);
      transform: translateY(556px);
    }


    .skills-list ul {
      width: 100%;
    }
  }

 
</style>
