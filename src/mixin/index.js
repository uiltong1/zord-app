import Swal from "sweetalert2";
export default {
  methods: {
    async saveSuccess(message = "Salvo com sucesso!", route = null) {
      await Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 2000,
      });
      if (route) this.$router.push(route);
    },
    async errorMessage(message = "Erro.") {
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
      return false;
    },
  },
};
