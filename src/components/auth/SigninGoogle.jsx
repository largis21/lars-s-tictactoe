import { signInWithGoogle } from "../../services/firebase";

const SigninGoogleButton = () => {
  return(
    <div>
      <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
    </div>
  )
}

export default SigninGoogleButton;