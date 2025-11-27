import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signupUser } from "../../redux/slice/user-slice"
import { showToast } from "../../lib/utils"

const useSignUP = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  })

  const [formErrors, setFormErrors] = useState({
    firstName: "First Name is required",
    lastName: "Last Name is required",
    email: "Email is required",
    password: "Password is required",
    confirmPassword: "Confirm Password is required",
    termsAndConditions: "Terms and Conditions is required",
  })

  const handleUpdate = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    setFormErrors((prev) => {
      const updated = { ...prev }
      if (error) updated[name] = error
      else delete updated[name]
      return updated
    })
  }

  // SIGN UP FORM ELEMENTS (Dynamic Form Generator)
  const SIGN_UP_FORM_ELEMENTS = [
    {
      inputType: "input",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      name: "firstName",
      error: formErrors.firstName,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
        pattern: /^[a-zA-Z\s]+$/,
        errorMessage: "Only Alphabets are allowed",
      },
    },
    {
      inputType: "input",
      type: "text",
      label: "Last Name",
      placeholder: "Enter your last name",
      name: "lastName",
      error: formErrors.lastName,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 20,
        pattern: /^[a-zA-Z\s]+$/,
        errorMessage: "Only Alphabets are allowed",
      },
    },
    {
      inputType: "input",
      type: "email",
      label: "Email",
      placeholder: "Enter your email",
      name: "email",
      error: formErrors.email,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        pattern:
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    {
      inputType: "input",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      name: "password",
      error: formErrors.password,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 6,
        maxLength: 20,
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        errorMessage:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    {
      inputType: "input",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      name: "confirmPassword",
      error: formErrors.confirmPassword,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 6,
        maxLength: 20,
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        errorMessage:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        validate: (value) => {
          if (value !== formData.password) return "Passwords do not match."
          return null
        },
      },
    },
    {
      inputType: "checkbox",
      type: "checkbox",
      checkboxLabel: (
        <div>
          By creating an account, I agree to our{" "}
          <Link className="text-secondary" to={"../terms-condition"}>
            Terms of use
          </Link>{" "}
          and{" "}
          <Link className="text-secondary" to={"../privacy-policy"}>
            Privacy Policy
          </Link>
        </div>
      ),
      name: "termsAndConditions",
      error: formErrors.termsAndConditions,
      onUpdate: handleUpdate,
      validation: {
        required: true,
      },
    },
  ]

  // Handle Submit
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      if (Object.keys(formErrors).length > 0) {
        console.log("Form has errors:", formErrors)
        return
      }

      await dispatch(
        signupUser({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      ).unwrap()

      showToast("Signup successful, Redirecting!!!", "success")
      navigate("/auth/sign-in")
    } catch (error) {
      console.error(error)
    }
  }

  return {
    SIGN_UP_FORM_ELEMENTS,
    formData,
    formErrors,
    handleUpdate,
    handleSubmit,
  }
}

export default useSignUP