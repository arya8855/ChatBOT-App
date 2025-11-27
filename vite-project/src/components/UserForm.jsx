import "./css/userForm.css";

const UserForm = ({
  data,
  isDisabled,
  placeholder,
  handleFormInput,
  handleFormSubmission,
}) => {
  return (
    <div className="chatbot-form-container">
      <small className="chatbot-form-title">Introduce Yourself</small>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isDisabled) handleFormSubmission();
        }}
        className="chatbot-form"
      >
        {/* NAME */}
        <label className="chatbot-form-label">Your name</label>
        <input
          type="text"
          name="userName"
          placeholder={placeholder.name}
          value={data.userName}
          onChange={handleFormInput}
          disabled={isDisabled}
          className="chatbot-form-input"
        />

        {/* PHONE */}
        <label className="chatbot-form-label">Your phone</label>
        <input
          type="text"
          name="userPhone"
          placeholder={placeholder.phone}
          value={data.userPhone}
          onChange={handleFormInput}
          disabled={isDisabled}
          className="chatbot-form-input"
        />

        {/* EMAIL */}
        <label className="chatbot-form-label">Your email</label>
        <input
          type="email"
          name="userEmail"
          placeholder={placeholder.email}
          value={data.userEmail}
          onChange={handleFormInput}
          disabled={isDisabled}
          className="chatbot-form-input"
        />

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isDisabled}
          className="chatbot-submit-btn"
        >
          {placeholder.button}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
