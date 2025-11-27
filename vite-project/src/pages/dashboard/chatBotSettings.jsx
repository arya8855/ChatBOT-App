import CHATBOT_ICON from "../../assets/active-chatbot.svg";
import SENT_ICON from "../../assets/send.svg";
import CHATBOT_ICON2 from "../../assets/user/chat-bot.svg";

import Button from "../../components/Button";
import ColorPicker from "../../components/ColorPicker";
import CustomInput from "../../components/CustomInput";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/Spinner";
import TimePicker from "../../components/TimePicker";

import useChatbotSetting from "../../hooks/chat/use-chatbot-setting";
import "../../components/css/chatbotSettings.css";

const ChatBotSettingWrapper = ({ children, title }) => (
  <div className="chat-bot_settings-wrapper">
    <div className="chat-bot_settings-title">{title}</div>
    <div className="chat-bot_settings-content">{children}</div>
  </div>
);

const ChatBotSetting = () => {
  const { formData, isLoading, isUpdating, handleSubmit, setFormData } =
    useChatbotSetting();

    if (isLoading || !formData || isUpdating) return <LoadingSpinner />;

    return (
    <>
      <Header title="Chat Bot Settings" />

      <div>
        <div className="chat-bot_wrapper">
          {/* LEFT SIDE PREVIEW */}
          <div>
            {/* Chatbot preview bubble */}
            <div className="chat-bot_container">
              <div
                className="chat-bot_header"
                style={{ backgroundColor: formData.headerColor }}
              >
                <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                Hubly
              </div>

              <div
                className="chat-bot_body"
                style={{ backgroundColor: formData.backgroundColor }}
              >
                <div className="chat-bot_sender-icon">
                  <img src={CHATBOT_ICON2} alt="chatbot-icon" width={25} />
                </div>

                <div className="chat-bot_chats">
                  {/* Custom messages */}
                  <div className="chat-bot_custom_messages-wrapper">
                    {formData.customizedMessages?.map((message, idx) => (
                      <div key={idx} className="chat-bot_custom_messages">
                        {message}
                      </div>
                    ))}
                  </div>

                  {/* Introduction Form Preview */}
                  <div className="chat-bot_form">
                    <small>Introduce Yourself</small>

                    <div className="chat-bot_form-wrapper">
                      <div>
                        <div className="chat-bot_form-label">Your name</div>
                        <div className="chat-bot_form-placeholder">
                          {formData.formPlaceholder.name ?? " "}
                        </div>
                      </div>

                      <div>
                        <div className="chat-bot_form-label">Your phone</div>
                        <div className="chat-bot_form-placeholder">
                          {formData.formPlaceholder.phone ?? " "}
                        </div>
                      </div>

                      <div>
                        <div className="chat-bot_form-label">Your email</div>
                        <div className="chat-bot_form-placeholder">
                          {formData.formPlaceholder.email ?? " "}
                        </div>
                      </div>

                      <Button type="button">
                        {formData.formPlaceholder.submitButton ?? " "}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="chat-bot_footer">
                Write a message
                <img src={SENT_ICON} alt="sent-icon" width={25} />
              </div>
            </div>

            {/* Welcome message */}
            <div className="chat-bot_welcome-wrapper">
              <img src={CHATBOT_ICON2} alt="chatbot" width={50} />
              <div>{formData.welcomeMessage}</div>
            </div>
          </div>

          {/* RIGHT SIDE SETTINGS */}
          <div className="chat-bot_settings">
            {/* Header Color */}
            <ChatBotSettingWrapper title="Header Color">
              <ColorPicker
                defaultColor={["#FFFFFF", "#000000", "#33475B"]}
                currentColor={formData.headerColor}
                onChange={(newColor) =>
                  setFormData((prev) => ({ ...prev, headerColor: newColor }))
                }
              />
            </ChatBotSettingWrapper>

            {/* Background Color */}
            <ChatBotSettingWrapper title="Background Color">
              <ColorPicker
                defaultColor={["#FFFFFF", "#000000", "#EEEEEE"]}
                currentColor={formData.backgroundColor}
                onChange={(newColor) =>
                  setFormData((prev) => ({
                    ...prev,
                    backgroundColor: newColor,
                  }))
                }
              />
            </ChatBotSettingWrapper>

            {/* Customize Messages */}
            <ChatBotSettingWrapper title="Customize Messages">
              <div className="chat-bot_custom_messages-wrapper">
                {formData.customizedMessages?.map((message, idx) => (
                  <CustomInput
                    key={idx}
                    value={message}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        customizedMessages: prev.customizedMessages.map(
                          (item, i) => (i === idx ? value : item)
                        ),
                      }))
                    }
                  />
                ))}
              </div>
            </ChatBotSettingWrapper>

            {/* Introduction Form */}
            <ChatBotSettingWrapper title="Introduction Form">
              <div className="chat-bot_form-wrapper">
                {/* Name */}
                <div>
                  <div className="chat-bot_form-label">Your name</div>
                  <input
                    className="chat-bot_form-input"
                    value={formData.formPlaceholder.name}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        formPlaceholder: {
                          ...prev.formPlaceholder,
                          name: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter your name"
                    type="text"
                  />
                </div>

                {/* Phone */}
                <div>
                  <div className="chat-bot_form-label">Your phone</div>
                  <input
                    className="chat-bot_form-input"
                    value={formData.formPlaceholder.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        formPlaceholder: {
                          ...prev.formPlaceholder,
                          phone: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter your phone"
                    type="text"
                  />
                </div>

                {/* Email */}
                <div>
                  <div className="chat-bot_form-label">Your email</div>
                  <input
                    className="chat-bot_form-input"
                    value={formData.formPlaceholder.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        formPlaceholder: {
                          ...prev.formPlaceholder,
                          email: e.target.value,
                        },
                      }))
                    }
                    placeholder="Enter your email"
                    type="text"
                  />
                </div>

                {/* Submit Button Placeholder */}
                <input
                  className="chat-bot_form-input-btn"
                  value={formData.formPlaceholder.submitButton}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      formPlaceholder: {
                        ...prev.formPlaceholder,
                        submitButton: e.target.value,
                      },
                    }))
                  }
                  placeholder="Submit button text"
                  type="text"
                />
              </div>
            </ChatBotSettingWrapper>

            {/* Welcome Message */}
            <ChatBotSettingWrapper title="Welcome Message">
              <CustomInput
                value={formData.welcomeMessage}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    welcomeMessage: value,
                  }))
                }
              />
            </ChatBotSettingWrapper>

            {/* Missed Chat Timer */}
            <ChatBotSettingWrapper title="Missed Chat Timer">
              <TimePicker
                state={formData.missedChatTimer}
                onChange={(state) =>
                  setFormData((prev) => ({
                    ...prev,
                    missedChatTimer: state,
                  }))
                }
              />
            </ChatBotSettingWrapper>

            {/* SAVE BUTTON */}
            <Button
              type="button"
              className="chat-bot_submit_btn"
              disabled={isUpdating}
              isLoading={isUpdating}
              onClick={handleSubmit}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBotSetting;