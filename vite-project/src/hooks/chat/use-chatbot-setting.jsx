import { useEffect, useState } from "react"
import { showToast } from "../../lib/utils"
import {
  useGetChatBotDetailsQuery,
  useUpdateChatBotMutation,
} from "../../redux/slice/chatbot-setting-slice"

const useChatbotSetting = () => {
  const { data, isLoading } = useGetChatBotDetailsQuery()
  const [updateChatBot, { isLoading: isUpdating }] = useUpdateChatBotMutation()

  const [formData, setFormData] = useState(null)

  useEffect(() => {
    if (data) setFormData(data)
  }, [data])

  // Handle Update Profile
  const handleSubmit = async () => {
    try {
      if (!formData) {
        showToast("Something went wrong", "warning")
        return
      }

      await updateChatBot(formData).unwrap()
      showToast("Profile updated successfully", "success")
    } catch (error) {
      console.log("Error updating profile:", error)
    }
  }
  return {
    formData,
    isLoading,
    isUpdating,
    setFormData,
    handleSubmit,
  }
}

export default useChatbotSetting