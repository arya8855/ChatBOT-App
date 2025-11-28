import ACTIVE_CHATBOT_ICON from "../assets/active-chatbot.svg"
import MESSAGE_ICON from "../assets/chat.svg"
import CROSS_ICON from "../assets/cross-vector.svg"
import CROSS_ICON2 from "../assets/cross.svg"
import SENT_ICON from "../assets/send.svg"
import CHATBOT_ICON from "../assets/user/chat-bot.svg"
import useChatBot from "../hooks/chat/use-chat-bot"
import UserForm from "../components/UserForm"
import Button from "./Button"
import LoadingSpinner from "./Spinner"
import styles from "../Styles/chatBot.module.css";

const ChatBot = () => {
  const {
    toggleChatBot,
    handleToggleChatBot,
    formData,
    isLoading,
    welcomeToggle,
    setWelcomeToggle,
    inputText,
    handleChatBotInput,
    checkForChatSubmisstion,
    handleChatSubmission,
    handleFormSubmission,
    handleFirstMessage,
    converstaionData,
    handleFormInput,
    isLoadingUserForm,
    handleReset,
    chatEndRef,
  } = useChatBot()

  if (isLoading || !formData) return <LoadingSpinner />

  return (
    <>
      {welcomeToggle && (
        <div className={styles["welcome-wrapper"]}>
          <img
            src={CROSS_ICON2}
            alt="cross"
            className={styles["cross_icons"]}
            width={25}
            onClick={() => setWelcomeToggle(false)}
          />
          <img
            src={CHATBOT_ICON}
            alt="chatbot"
            className={styles["chat_bot-icon"]}
            width={50}
          />
          <span>{formData?.welcomeMessage}</span>
        </div>
      )}

      <div className={styles["message_wrapper"]} onClick={handleToggleChatBot}>
        <img
          src={toggleChatBot ? CROSS_ICON : MESSAGE_ICON}
          alt="message"
          width={20}
        />
      </div>

      {toggleChatBot && (
        <div className={styles["chat_bot-container"]}>
          <div
            className={styles["chat_bot-header"]}
            style={{ backgroundColor: formData?.headerColor }}
          >
            <img src={ACTIVE_CHATBOT_ICON} alt="chatbot-icon" width={25} />
            Hubly
          </div>

          <div
            className={styles["chat_bot-body"]}
            style={{ backgroundColor: formData?.backgroundColor }}
          >
            {converstaionData ? (
              <>
                <div
                  className={`${styles["chat_bot-wrapper"]} ${
                    converstaionData?.conversation[0].sendBy === "Member"
                      ? styles["receive_wrapper"]
                      : styles["send_wrapper"]
                  }`}
                >

                {converstaionData?.conversation[0].sendBy === "Member" && (
                    <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                  )}
                  <div className={styles["chat_bot-chats"]}>
                    {converstaionData?.conversation[0].message}
                  </div>
                </div>
                <UserForm
                  data={{
                    userName: converstaionData.userName,
                    userPhone: converstaionData.userPhone,
                    userEmail: converstaionData.userEmail,
                  }}
                  isDisabled={
                    isLoadingUserForm || converstaionData.detailsShared
                  }
                  placeholder={{
                    name: formData?.formPlaceholder.name,
                    phone: formData?.formPlaceholder.phone,
                    email: formData?.formPlaceholder.email,
                    button: formData?.formPlaceholder.submitButton,
                  }}
                  handleFormInput={handleFormInput}
                  handleFormSubmission={handleFormSubmission}
                />

                <div className={styles["chat_bot-chats_wrapper"]}>
                  {converstaionData?.conversation.slice(1).map((item) => (
                    <div
                      key={item.id}
                      className={`${styles["chat_bot-wrapper"]} ${
                        item.sendBy === "Member"
                          ? styles["receive_wrapper"]
                          : styles["send_wrapper"]
                      }`}
                    >
                      {item.sendBy === "Member" && (
                        <img
                          src={CHATBOT_ICON}
                          alt="chatbot-icon"
                          width={25}
                        />
                      )}
                      <div className={styles["chat_bot-chats"]}>
                        {item.message}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {converstaionData.status === "resolved" && (
                  <div className={styles["chat_bot-ended"]}>
                    <span>This ticket has resolved!</span>
                    <Button type="button" size="sm" onClick={handleReset}>
                      Create New
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  className={`${styles["chat_bot-wrapper"]} ${styles["receive_wrapper"]}`}
                >
                  <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                  <div className={styles["chat_bot-chats_wrapper"]}>
                    {formData?.customizedMessages?.map((message, idx) => (
                      <div
                        key={idx}
                        className={`${styles["chat_bot-chats"]} ${styles["custom-messages"]}`}
                        onClick={() => handleFirstMessage(message)}
                      >
                        {message}
                      </div>
                    ))}
                  </div>
                </div>
                <span className={styles["start_message"]}>
                  Start a Conversation
                </span>
              </>
            )}
          </div>

          <div className={styles["chat_bot-footer"]}>
            <input
              type="text"
              placeholder="Write a message"
              className={styles["chat_bot-input"]}
              value={inputText}
              onChange={handleChatBotInput}
              onKeyDown={checkForChatSubmisstion}
              disabled={
                isLoadingUserForm || converstaionData?.status === "resolved"
              }
            />
            <img
              src={SENT_ICON}
              alt="sent-icon"
              className={styles["sent-icon"]}
              width={15}
              onClick={() => {
                if (
                  isLoadingUserForm ||
                  converstaionData?.status === "resolved"
                )
                  return
                handleChatSubmission(inputText)
              }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBot