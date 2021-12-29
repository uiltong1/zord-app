<template>
  <div style="margin-top: 30px; margin-bottom: 20px; color: #1976d2;">
    <h2>{{ title }}</h2>
    <v-divider></v-divider>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>
