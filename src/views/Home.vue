<template>
  <v-container>
    <div class="main">
      <v-alert
        dense
        type="info"
        icon="mdi-login"
        v-for="(list, id) in access"
        :key="id"
      >
        最終ログイン:{{ list.time }}
      </v-alert>
      <div class="frame">
        <div class="comments">
          <v-card class="cardframe" v-for="(list, id) in comments" :key="id">
            <v-card-title>{{ list.name }}</v-card-title>
            <v-card-text>
              {{ list.comment }}
            </v-card-text>
          </v-card>

          <v-container style="height: 400px" v-if="loading">
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="text-subtitle-1 text-center" cols="12">
                コメント取得中
              </v-col>
              <v-col cols="6">
                <v-progress-linear
                  color="deep-purple accent-4"
                  indeterminate
                  rounded
                  height="6"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
    <v-btn
      class="write"
      fab
      dark
      large
      color="cyan"
      v-show="dialog === false"
      @click="dialog = true"
    >
      <v-icon dark> mdi-pencil </v-icon>
    </v-btn>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="data"
            :counter="100"
            :placeholder="'あなたの名前は『' + $store.state.user + '』です。'"
            required
          ></v-text-field>
          <v-btn block color="primary" @click="post" v-bind:disabled="check">
            投稿
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/database";

const date = new Date();

export default {
  data: () => ({
    data: "",
    comments: [],
    loading: true,
    dialog: false,
    access: [],
  }),
  computed: {
    check: function () {
      if (this.data && this.data.length <= 100) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    firebase
      .database()
      .ref("access")
      .push({
        time:
          date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日" +
          date.getHours() +
          "時" +
          date.getMinutes() +
          "分" +
          date.getSeconds() +
          "秒",
      });
  },
  mounted() {
    firebase
      .database()
      .ref("comments")
      .limitToLast(20)
      .on(
        "value",
        (snapshot) => ((this.comments = snapshot.val()), (this.loading = false))
      );

    firebase
      .database()
      .ref("access")
      .limitToLast(1)
      .on("value", (snapshot) => (this.access = snapshot.val()));
  },
  methods: {
    post: function () {
      firebase.database().ref("comments").push({
        name: this.$store.state.user,
        comment: this.data,
      });

      this.dialog = false;
      this.data = "";
    },
  },
};
</script>

<style lang="scss">
.write {
  z-index: 10;
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
