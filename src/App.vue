<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>チャットルーム</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/use">
            <v-list-item-icon>
              <v-icon>mdi-chat-question</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>使い方</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>EasyChat</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer color="primary lighten-1" padless>
      <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
        <span v-if="$store.state.user"
          >あなたのユーザー名:{{ $store.state.user }}</span
        >
        <span v-else
          >{{ new Date().getFullYear() }} — <strong>ChatRoom</strong></span
        >
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  data: () => ({
    drawer: null,
    selectedItem: 1,
  }),
  created() {
    firebase
      .auth()
      .signInAnonymously()
      .then((e) => {
        this.$store.commit("info", e.user.uid);
      })
      .catch(() => {
        alert("エラーが発生しました");
        this.$router.push("/use");
      });
  },
};
</script>

<style lang="scss"></style>
