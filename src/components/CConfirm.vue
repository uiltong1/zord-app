<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="450">
      <v-card>
        <v-card-title>
          {{ message }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            color="green darken-1"
            text
            @click="$emit('positive', false)"
          >
            Sim
          </v-btn>
          <v-btn
            v-if="!loading"
            color="green darken-1"
            text
            @click="$emit('negative', false)"
          >
            Não
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: "COnfiram?",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>