import action from "./action";
import text from "./text";
import cardDocSig from "./cardDocSig";
import form from "./form";
export default {
  action,
  caderno: {
    title: "Notebooks",
    quantidade: "Without notebooks | one notebook | {count} notebooks",
    aumentarQtde: "Increment notebooks",
    addCaderno: "Create notebook",
    form: {
      title: "Title",
      warning: "Please enter a title",
    },
  },
  login: {
    title: "Login",
    labelInputName: "Your user name",
    labelInputPassword: "Your password",
    hintName: "Your registration number",
    hintPassword: "6 first number of your cpf",
    submitButton: "Submit",
    warning: "Please type something!",
  },
  about: "About",
  tags: "Tags",
  tag: {
    create: "Add one or more tags",
  },
  text,
  cardDocSig,
  form,
};
