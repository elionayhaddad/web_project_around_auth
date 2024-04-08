import { Link, withRouter, useHistory } from "react-router-dom";
import { useState } from "react";
import "../blocks/Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="register">
        <h2 className="register__title">Inscrever-se</h2>
        <form className="form__register">
          <fieldset className="form__field">
            <input
              className="input input_email"
              required
              type="text"
              name="email"
              defaultValue={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="register__input-error email-input-error"></span>
          </fieldset>
          <fieldset className="form__field">
            <input
              className=" input input_password"
              required
              type="text"
              name="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            <span className="register__input-error password-input-error"></span>
          </fieldset>
          <button className="form__submit form__submit_register" type="submit">
            Entrar
          </button>
          <p className="form__redirect">
            Já é um membro?
            <Link to="login" className="register__login-link">
              Faça o login aqui!
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default withRouter(Register);
