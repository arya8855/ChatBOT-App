import PLUS_ICON from "../../assets/circle-plus.svg"
import DELETE_ICON from "../../assets/delete.svg"
import EDIT_ICON from "../../assets/edit-1.svg"
import SORT_ICON from "../../assets/sort.svg"
import Button from "../../components/Button"
import styles from "../../Styles/team.module.css" 
import Modal from "../../components/Modal"
import MemberForm from "../../components/MemberForm"
import Header from "../../components/Header"
import ProfileImage from "../../components/ProfileImage"
import LoadingSpinner from "../../components/Spinner";
import useTeamHook from "../../hooks/team/use-team"

const Teams = () => {
  const {
    handleDelete,
    handleNavigate,
    handleToggle,
    filteredList,
    isLoading,
    handleSort,
    handleSelectUser,
    isDeleting,
    modalToggle,
    setModalToggle,
    mode,
    user,
  } = useTeamHook()

  if (isLoading || isDeleting) return <LoadingSpinner />

  return (
    <div>
      <Header title="Team Members" />

      <div className={styles["table-wrapper"]}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>
                <div className="d-flex align-items-center gap-2">
                  <span>Full Name</span>
                  <img
                    src={SORT_ICON}
                    alt="sort"
                    width={15}
                    height={15}
                    className="pointer"
                    onClick={handleSort}
                  />
                </div>
              </th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredList?.length > 0 ? (
              filteredList.map((item, idx) => (
                <tr key={item.userId}>
                  <td>
                    <ProfileImage width={35} number={idx <= 5 ? idx : 1} />
                  </td>

                  <td>{item.userName}</td>
                  <td>{item.userPhone}</td>
                  <td>{item.userEmail}</td>
                  <td>{item.userRole}</td>

                  {item.userRole !== "Admin" ? (
                    <td>
                      <span className={styles["edit-btn"]}>
                        <img
                          src={EDIT_ICON}
                          alt="edit-profile"
                          width={15}
                          height={15}
                          onClick={() => handleNavigate(item.userId)}
                        />
                        <img
                          src={DELETE_ICON}
                          alt="delete-profile"
                          width={15}
                          height={15}
                          onClick={() =>
                            handleSelectUser(item.userId, "Delete")
                          }
                        />
                      </span>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {user?.isAdmin && (
        <Button
          type="button"
          onClick={() => handleSelectUser("", "Create")}
          icon={PLUS_ICON}
          className={styles["add-btn"]}
        >
          Add New Member
        </Button>
      )}

      {/* HOC Modal for Create & Delete */}
      <Modal
        open={modalToggle}
        onClose={() => setModalToggle(false)}
        title={mode === "Delete" ? "Delete Member" : "Create New Member"}
        size={mode === "Delete" ? "small" : "medium"}
      >
        {mode === "Delete" ? (
          <div className={styles["delete-wrapper"]}>
            <div>This team member will get deleted permanently.</div>
            <span>
              <Button
                type="button"
                size="sm"
                color="secondary"
                onClick={handleToggle}
              >
                Close
              </Button>

              <Button type="button" size="sm" onClick={handleDelete}>
                Confirm
              </Button>
            </span>
          </div>
        ) : (
          <MemberForm handleConfirmation={handleToggle} />
        )}
      </Modal>
    </div>
  )
}

export default Teams