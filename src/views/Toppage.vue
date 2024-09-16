<template>
  <div class="full-background">
    <div class="content-background">
      <div class="toppage">
        <div class="text-container">
          <h1><span class="big-A">A</span>naba</h1>
          <ul>
            <li>
              <router-link to="/spots">穴場スポット一覧</router-link>
            </li>
            <li>
              <router-link to="/map">穴場スポットMAP</router-link>
            </li>
          </ul>
        </div>
        <div class="logo">
          <img src="@/assets/camera8.svg" alt="Logo" class="logo-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

/* 背景は白のまま */
.full-background {
  background-color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  padding-top: 250px;
}

.toppage {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding-right: 50px;
}

.text-container {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.text-container h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 150px;
  text-align: left;
  margin: 0;
  color: orange;
  display: flex;
  align-items: flex-end;
}

.text-container h1 .big-A {
  font-size: 220px;
  line-height: 1;
  transform: translateY(-34px);
}

.text-container ul {
  list-style: none;
  padding: 0;
  margin-top: 5px;
  margin-left: 80px;
}

.text-container ul li {
  color: black;
  margin: 0px 0;
  font-size: 50px;
}

.text-container ul li a {
  color: black;
  text-decoration: none;
}

.logo {
  position: absolute;
  right: 250px;
  margin-top: 60px;
}

.logo-image {
  width: 400px;
  height: auto;
}
</style>
