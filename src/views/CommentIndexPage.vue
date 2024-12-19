<template>
  <div>
    <h1 class="page-title">コメント一覧</h1>
    <v-card class="custom-card pa-4" elevation="16">

      <v-card-item style="background-color: yellow" class="mb-4">
        <v-row no-gutters justify="end">
          <div class="mr-3">おすすめ度: {{ spot.average_rating }}</div>
          <div>混雑の少なさ: {{ spot.average_quiet_rating }}</div>
        </v-row>
        <div class="text-body-1 mt-2">
          タグ:
          <v-chip
            v-for="(tag, index) in spot.tags"
            :key="index"
            class="ma-1"
            color="primary"
            text-color="white"
          >
            {{ tag.name }}
          </v-chip>
        </div>
        <div class="text-body-1">スポット名：{{ spot.name }}</div>
        <div class="text-body-1">都道府県：{{ spot.prefecture.name }}</div>
      </v-card-item>

      <div
        v-for="(comment, index) in spot.comments"
        :key="index"
        class="pa-2 custom-comment"
      >
        <p>投稿者: {{ comment.user.name }}</p>
        <p>内容: {{ comment.body }}</p>
        <v-btn
          class="custom-btn"
          color="orange"
          @click="
            router.push({ name: 'comment_show', params: { id: spot.id, comment_id: comment.id } })
          "
        >
          詳細ページへ
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '../plugins/axios';

const route = useRoute();
const router = useRouter();

const spot = ref({
  name: null,
  prefecture: {},
  tags: [],
  comments: [],
  average_rating: null,
  average_quiet_rating: null,
});

onMounted(() => {
  fetchComments();
});

const fetchComments = () => {
  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  const headers = {
    'access-token': token,
    uid: uid,
    client: client,
  };

  const spot_id = route.params.id;
  axios
    .get(`api/v1/spots/${spot_id}/comments`, { headers })
    .then((res) => {
      spot.value = res.data.spot;
    })
    .catch((error) => {
      alert('コメントを取得できませんでした。');
    });
};
</script>

<style scoped>

.custom-card {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.custom-comment {
  border: 1px solid black;
  margin-bottom: 10px;
}

.custom-btn {
  font-size: 1rem;
  min-width: 120px;
  margin-top: 8px;
}

.page-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

@media (max-width: 600px) {
  .custom-card {
    padding: 16px;
  }
  .custom-btn {
    font-size: 0.8rem;
    min-width: 100px;
  }
}
</style>


