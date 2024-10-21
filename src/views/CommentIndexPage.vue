<template>
  <div>
    <h1>コメント一覧</h1>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../plugins/axios'

const route = useRoute()

const commnets = ref([])

onMounted(() => {
  fetchComments()
})

const fetchComments = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }

  const spot_id = route.params.id
  axios
    .get(`api/v1/spots/${spot_id}/comments`, { headers })
    .then((res) => {
      commnets.value = res.data.commnets
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
