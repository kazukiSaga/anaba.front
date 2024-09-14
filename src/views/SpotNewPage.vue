<template>
  <div class="spot-post-page">
    <main-header />
    <div class="spot-post-container">
      <h1>スポット投稿</h1>
      <div class="form-group">
        <label for="spot-title">タイトル</label>
        <input type="text" id="spot-title" placeholder="スポットのタイトルを入力" />
      </div>

      <div class="form-group">
        <label for="spot-description">説明</label>
        <textarea id="spot-description" rows="5" placeholder="スポットの詳細を入力"></textarea>
      </div>

      <div class="form-group">
        <label for="spot-prefecture">都道府県</label>
        <input type="text" id="spot-prefecture" placeholder="都道府県を入力" />
      </div>

      <div class="form-group">
        <label for="spot-address">市町村・番地</label>
        <input type="text" id="spot-address" placeholder="市町村・番地を入力" />
      </div>

      <div class="form-group">
        <label for="spot-tags">タグ</label>
        <input type="text" id="spot-tags" placeholder="タグを入力 (カンマ区切り)" />
      </div>

      <button type="button" class="post-button">投稿する</button>
    </div>
  </div>
</template>

<script>
import MainHeader from './MainHeader.vue'

export default {
  components: {
    MainHeader
  }
}
</script>

<style scoped>
.spot-post-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  padding: 100px 20px;
  background-color: white;
}

.spot-post-container {
  width: 100%;
  max-width: 1200px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  font-size: 20px;
  margin-bottom: 10px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 20px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.post-button {
  margin-top: 30px;
  padding: 15px 30px;
  font-size: 20px;
  background-color: #87CEEB;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.post-button:hover {
  background-color: #00BFFF;
}
</style>

