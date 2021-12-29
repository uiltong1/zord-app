<template>
  <v-dialog
    v-if="timeout()"
    v-model="situacaoSnack"
    :content-class="messages.type"
    width="600"
  >
    <v-row>
      <v-col cols="auto">
        <v-icon>
          {{ iconsTypes[messages.type] }}
        </v-icon>
      </v-col>
      <v-col cols="8" class="mr-auto">
        <span class="text-h5 title">
          {{ messages.title }}
        </span>
      </v-col>
      <v-col cols="auto">
        <v-btn
          @click="onClose"
          icon
          color="pink"
          x-small
          class="close-snackbar"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        {{ messages.message }}
      </v-col>
    </v-row>

    <div style="overflow-x: hidden; overflow-y: auto; max-height: 300px">
      <v-row v-if="messages.errors">
        <v-col cols="12" v-for="error in messages.errors" :key="error.field">
          <v-icon left> icon-alert-2 </v-icon>
          <span :title="`${error.error} `">{{ error.error }}</span>
        </v-col>
      </v-row>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import store from "../modules/error/_store";
export default {
  data: function () {
    return {
      iconsTypes: {
        warning: "icon-danger",
        error: "icon-alert-1",
        success: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      messages: "$_messages/errors",
    }),
    situacaoSnack: {
      get: function () {
        if (Object.prototype.hasOwnProperty.call(this.messages, "title")) {
          return true;
        }
        return false;
      },
      set: function () {
        this.onClose();
      },
    },
  },
  methods: {
    onClose() {
      this.$store.dispatch("$_messages/destroyErrors");
    },
    timeout() {
      if (Object.prototype.hasOwnProperty.call(this.messages, "timeout")) {
        setTimeout(() => {
          this.$store.dispatch("$_messages/destroyErrors");
        }, this.messages.timeout);
        return true;
      } else {
        return true;
      }
    },
  },
  created() {
    const STORE_KEY = "$_messages";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
};
</script>

<style scoped lang="scss">
::v-deep .close-snackbar {
  float: right;
  margin: 3px;
}
.title {
  font-weight: bold;
}
.warning {
  ::v-deep .v-snack__wrapper {
    background-color: #fff9c3;
    color: #f39c12;
  }
}
::v-deep .v-dialog.error {
  padding: 20px;
  background-color: white !important;
  border: 2px solid #e74c3c;
  color: #e74c3c !important;
  i {
    color: #e74c3c;
  }
  .v-btn {
    color: #3498db;
    i {
      color: #e74c3c;
    }
    .v-btn__content {
      span {
        text-decoration: underline;
      }
    }
  }
}

::v-deep .v-dialog.success {
  padding: 20px;
  background-color: white !important;
  border: 2px solid #2ecc71;
  color: #2ecc71;
  .v-btn {
    color: #3498db;
    i {
      color: #e74c3c;
    }
    .v-btn__content {
      span {
        text-decoration: underline;
      }
    }
  }
}

::v-deep .v-dialog.warning {
  padding: 20px;
  background-color: #ffffff !important;
  border: 2px solid #f39c12;
  color: #f39c12;
  i {
    color: #f39c12;
  }
}
</style>
