import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL
// const apiUrl = 'https://anaba.onrender.com'

const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  },
});

// リクエスト時に認証トークン付加
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken'); // ローカルストレージからトークンを取得
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Authorizationヘッダーを設定
  }
  return config;
}, (error) => {
  // リクエスト時にエラーがあった場合
  return Promise.reject(error);
});

export default instance
