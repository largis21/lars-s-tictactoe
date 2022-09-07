import { signOffWithGoogle } from "../../services/firebase";

const SignoutGoogleButton = () => {
  return(
    <div>
      <button className="button" onClick={signOffWithGoogle}><i className="fab fa-google"></i>Sign out</button>
    </div>
  )
}

export default SignoutGoogleButton;