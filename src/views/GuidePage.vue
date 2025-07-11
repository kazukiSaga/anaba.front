<template>
  <v-container>
    <v-card elevation="16" max-width="1000px" width="100%" class="custom-card mx-auto">
      <div class="text-h5 text-md-h3 text-center pa-4">
        『Anaba』使い方ガイド
      </div>
      
      <v-card-text class="content">
        <section>
          <h2>🗾 Anabaとは</h2>
          <p>
            穴場スポットを写真とコメント付きで投稿・共有し、地図上で検索できるサービスです。
          </p>
          
        </section>

        <section>
          <h2>📝 基本的な使い方</h2>
          
          <div class="step-item">
            <h3>STEP 1: ユーザー登録・ログイン</h3>
            <ol>
              <li>画面左上の「ユーザー登録」をクリック</li>
              <li>メールアドレス、パスワードを入力</li>
              <li>「サインアップ」ボタンをクリックして完了</li>
              <li>次回以降は画面左上の「ログイン」からメールアドレスとパスワードでログイン</li>
            </ol>
          </div>

          <div class="step-item">
            <h3>STEP 2: 穴場スポットを探す</h3>
            <ol>
              <li>トップページの地図でピンをクリック</li>
              <li>詳細をクリックで穴場スポットの詳細情報へ</li>
              <li>またはトップページ下部の「穴場スポット一覧」から気になるスポットを選択</li>
              <li>「穴場スポット一覧」から検索機能を使って絞り込み：
                <ul>
                  <li>スポット名で検索</li>
                  <li>都道府県で絞り込み</li>
                  <li>タグ（自然、歴史など）で絞り込み</li>
                </ul>
              </li>
            </ol>
          </div>

          <div class="step-item">
            <h3>STEP 3: スポット詳細、写真・コメントを閲覧</h3>
            <ol>
              <li>スポット名をクリックして詳細ページへ</li>
              <li>スポットの説明、住所、他のユーザーからの評価（おすすめ度、混雑の少なさをそれぞれ５段階評価）を確認</li>
              <li>詳細ページの左上「コメント一覧ページへ」ボタンからスポットに対する他のユーザーの投稿（写真・コメント）を閲覧</li>
              <li>詳細ページ画面下部のおすすめ度と混雑の少なさのフォームから各項目の評価を5段階評価で投稿</li>
            </ol>
          </div>

          <div class="step-item">
            <h3>STEP 4: 写真・コメントを投稿</h3>
            <ol>
              <li>スポット詳細ページ上部の「コメント投稿ページへ」をクリックし「コメント投稿ページへ」移動</li>
              <li>タイトルを入力</li>
              <li>コメントを入力</li>
              <li>写真をアップロード（JPG / JPEG / GIF / PNG のみ）</li>
              <li>画面下部の「投稿」ボタンをクリックして写真・コメントを投稿</li>
            </ol>
          </div>

          <div class="step-item">
            <h3>STEP 5: 新しいスポットを登録</h3>
            <ol>
              <li>画面左上の「スポット投稿」をクリック</li>
              <li>タイトル（スポット名）を入力</li>
              <li>スポットの説明を入力</li>
              <li>住所を入力</li>
              <li>適切なタグを選択、またはフォームに入力でタグの新規作成</li>
              <li>都道府県を選択</li>
              <li>市町村・番地を選択</li>
              <li>画面下部の「登録」ボタンをクリックでスポット登録</li>
            </ol>
          </div>          
        </section>

        <section>
          <h2>🔍 検索機能の使い方（穴場スポット一覧ページから）</h2>
          <div class="feature-item">
            <h3>スポット名検索</h3>
            <p>検索ボックスに文字を入力すると、候補が自動表示されます。</p>
          </div>
          <div class="feature-item">
            <h3>都道府県検索</h3>
            <p>プルダウンから都道府県を選択すると、その地域のスポットのみ表示されます。</p>
          </div>
          <div class="feature-item">
            <h3>タグ検索</h3>
            <p>「自然」「歴史」「写真スポット」などのタグでスポットを絞り込めます。</p>
          </div>
        </section>

        <section>
          <h2>⚠️ ご利用時の注意</h2>
          <ul class="warning-list">
            <li>私有地や立ち入り禁止区域への無断侵入は禁止です</li>
            <li>撮影や投稿の際は、他者の権利やプライバシーに配慮してください</li>
            <li>法令やマナーを遵守し、自己責任で行動してください</li>
            <li>スポット訪問時は安全に十分注意してください</li>
          </ul>
        </section>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
.custom-card {
  margin: 16px auto;
  padding: 24px;
  font-size: 16px;
  line-height: 1.8;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 24px;
}

.content section {
  margin-bottom: 32px;
}

.content h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid orange;
  color: #333;
}

.content h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.step-item, .feature-item, .faq-item {
  margin-bottom: 24px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.warning-list {
  background-color: #fff5f5;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #ff6b6b;
}

.warning-list li {
  margin-bottom: 8px;
  color: #d63031;
}

.content p {
  margin-bottom: 16px;
  color: #555;
}
</style>

