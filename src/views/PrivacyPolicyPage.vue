<template>
  <v-container class="policy-container" fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="policy-card" elevation="2">
          <v-card-title class="header">
            <h1 class="responsive-title">
              <span class="line">プライバシー</span>
              <span class="line second-line">ポリシー</span>
            </h1>
          </v-card-title>

          <v-card-text class="content">
            <p class="intro">
              「Anaba」（以下，「本サイト」といいます。）は，本ウェブサイト上で提供するサービス（以下，「本サービス」といいます。）における，ユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
            </p>

            <div v-for="section in sections" :key="section.title" class="section">
              <h2>{{ section.title }}</h2>
              <p v-if="section.content">{{ section.content }}</p>
              <ul v-if="section.items" class="list">
                <li v-for="item in section.items" :key="item">{{ item }}</li>
              </ul>
            </div>

            <h3 class="conclusion">以上</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const sections = [
  {
    title: '第1条（個人情報の定義）',
    content: '本プライバシーポリシーにおける「個人情報」とは、個人情報保護法に定める「個人情報」を指します。これには、氏名、メールアドレス、その他個人を特定できる情報が含まれます。',
  },
  {
    title: '第2条（個人情報の収集方法）',
    content: '当サービスは、ユーザーが利用登録を行う際に、メールアドレスやユーザーネームなどの個人情報を収集します。サービス利用に必要な範囲で追加情報を収集する場合があります。',
  },
  {
    title: '第3条（個人情報の利用目的）',
    items: [
      '本サービスの提供・運営',
      'ユーザーからのお問い合わせへの対応',
      'メンテナンスや重要なお知らせの通知',
      '利用状況の分析やサービス改善のための統計データ作成',
    ],
  },
  {
    title: '第4条（個人情報の第三者提供）',
    content: '当サービスは、以下の場合を除き、個人情報を第三者に提供しません。',
    items: [
      'ユーザーの同意がある場合',
      '法令に基づく場合',
      '人命や財産の保護が必要で、本人の同意を得ることが困難な場合',
    ],
  },
  {
    title: '第5条（個人情報の管理）',
    content: '当サービスは、個人情報の漏洩、紛失、毀損を防止するために適切な安全対策を講じます。',
  },
  {
    title: '第6条（ユーザーの権利）',
    content: 'ユーザーは、自身の個人情報について、開示、訂正、利用停止、削除を請求することができます。',
  },
  {
    title: '第7条（プライバシーポリシーの変更）',
    content: '本ポリシーは、必要に応じて変更されることがあります。変更後のポリシーは、本サイトに掲載した時点から効力を生じるものとします。',
  },
];
</script>

<style scoped>
.policy-container {
  padding: 16px;
  background-color: #f5f5f5;
}

.policy-card {
  padding: 24px;
  line-height: 1.8;
  font-size: 1rem;
  background-color: #fff;
}

.responsive-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 0;
  line-height: 1.2;
}

.line {
  display: inline-block;
}

.second-line {
  display: inline-block;
}

@media (max-width: 430px) {
  .second-line {
    display: block;
  }
}

.content {
  color: #444;
}

.section h2 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ccc;
}

.list {
  list-style-type: disc;
  margin-left: 1.5rem;
}

.conclusion {
  text-align: right;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 2rem;
}
</style>







