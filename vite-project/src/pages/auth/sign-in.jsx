import { Link } from "react-router-dom"
import AuthWrapper from "../../components/AuthWrapper"
import Button from "../../components/Button"
import FormGenerator from "../../components/FormGenerator"
import useSignIn from "../../hooks/auth/use-sign-in"
import "../../components/css/signIn.css";

const SignIn = () => {
  const { SIGN_IN_FORM_ELEMENTS, formErrors, handleSubmit } = useSignIn()

  return (
    <AuthWrapper title="Sign IN" className="login-adjust">
      <form onSubmit={handleSubmit}>
        {SIGN_IN_FORM_ELEMENTS?.map((item) => (
          <FormGenerator
            key={item.name}
            inputType={item.inputType}
            type={item.type}
            label={item.label}
            checkboxLabel={item.checkboxLabel}
            placeholder={item.placeholder}
            name={item.name}
            onUpdate={item.onUpdate}
            error={item.error}
            validation={item.validation}
          />
        ))}

         <Button
          type="submit"
          color="primary"
          size="md"
          className="submitBtn"
          disabled={Object.keys(formErrors).length > 0}
        >
          Log in
        </Button>
      </form>
      <div className="Text">
        <Link className="Link" to="#">
          Forgot password?
        </Link>
      </div>

      <div className="Text">
        Don’t have an account?{" "}
        <Link className="Link" to="../auth/sign-up">
          Sign up
        </Link>
      </div>
    </AuthWrapper>
  )
}

export default SignIn
