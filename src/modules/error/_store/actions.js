const setErrors = async (context, errors) => {
  context.commit("SET_ERRORS", errors);
};

const destroyErrors = async (context) => {
  context.commit("SET_ERRORS", []);
};

const setErrorsNotAcceptable = async (context, data) => {
  let errors = {
    title: "ERRO DE PREENCHIMENTO",
    type: "error",
    errors: [],
  };

  Object.entries(data).forEach(async (element) => {
    let feature = element[0].split(".");

    errors.errors.push({
      field: feature.length > 1 ? `${feature[0]}` : feature[0],
      error: element[1][0],
    });
  });
  errors.message = `Existe(m) ${errors.errors.length} campo(s) com erro(s):`;
  context.commit("SET_ERRORS", errors);
};

export default {
  setErrors,
  destroyErrors,
  setErrorsNotAcceptable,
};
