import { Link, withRouter, useHistory } from "react-router-dom";

import { useState } from "react";
import * as auth from "../utils/auth";

function Login({ handleLogin }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return; //modal sem sucesso
    }
    try {
      let res = await auth.authorize({ email, password });
      if (res.status === 401) {
        alert("Valide o email ou senha preenchidos");
        return;
      }
      res = await res.json();
      if (res.ok) {
        handleLogin();
        localStorage.setItem("jwt", res.token);
        history.push("/");
      }
    } catch (error) {
      console.log("Error authorize", error);
    }
  }
  return (
    <>
      <div className="login">
        <h2 className="form__title form__title_auth">Entrar</h2>
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
            Entrar
          </button>
          <p className="form__redirect">
            Ainda não é membro? {""}
            <Link to="/register" className=" form__redirect-link ">
              Inscreva-se aqui!
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default withRouter(Login);
