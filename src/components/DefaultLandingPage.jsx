// Components 
import SigninGoogleButton from "./auth/SigninGoogle" 

const DefaultLandingPage = () => {
  return(
    <div>
      <h1>Please Sign In</h1>
      <SigninGoogleButton />
    </div>
  )
}

export default DefaultLandingPage;