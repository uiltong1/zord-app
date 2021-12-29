<template>
  <div style="margin-top: 25px">
    <v-row>
      <v-col v-for="module in modules" :key="module.name">
        <v-card @click="$router.push(module.route)">
          <v-card-text>
            <v-row justify="center">
              <v-icon color="#1976D2" size="100px">{{ module.icon }}</v-icon>
            </v-row>
            <v-row justify="center">
              <span
                style="font-size: 20px; font-family: sans-serif; color: #1976d2"
                >{{ module.name }}</span
              >
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modules: [
        { name: "Home", icon: "mdi-home", route: null },
        { name: "Níveis", icon: "mdi-chart-bar", route: "/niveis" },
        {
          name: "Desenvolvedores",
          icon: "mdi-dev-to",
          route: "/desenvolvedores",
        },
      ],
    };
  },
};
</script>