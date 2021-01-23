<template>
  <div class="wrapper">
    <div id="Home" class="main-wrapper">
      <div id="Profile" class="section">
        <section-title><i class="f-icon fas fa-user-alt"></i>Profile</section-title>
        <div class="pro-section">
          <div class="pro-icon">
            <img src="../assets/img/profile.png" class="myicon" />
          </div>
          <div class="subsection">
            <h3><i class="fas fa-basketball-ball"></i><b>自己紹介</b></h3>
            <p class="media">
              はじめまして。平成4年生まれの「さわだ」と申します。出身は大阪府。<br />
              奈良県にある管理栄養士養成の4年制大学を卒業し、管理栄養士の資格を取得。<br />
              新卒で食品メーカーの営業として九州にて3年勤務。佐賀県に住んでいました。主に九州全域の小売店を得意先としている支店で勤務し、
              自分は南のエリア（宮崎県など）を主に担当していました。<br />
              2017年3月に大阪へ帰還し、急性期の総合病院へ管理栄養士として2年勤務。入院患者の栄養管理や、入院・外来患者の栄養指導を主に担当。
              2年間で約500件の栄養指導を受けさせて頂きました。<br />
              その後、自分で稼いで食べていける力を身に着けたいと思い、副業で何かできないかと調べていたところ、プログラミングに出合う。
              おなじみProgateから着手し、自分の手で動かせることに感動。思い切ってエンジニアを目指すことを決意し、
              TechAcademyのフロントエンドコースを受講。まだまだ修行中ですが、今に至ります。<br />
              運動とお酒と人と喋るのが好きです。九州で焼酎が好きになりました。一番好きなのはビール。<br />
              ●出身：大阪府吹田市<br />
              ●住んだことのある町：大阪府⇒｛吹田市、豊中市、大阪市、河内長野市｝、奈良県、佐賀県<br />
              ●保有資格：管理栄養士、フードスペシャリスト<br />
              ●趣味：料理、バスケットボール、アルティメット、読書
            </p>
          </div>
        </div>
      </div>
      <div id="Skills" class="section">
        <section-title><i class="f-icon far fa-list-alt"></i>Skills</section-title>
        <p class="text">学んだスキルです</p>
          <div class="skills-list clearfix">
            <ul>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>JavaScript</li>
            </ul>
            <ul>
              <li>Vue.js</li>
              <li>Nuxt.js</li>
              <li>jQuery</li>
            </ul>
          </div>
        </div>
      <div id="Works" class="section">
        <section-title><i class="f-icon fas fa-laptop"></i>Works</section-title>
        <p class="text">今まで私が開発に携わったものです</p>
        <div class="w-items">
          <div class="sample col-md-4">
            <nuxt-link to="/gnavi-map">ぐるなびMap</nuxt-link>
            <img src="../assets/img/gnavimap.png" class="sample-image">
          </div>
          <div class="sample col-md-4">
            <nuxt-link to="/">プロフィールサイト</nuxt-link>
            <img src="../assets/img/siteImage.png" class="sample-image">
          </div>
          <div class="sample col-md-4">
            <nuxt-link to="/ToDo">ToDoリスト</nuxt-link>
            <!--<img src="../assets/img/siteImage.png" class="sample-image">-->
          </div>
        </div>
      </div>
      <div id="Nutrition" class="section">
        <section-title><i class="f-icon fas fa-utensils"></i>Nutrition</section-title>
        <h5 class="text">栄養相談について</h5>
        <p class="text">
          今まで、約500件の栄養指導、栄養相談を受けてきました。<br />
          日頃のお食事でお困りのことなどがありましたら、お気軽にお問い合わせ下さい。
        </p>
        <p class="text">
          対象疾患：糖尿病、腎臓病、高血圧、高尿酸血症、脂質異常症、肝臓病 等
        </p>
      </div>
      <div id="Contact" class="section">
        <section-title><i class="f-icon fas fa-envelope"></i>Contact</section-title>
        <p class="text"><span class="mail">xxxxx@gmail.com</span></p>
        <p class="text">or</p>
        <ul class="sns">
          <li><a href="https://twitter.com/f60sawa"><i class="twitter fab fa-twitter"></i></a></li>
          <li><a href="https://www.facebook.com/yusaku.sawada.1"><i class="fab fa-facebook-f"></i></a></li>
        </ul>
      </div>
    </div>
    <footer id="footer">
      <div class="inner">
        <p class="copyright">Copyright©Yusaku Sawada. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
  
</template>

<script>
  import SectionTitle from '../components/section-title.vue';
  export default {
    components: {
      SectionTitle
    },
    created() {
      // process.client内に記述したコードは
      // クライアントコードとして実行する
      // 例えば、process.client判定しないでwindowオブジェクトを覗こうとすると
      // Nuxt.jsはサーバーサイドの言語として実行しているのでエラーになる
      if (process.client) {
        console.log('jQuery読み込みのチェック', window.$);
      }
    },
  };
</script>

<style scoped>
  p {
    font-size: 18px;
  }

  .wrapper {
    background-color: #f3f3f3;
    font-family: 'Oswald', sans-serif;
    ;
    width: fit-content;
    margin-top: 100px;
  }

  .main-wrapper {
    margin: -20px 10%;
    width: 80%;
  }

  .section {
    padding: 50px 0;
  }

  .pro-section {
    display: flex;
  }

  .text {
    text-align: center;
  }

  .sub-section {
    width: 60%;
  }

  .pro-icon {
    margin: 0 10px;
  }

  .myicon {
    width: 90%;
    border-radius: 50%;
  }

  .clearfix:after {
    content: "";
    clear: both;
    display: block;
  }

  .skills-list {
    text-align: center;

  }

  .skills-list ul {
    float: left;
    width: 50%;
  }

  .skills-list li {
    font-size: 2rem;
    list-style: none;
    margin: 0 auto;
  }

  .f-icon {
    margin-right: 8px;
  }


  .mail {
    font-size: 27px;
    background-color: #666;
    color: white;
  }

  .sns {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding-right: 40px;
  }

  .sns li {
    display: inline-block;
    list-style: none;
    padding: 0px 16px;
    font-size: 80px;
  }

/* Works */
  .w-items {
    display: flex;
    justify-content: center;
  }
  
  .sample-image {
    width: 100%;
  }

  .sample {
    height: 200px;
    width: 200px;
    border: solid 1px black;
    background-color: #f3f3f3;
    margin: 0 5px;
    border-radius: 5%;
  }

  footer {
    margin-top: 35px;
    background-image: url(../assets/img/backblack.png);
  }

  #f-gnav ul {
    display: flex;
    justify-content: center;
  }

  #f-gnav li {
    list-style: none;
    padding: 0 25px;
    font-size: 20px;
  }

  #f-gnav a {
    text-decoration: none;
    color: white;
  }

  .copyright {
    text-align: center;
    color: white;
  }

  /* スマホ表示 */

  @media (max-width: 670px) {
    .pro-section {
      display: block;
    }

    .pro-icon {
      width: 70%;
      margin: 0 auto;
    }
    .skills-list ul {
      width: 100%;
    }
  }
</style>
