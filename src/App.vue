<template>
  <v-app>
    <c-error @onClose="status = false" />

    <router-view />
  </v-app>
</template>

<script>
import CError from "./components/CError.vue";

export default {
  components: { CError },
  name: "App",

  data: () => ({
    //
  }),
};
</script>
