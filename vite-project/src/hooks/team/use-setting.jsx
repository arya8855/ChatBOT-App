import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { showToast } from "../../lib/utils"
import {
  useGetMemberDetailQuery,
  useUpdateMemberMutation,
} from "../../redux/slice/member-slice"

const useSetting = ({ isChild }) => {
  const { id } = useParams()

  const { user } = useSelector((state) => state.user)

  const { data, isLoading } = useGetMemberDetailQuery({
    id: isChild ? id : user?.id,
  })

  const [updateProfile, { isLoading: isUpdating }] = useUpdateMemberMutation()

  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState({
    firstName: "First Name is required",
    lastName: "Last Name is required",
    email: "Email is required",
    phone: "Phone is required",
  })

  // Load initial form data + fix errors
  useEffect(() => {
    if (data) setFormData(data)

    setFormErrors((prev) => {
      const updated = { ...prev }

      if (data?.firstName) delete updated.firstName
      if (data?.lastName) delete updated.lastName
      if (data?.email) delete updated.email
      if (data?.phone) delete updated.phone

      return updated
    })
    }, [data])

  // Field Update Handler
  const handleUpdate = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    setFormErrors((prev) => {
      const updated = { ...prev }
      if (error) updated[name] = error
      else delete updated[name]
      return updated
    })
  }

  // Submit Handler
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      if (Object.keys(formErrors).length > 0) {
        console.log("Form has errors:", formErrors)
        return
      }

      await updateProfile(formData).unwrap()
      showToast("Profile updated successfully", "success")
    } catch (error) {
      console.log("Error updating profile:", error)
    }
  }

  // Dynamic Form Fields
  const SETTING_FORM_ELEMENTS = [
    {
      inputType: "input",
      type: "text",
      label: "First Name",
      placeholder: "Enter your first name",
      name: "firstName",
      hasRequiredMark: true,
      error: formErrors.firstName,
      defaultValue: formData.firstName,
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
      defaultValue: formData.lastName,
      hasRequiredMark: true,
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
      defaultValue: formData.email,
      hasRequiredMark: true,
      suggesstionText: "User will logged out immediately",
      error: formErrors.email,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    {
      inputType: "input",
      type: "tel",
      label: "Phone",
      placeholder: "Enter your contact number",
      name: "phone",
      error: formErrors.phone,
      defaultValue: formData.phone,
      onUpdate: handleUpdate,
      hasRequiredMark: true,
      suggesstionText: "User will logged out immediately",
      validation: {
        required: true,
        minLength: 10,
        maxLength: 10,
        pattern: /^[0-9]{10}$/,
      },
    },
    {
      inputType: "input",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      name: "password",
      hasRequiredMark: true,
      suggesstionText: "User will logged out immediately",
      error: formErrors.password,
      onUpdate: handleUpdate,
      validation: {
        required: false,
        minLength: 6,
        maxLength: 20,
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        errorMessage:
          "Password must be 8+ chars with uppercase, lowercase, number & special character.",
      },
    },
    {
      inputType: "input",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      name: "confirmPassword",
      error: formErrors.confirmPassword,
      hasRequiredMark: true,
      suggesstionText: "User will logged out immediately",
      onUpdate: handleUpdate,
      validation: {
        required: false,
        minLength: 6,
        maxLength: 20,
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        errorMessage:
          "Password must be 8+ chars with uppercase, lowercase, number & special character.",
        validate: (value) => {
          if (value !== formData.password) return "Passwords do not match."
          return null
        },
      },
    },
  ]

  return {
    handleUpdate,
    formData,
    formErrors,
    SETTING_FORM_ELEMENTS,
    handleSubmit,
    isLoading,
    isUpdating,
  }
}

export default useSetting
