import { skipToken } from "@reduxjs/toolkit/query"
import {startTransition, useEffect, useRef, useState} from "react"
import { showToast } from "../../lib/utils"
import {useGetChatBotDetailsQuery} from "../../redux/slice/chatbot-setting-slice"
import {
  useGetUserConversationQuery,
  usePostNewConversationMutation,
  usePostUserFormMutation,
  usePutUserMessageMutation,
} from "../../redux/slice/lead-slice"

const useChatBot = () => {
  const [leadID, setLeadID] = useState(null);

  const { data, isLoading } = useGetChatBotDetailsQuery()

  const { data: convData, refetch: refetchConvData } =
  useGetUserConversationQuery(leadID, {
    skip: !leadID,
    refetchOnMountOrArgChange: true,
  });

  const [postUserForm, { isLoading: isLoadingUserForm }] =
    usePostUserFormMutation()

  const [sendFirstMessage] = usePostNewConversationMutation()
  const [putUserMessage] = usePutUserMessageMutation()

  const [toggleChatBot, setToggleChatBot] = useState(false)
  const [welcomeToggle, setWelcomeToggle] = useState(true)
  const [inputText, setInputText] = useState("")
  const [formData, setFormData] = useState(null)
  const [converstaionData, setConverstaionData] = useState(null)

  const chatEndRef = useRef(null)

  // Set chatbot config
  useEffect(() => {
    if (data) setFormData(data)
  }, [data])

  // Set user conversation
  useEffect(() => {
    if (convData) setConverstaionData(convData)
  }, [convData])

  // Auto-scroll
  useEffect(() => {
    if (converstaionData?.conversation?.length && toggleChatBot) {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  }, [toggleChatBot, converstaionData])

  // Toggle Chatbot
  const handleToggleChatBot = () => {
    setToggleChatBot((prev) => !prev);
    if (!toggleChatBot && leadID) refetchConvData();  
    if (welcomeToggle) setWelcomeToggle(false);
  };

  // Text input
  const handleChatBotInput = (e) => {
    setInputText(e.target.value)
  }

  // Form input
  const handleFormInput = (e) => {
    setConverstaionData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Enter key send
  const checkForChatSubmisstion = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (inputText !== "") handleChatSubmission(inputText)
    }
  }

  // Send message (first time / next time)
  const handleChatSubmission = async (message) => {
    try {
      if (leadID) {
        await putUserMessage({ leadID: leadID, message: message }).unwrap()
      } else {
        const response = await sendFirstMessage({ message: message }).unwrap()
        setLeadID(response.leadID)
        // localStorage.setItem("leadID", response.leadID)
      }
    } catch (error) {
      console.log("Error updating profile:", error)
    } finally {
        setInputText("");
        if (leadID) refetchConvData(); 
      }
  }

  // Submit user detail form
  const handleFormSubmission = async () => {
    try {
      if (!converstaionData || !leadID) return

      if (
        converstaionData.userName === "" ||
        converstaionData.userPhone === "" ||
        converstaionData.userEmail === ""
      ) {
        showToast("Please fill all the fields", "warning")
      }

      const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        converstaionData.userEmail
      )
      const validatePhone = /^\+?[0-9]{7,15}$/.test(
        converstaionData.userPhone
      )

      if (!validateEmail || !validatePhone) {
        showToast("Invalid email or phone number", "warning")
        return
      }

      await postUserForm({
        leadID: leadID,
        name: converstaionData.userName,
        email: converstaionData.userEmail,
        phone: converstaionData.userPhone,
      }).unwrap()
    } catch (error) {
      console.log("Error updating profile:", error)
    } finally {
      setInputText("")
    }
  }

  // Send message from suggestions
  const handleFirstMessage = (message) => {
    setInputText(message)
    handleChatSubmission(message)
  }

  // Reset chatbot
  const handleReset = () => {
    startTransition(() => {
      setInputText("")
      setWelcomeToggle(false)
      setConverstaionData(null)
      // setLeadID("")
      // localStorage.removeItem("leadID")
      setLeadID(null);
    })
  }

  // Scroll bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return {
    toggleChatBot,
    handleToggleChatBot,
    welcomeToggle,
    setWelcomeToggle,
    isLoading,
    formData,
    inputText,
    handleChatBotInput,
    handleChatSubmission,
    checkForChatSubmisstion,
    handleFormSubmission,
    handleFirstMessage,
    handleFormInput,
    converstaionData,
    isLoadingUserForm,
    handleReset,
    chatEndRef,
  }
}

export default useChatBot
