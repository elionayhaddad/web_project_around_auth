import { Link, withRouter, useHistory } from "react-router-dom";
import { useState } from "react";
import * as auth from "../utils/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return; //modal sem sucesso
    }
    try {
      const res = await auth.register({ email, password });
      if (res.ok) {
        history.push("/login");
      }
    } catch (error) {
      console.log("Error register", error);
    }
  }

  return (
    <>
      <div className="register">
        <h2 className="form__title form__title_auth">Inscrever-se</h2>
        <form className="form form_auth" onSubmit={handleSubmit}>
          <fieldset className="form__field form__field_auth">
            <input
              className="form__input form__input_auth"
              required
              type="text"
              name="email"
              defaultValue={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="form__input-error email-input-error"></span>
          </fieldset>
          <fieldset className="form__field form__field_auth">
            <input
              className="form__input form__input_auth"
              type="text"
              required
              name="password"
              defaultValue={password}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="form__input-error password-input-error"></span>
          </fieldset>
          <button
            className="button button_submit button_submit_auth"
            type="submit"
          >
            Inscrever
          </button>
          <p className="form__redirect">
            Já é um membro? {""}
            <Link to="/login" className=" form__redirect-link ">
              Faça o login aqui!
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default withRouter(Register);
