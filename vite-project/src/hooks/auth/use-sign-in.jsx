// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { showToast } from "../../lib/utils"
// import { useAuth } from "../../context/AuthContext"

// const useSignIn = () => {
//   const navigate = useNavigate()
//   const { login } = useAuth()

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })

//   const [formErrors, setFormErrors] = useState({
//     email: "Email is required",
//     password: "Password is required",
//   })

//   // Update form data & errors
//   const handleUpdate = (name, value, error) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     setFormErrors((prev) => {
//       const updated = { ...prev }
//       if (error) updated[name] = error
//       else delete updated[name]
//       return updated
//     })
//   }

//   // Submit Sign-In
//   const handleSubmit = async (event) => {
//     try {
//       event.preventDefault()

//       if (Object.keys(formErrors).length > 0) {
//         console.log("Form has errors:", formErrors)
//         return
//       }

      
//       await login({
//         email: formData.email,
//         password: formData.password,
//       })

//       showToast("Login successful, Redirecting!!!", "success")
//       navigate("/app")
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const SIGN_IN_FORM_ELEMENTS = [
//     {
//       inputType: "input",
//       type: "email",
//       label: "Email",
//       placeholder: "Enter your email",
//       name: "email",
//       error: formErrors.email,
//       onUpdate: handleUpdate,
//       validation: {
//         required: true,
//         pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//       },
//     },
//     {
//       inputType: "input",
//       type: "password",
//       label: "Password",
//       placeholder: "********",
//       name: "password",
//       error: formErrors.password,
//       onUpdate: handleUpdate,
//       validation: {
//         required: true,
//         minLength: 6,
//         maxLength: 20,
//         pattern:
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
//         errorMessage:
//           "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
//       },
//     },
//   ]

//   return {
//     SIGN_IN_FORM_ELEMENTS,
//     formData,
//     formErrors,
//     handleSubmit,
//   }
// }

// export default useSignIn

import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { showToast } from "../../lib/utils"
import { loginUser } from "../../redux/slice/user-slice"

const useSignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [formErrors, setFormErrors] = useState({
    email: "Email is required",
    password: "Password is required",
  })

  // Update form data + errors
  const handleUpdate = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    setFormErrors((prev) => {
      const updated = { ...prev }
      if (error) updated[name] = error
      else delete updated[name]
      return updated
    })
  }

  // Submit Sign-In Form
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      if (Object.keys(formErrors).length > 0) {
        console.log("Form has errors:", formErrors)
        return
      }

      await dispatch(
        loginUser({ email: formData.email, password: formData.password })
      ).unwrap()

      showToast("Login successful, Redirecting!!!", "success")
      navigate("/app")
    } catch (error) {
      console.log(error)
    }
  }

  // Form config for Form Generator
  const SIGN_IN_FORM_ELEMENTS = [
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
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    {
      inputType: "input",
      type: "password",
      label: "Password",
      placeholder: "********",
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
  ]

  return {
    SIGN_IN_FORM_ELEMENTS,
    formData,
    formErrors,
    handleSubmit,
  }
}

export default useSignIn
