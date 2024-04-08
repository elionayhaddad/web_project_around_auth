function Login() {
  return (
    <>
      <div className="login">
        <h2 className="login__title">Entrar</h2>
        <form className="form__login">
          <fieldset className="form__field">
            <input
              className="input input_email"
              required
              type="text"
              name="email"
              // defaultValue={name}
              placeholder="Email"
              //  onChange={handleNameChange}
            />
            <span className="login__input-error email-input-error"></span>
          </fieldset>
          <fieldset className="form__field">
            <input
              className=" input input_password"
              required
              type="text"
              name="password"
              // defaultValue={name}
              placeholder="Senha"
              //  onChange={handleNameChange}
            />
            <span className="login__input-error password-input-error"></span>
          </fieldset>
          <button className="form__submit form__submit_login" type="submit">
            Entrar
          </button>
          <p className="form__redirect">
            Ainda não é membro?
            <Link to="register" className="login__register-link">
              Inscreva-se aqui!
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
