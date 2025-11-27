import AuthWrapper from "../../components/AuthWrapper";
import Button from "../../components/Button";
import FormGenerator from "../../components/FormGenerator";
import useSignUP from "../../hooks/auth/use-sign-up";
import styles from "../../Styles/signUp.module.css";

const SignUp = () => {
  const { SIGN_UP_FORM_ELEMENTS, formErrors, handleSubmit } = useSignUP();

  return (
    <AuthWrapper
      title="Sign UP"
      sideLink="sign-in"
      sideText="Sign in instead"
    >
    <form onSubmit={handleSubmit}>
        {SIGN_UP_FORM_ELEMENTS?.map((item) => (
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
          className={styles.submitBtn}
          disabled={Object.keys(formErrors).length > 0}
        >
          Create an account
        </Button>
      </form>
    </AuthWrapper>
  );
};

export default SignUp;