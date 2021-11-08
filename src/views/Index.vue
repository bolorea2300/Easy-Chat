<template>
  <v-container>
    <v-card class="mx-auto my-12" max-width="481">
      <v-card-title>チャットルームに入りますか?</v-card-title>
      <v-card-actions>
        <v-btn block to="/home">入る</v-btn>
      </v-card-actions>
    </v-card>

    <div>
      <h1>EasyChatとは?</h1>
      <p class="mb-0">
        <a
          href="https://twitter.com/logo8505"
          target="_blank"
          rel="noopener noreferrer"
          >Pincer</a
        >がポートフォリオ用に作ったリアルタイムチャットサイトです。
      </p>
      <p>
        お問い合わせに関しては、<a
          href="https://twitter.com/logo8505"
          target="_blank"
          rel="noopener noreferrer"
          >Twitter</a
        >にてお願いします。
      </p>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: "",
  }),
};
</script>
