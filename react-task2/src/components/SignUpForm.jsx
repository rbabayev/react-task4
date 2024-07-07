function SignUpForm() {
  return (
    <form className="signUp">
      <label>
        <label htmlFor="">Username</label>
        <input type="username" />
        <label htmlFor="">Email</label>
        <input type="email" />
        <label htmlFor="">Password</label>
        <input type="password" />
        <label htmlFor="">Repeat Password</label>
        <input type="password" />
        <input type="checkbox" />
        Remember Me
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SignUpForm;
