import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import CALL_ICON from "../../assets/call.svg"
import HOME_ICON from "../../assets/home.svg"
import MAIL_ICON from "../../assets/mail.svg"
import PROFILE_ICON from "../../assets/profile.svg"
import SENT_ICON from "../../assets/send.svg"
import TICKET_ICON from "../../assets/ticket-status.svg"
import CHATBOT_ICON from "../../assets/user/chat-bot.svg"

import Button from "../../components/Button";
import "../../components/css/chat.css";
import Modal from "../../components/Modal";
import ProfileImage from "../../components/ProfileImage";
import LoadingSpinner from "../../components/Spinner";
import useChatDetail from "../../hooks/chat/use-chat-detail"
import { showToast } from "../../lib/utils"

const Chat = ({ isDirect = false }) => {
  const { user } = useSelector((state) => state.user);

  const {
    data,
    activeChat,
    handleActiveChat,
    handleToggleAssignee,
    toggleAssignee,
    toggleStatus,
    toggleConfirmation,
    handleToggleStatus,
    statusMode,
    assigneeList,
    setToggleConfirmation,
    handleSelection,
    mode,
    handleCloseConfirmation,
    isUpdating,
    isUpdatingAssignee,
    isLoading,
    isFetchingChats,
    handleStatusUpdate,
    handleAssigneeUpdate,
    activeChatData,
    handleChatBotInput,
    submissionByEnterKey,
    handleChatSubmission,
    inputValue,
    chatWindowRef,
    selectedIdx,
    setSelectedIdx,
  } = useChatDetail({ isDirect });

  if (isUpdating || isUpdatingAssignee || isLoading || isFetchingChats)
    return <LoadingSpinner />;

  return (
    <>
      <div className="chat_wrapper">
        <div className="chat_list-wrapper">
          <div className="page_title">Contact Details</div>
          <div className="chat-header">Chats</div>

          <div className="chat_list">
            {data?.map((item, idx) => (
              <div
                key={item.leadID}
                className={`chat_item ${
                  activeChat?.leadID === item.leadID ? "active-chat_item" : ""
                }`}
                onClick={() => {
                  handleActiveChat(item);
                  setSelectedIdx(idx <= 5 ? idx : 1);
                }}
              >
                <ProfileImage width={35} number={idx <= 5 ? idx : 1} />

                <div className="chat_item-content">
                  <div className="chat_item-title">Chat {idx + 1}</div>
                  <div className="chat_item-message">{item.latestMessage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE CHAT WINDOW */}
        {activeChat ? (
          <>
            <div className="chat_window-wrapper">
              <div className="chat_window-container">
                <div className="chat_window-header">
                  <div>Ticket #{activeChat.ticketID}</div>
                  <Link to={`../`}>
                    <img src={HOME_ICON} alt="user" width={20} />
                  </Link>
                </div>

                <div
                  ref={chatWindowRef}
                  className="chat_window-content hidden-scrollbar"
                >
                  <DateHeader dateString={activeChat.postedAt} />

                  {activeChatData?.map((item) => (
                    <div
                      key={item.id}
                      className={`chat-wrapper ${
                        item.sendBy === "Member" ? "sender" : "receiver"
                      }`}
                    >
                      {item.sendBy === "Lead" && (
                        <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                      )}

                      <div>
                        <div className="chat-sender">{item.senderName}</div>
                        <div className="chats">{item.message}</div>
                      </div>

                      {item.sendBy === "Member" && (
                        <img src={CHATBOT_ICON} alt="chatbot-icon" width={25} />
                      )}
                    </div>
                  ))}

                  {activeChat.isMissedChat && (
                    <div className="missed-chat">
                      Replying to missed chat
                    </div>
                  )}

                  {!activeChat.isCurrentAssignee && (
                    <div className="bottom-text">
                      This chat is assigned to new team member. you no longer
                      have access
                    </div>
                  )}

                  {activeChat.status === "resolved" && (
                    <div className="bottom-text">
                      This chat has been resolved
                    </div>
                  )}
                </div>

                {activeChat.status !== "resolved" &&
                activeChat.isCurrentAssignee ? (
                  <div className="chat_window-footer">
                    <input
                      type="text"
                      placeholder="Write a message"
                      className="chat_bot-input"
                      value={inputValue}
                      onChange={handleChatBotInput}
                      onKeyDown={submissionByEnterKey}
                      disabled={
                        isUpdating ||
                        isUpdatingAssignee ||
                        isLoading ||
                        isFetchingChats
                      }
                    />

                    <img
                      src={SENT_ICON}
                      alt="sent-icon"
                      className="sent-icon"
                      onClick={() => {
                        if (
                          isUpdating ||
                          isUpdatingAssignee ||
                          isLoading ||
                          isFetchingChats ||
                          activeChat?.status === "resolved"
                        )
                          return;
                        handleChatSubmission(inputValue);
                      }}
                      width={15}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            {/* DETAILS SIDEBAR */}
            <div className="chat_detail-wrapper">
              <div className="chat_detail-header">
                <ProfileImage width={35} number={selectedIdx} />
                Chat
              </div>

              <span className="chat_detail-title">Details</span>

              <div className="chat_detail-content">
                <div className="chat_detail-item">
                  <img src={PROFILE_ICON} alt="user" width={15} />
                  <div>{activeChat.userName}</div>
                </div>

                <div className="chat_detail-item">
                  <img src={CALL_ICON} alt="user" width={15} />
                  <div>{activeChat.userPhone}</div>
                </div>

                <div className="chat_detail-item">
                  <img src={MAIL_ICON} alt="user" width={15} />
                  <div>{activeChat.userEmail}</div>
                </div>
              </div>

              <span className="chat_detail-title">Details</span>

              <div
                className={`chat_detail-item pointer`}
                onClick={handleToggleAssignee}
              >
                <ProfileImage />
                <div>{activeChat.assigneeName}</div>
              </div>

              <div
                className={`chat_detail-item pointer`}
                onClick={handleToggleStatus}
              >
                <img src={TICKET_ICON} alt="user" width={15} />
                <div>Ticket Status</div>
              </div>

              {toggleStatus && (
                <div className="status-wrapper">
                  {statusMode?.map((status, i) => (
                    <div
                      key={i}
                      className="status-item"
                      onClick={() => {
                        if (user?.isAdmin || activeChat.isCurrentAssignee)
                          handleSelection(status, "Status");
                        else {
                          showToast(
                            "Only Admin can change the assignee",
                            "warning"
                          );
                        }
                      }}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}

              {toggleAssignee && (
                <div className="assignee-wrapper">
                  <div className="title">Select Assignee</div>

                  {assigneeList?.map((assignee) => (
                    <div
                      key={assignee.userID}
                      className="assignee-item"
                      onClick={() => {
                        if (user?.isAdmin)
                          handleSelection(assignee.userID, "Assignee");
                        else {
                          showToast(
                            "Only Admin can change the assignee",
                            "warning"
                          );
                        }
                      }}
                    >
                      <ProfileImage />
                      {assignee.userName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="not-selected">No Chat Selected</div>
        )}
      </div>

      {/* Confirmation Modal */}
      {toggleConfirmation && (
        <Modal
          onClose={setToggleConfirmation}
          open={toggleConfirmation}
          title={mode === "Status" ? "Change Ticket Status" : "Assign Ticket"}
          size="small"
        >
          {mode === "Status" ? (
            <div className="status-wrapper">
              <span>
                Are you sure you want to change the ticket status?
              </span>

              <div className="btn-group">
                <Button
                  type="button"
                  size="sm"
                  color="secondary"
                  onClick={handleCloseConfirmation}
                >
                  Close
                </Button>

                <Button type="button" size="sm" onClick={handleStatusUpdate}>
                  Update Status
                </Button>
              </div>
            </div>
          ) : (
            <div className="status-wrapper">
              <span>
                Are you sure? Chat will be assigned to a different user.
              </span>

              <div className="btn-group">
                <Button
                  type="button"
                  size="sm"
                  color="secondary"
                  onClick={handleCloseConfirmation}
                >
                  Close
                </Button>

                <Button type="button" size="sm" onClick={handleAssigneeUpdate}>
                  Assign
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default Chat;

const DateHeader = ({ dateString }) => {
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="date-header-container">
      <hr className="line" />
      <span className="date-text">{formattedDate}</span>
      <hr className="line" />
    </div>
  );
};