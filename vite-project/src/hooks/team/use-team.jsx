import { startTransition, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../lib/utils";
import {
  useDeleteMemberMutation,
  useGetMemberListQuery,
} from "../../redux/slice/member-slice";
import { useSelector } from "react-redux";

const useTeamHook = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { data: memberList, isLoading } = useGetMemberListQuery();
  const [deleteFunction, { isLoading: isDeleting }] = useDeleteMemberMutation();

  const [sortBy, setSortBy] = useState("asc");
  const [modalToggle, setModalToggle] = useState(false);
  const [mode, setMode] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter & Sort
  const filteredList = useMemo(() => {
    let tempList = [...(memberList || [])];

    tempList = tempList.sort((a, b) => {
      if (sortBy === "asc") {
        return a.userName.localeCompare(b.userName);
      }
      return b.userName.localeCompare(a.userName);
    });

    return tempList;
  }, [memberList, sortBy]);

  // Sorting
  function handleSort() {
    startTransition(() => {
      setSortBy((prev) => (prev === "asc" ? "desc" : "asc"));
    });
  }
  // Navigate to Profile
  function handleNavigate(id) {
    navigate(`./${id}`);
  }

  // Select User
  function handleSelectUser(id, mode) {
    startTransition(() => {
      setSelectedUser(id);
      setMode(mode);
      if (mode !== "Edit") setModalToggle(true);
    });
  }

  // Toggle Modal
  function handleToggle() {
    setModalToggle((prev) => !prev);
  }

  // Delete Member
  async function handleDelete() {
    try {
      if (!selectedUser) {
        showToast("Member not selected", "warning");
        return;
      }

      await deleteFunction({ id: selectedUser }).unwrap();
      showToast("Member deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting member:", error);
    } finally {
      setModalToggle(false);
    }
  }
  return {
    filteredList,
    handleSort,
    handleNavigate,
    handleSelectUser,
    handleToggle,
    handleDelete,
    isLoading,
    isDeleting,
    modalToggle,
    setModalToggle,
    mode,
    user,
  };
};

export default useTeamHook;