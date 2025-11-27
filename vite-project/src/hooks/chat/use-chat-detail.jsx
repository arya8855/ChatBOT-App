// hooks/chat/use-chat-detail.jsx
import { skipToken } from "@reduxjs/toolkit/query";
import {
  startTransition,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { showToast } from "../../lib/utils";
import {
  useGetAssigneeListQuery,
  useGetChatDetailQuery,
  useGetChatListQuery,
  usePutAssigneeMutation,
  usePutChatStatusMutation,
  usePutMessageMutation,
} from "../../redux/slice/lead-slice";

const statusMode = ["Resolved", "Unresolved"];

const useChatDetail = ({ isDirect = false }) => {
  const { id } = useParams();

  // ✅ FIX: Chat list comes from GET /chat/ticket (response: { totalLeads, leadsList })
  const { data, isLoading, refetch } = useGetChatListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // Final chat list
  const chatList = data?.leadsList ?? [];

  const [activeChat, setActiveChat] = useState(null);
  const chatWindowRef = useRef(null);

  // GET ASSIGNEE LIST
  const { data: assigneeList, isLoading: isFetchingChats } =
    useGetAssigneeListQuery(
      activeChat ? activeChat.ticketID : skipToken
    );

  // GET CHAT CONVERSATION
  const { data: activeChatData, refetch: refetchConvData } =
    useGetChatDetailQuery(
      activeChat ? activeChat.ticketID : skipToken
    );

  const [putMessage, { isLoading: isSendingMessage }] =
    usePutMessageMutation();
  const [updateStatus, { isLoading: isUpdating }] =
    usePutChatStatusMutation();
  const [updateAssignee, { isLoading: isUpdatingAssignee }] =
    usePutAssigneeMutation();

  const [selectedData, setSelectedData] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [mode, setMode] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const [toggleAssignee, setToggleAssignee] = useState(false);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [toggleConfirmation, setToggleConfirmation] = useState(false);

  const handleActiveChat = (item) => setActiveChat(item);

  const handleToggleAssignee = () => {
    setToggleAssignee((prev) => !prev);
    if (toggleStatus) setToggleStatus(false);
  };

  const handleToggleStatus = () => {
    setToggleStatus((prev) => !prev);
    if (toggleAssignee) setToggleAssignee(false);
  };

  const handleConfirmation = () =>
    setToggleConfirmation((prev) => !prev);

  // Auto select ticket via /chat/:id
  useEffect(() => {
    if (isDirect && id && chatList.length) {
      const found = chatList.find(
        (item) =>
          item.ticketID === id ||
          item.leadID?.toString() === id
      );
      if (found) setActiveChat(found);
    }
  }, [isDirect, id, chatList]);

  // Auto-scroll
  useEffect(() => {
    if (activeChatData?.length && activeChat) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [activeChatData, activeChat]);

  const scrollToBottom = () => {
    const el = chatWindowRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const handleSelection = (value, modeStr) => {
    startTransition(() => {
      setSelectedData(value);
      setMode(modeStr);
      handleConfirmation();
    });
  };

  const handleCloseConfirmation = () => {
    startTransition(() => {
      setSelectedData(null);
      setMode(null);
      handleConfirmation();
      if (toggleStatus) handleToggleStatus();
      if (toggleAssignee) handleToggleAssignee();
    });
  };

  const handleStatusUpdate = async () => {
    try {
      if (!selectedData || !activeChat) return;

      await updateStatus({
        leadID: activeChat.leadID, // backend expects leadID
        status: selectedData,
      }).unwrap();

      showToast("Status updated successfully", "success");
    } catch (err) {
      console.log("Status Update Error:", err);
    } finally {
      handleCloseConfirmation();
      refetch();
    }
  };

  const handleAssigneeUpdate = async () => {
    try {
      if (!selectedData || !activeChat) return;

      await updateAssignee({
        ticketID: activeChat.ticketID,
        assigneeID: selectedData,
      }).unwrap();

      showToast("Assignee updated successfully", "success");
    } catch (err) {
      console.log("Assignee Update Error:", err);
    } finally {
      handleCloseConfirmation();
      refetch();
    }
  };

  const handleChatBotInput = (e) => {
    setInputValue(e.target.value);
  };

  const submissionByEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim() !== "") handleChatSubmission(inputValue);
    }
  };

  const handleChatSubmission = async (message) => {
    try {
      if (!activeChat) return;

      await putMessage({
        ticketID: activeChat.ticketID,
        message,
      }).unwrap();
    } catch (err) {
      console.log("Send message error:", err);
    } finally {
      setInputValue("");
      refetchConvData();
    }
  };

  return {
    data: chatList,          // FIXED: Always return correct chat list
    activeChat,
    toggleAssignee,
    toggleStatus,
    toggleConfirmation,
    activeChatData,

    handleActiveChat,
    handleToggleAssignee,
    handleToggleStatus,
    statusMode,

    assigneeList,
    mode,
    handleConfirmation,
    handleSelection,
    setToggleConfirmation,
    handleCloseConfirmation,

    isUpdating,
    isUpdatingAssignee,
    isSendingMessage,
    isLoading,
    isFetchingChats,

    handleStatusUpdate,
    handleAssigneeUpdate,

    handleChatBotInput,
    submissionByEnterKey,
    handleChatSubmission,

    inputValue,
    chatWindowRef,

    selectedIdx,
    setSelectedIdx,
  };
};

export default useChatDetail;