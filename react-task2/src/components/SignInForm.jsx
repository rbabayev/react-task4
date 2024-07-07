function SignInForm() {
  return (
    <form className="singIn">
      <label htmlFor="">Username</label>
      <input type="username" />
      <label htmlFor="">Password</label>
      <input type="password" />
      <label>
        <input type="checkbox" />
        Remember Me
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignInForm;
