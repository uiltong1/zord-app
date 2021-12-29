<template>
  <v-app>
    <div class="template">
      <v-app-bar color="primary accent-4">
        <v-app-bar-nav-icon
          color="white"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer app temporary v-model="drawer">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Zord </v-list-item-title>
            <v-list-item-subtitle>
              Gestão de Desenvolvedores</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="$router.push(item.route)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      // { title: "Home", icon: "mdi-home", route: "/" },
      // { title: "Níveis", icon: "mdi-chart-bar", route: "/niveis" },
      // {
      //   title: "Desenvolvedores",
      //   icon: "mdi-dev-to",
      //   route: "/desenvolvedores",
      // },
    ],
    right: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style>
.v-application--wrap {
  background-color: #e5e5e5;
}
</style>
