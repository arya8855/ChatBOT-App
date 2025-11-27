import { useState } from "react"
import { showToast } from "../../lib/utils"
import { useAddMemberMutation } from "../../redux/slice/member-slice"

const useMemberForm = ({ confirmFn }) => {
  const [createFunction, { isLoading }] = useAddMemberMutation()

  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState({
    name: "Name is required",
    email: "Email is required",
    designation: "Designation is required",
  })

  // Handle Form State and Error Update
  const handleUpdate = (name, value, error) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    setFormErrors((prev) => {
      const updated = { ...prev }
      if (error) updated[name] = error
      else delete updated[name]
      return updated
    })
  }
  // Dynamic Form Elements
  const MEMBER_FORM_ELEMENTS = [
    {
      inputType: "input",
      type: "text",
      label: "Name",
      placeholder: "John Doe",
      name: "name",
      error: formErrors.name,
      onUpdate: handleUpdate,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 50,
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
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
    },
    {
      inputType: "select",
      type: "text",
      label: "Designation",
      placeholder: "Select ...",
      name: "designation",
      error: formErrors.designation,
      onUpdate: handleUpdate,
      options: [
        { id: "1", value: "Admin", label: "Admin" },
        { id: "2", value: "Member", label: "Member" },
      ],
      validation: {
        required: true,
      },
    },
  ]

  // Handle Form Submission
  const handleSubmission = async (event) => {
    try {
      event.preventDefault()

      if (Object.keys(formErrors).length > 0) {
        console.log("Form has errors:", formErrors)
        return
      }

      await createFunction({
        name: formData.name,
        email: formData.email,
        designation: formData.designation,
      }).unwrap()

      showToast("Member created successfully", "success")
      showToast("Default Password is User@1234", "success")
    } catch (error) {
      console.error("Error creating member:", error)
    } finally {
      confirmFn()
    }
  }

  return {
    MEMBER_FORM_ELEMENTS,
    handleSubmission,
    formErrors,
    isLoading,
  }
}

export default useMemberForm