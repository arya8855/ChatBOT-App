import Button from "../../components/Button";
import "../../components/css/settings.css";
import FormGenerator from "../../components/FormGenerator";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/Spinner";
import useSetting from "../../hooks/team/use-setting";

const SettingPage = ({ isChild = false }) => {
  const {
    SETTING_FORM_ELEMENTS,
    formErrors,
    handleSubmit,
    isUpdating,
    isLoading,
  } = useSetting({ isChild })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Header title="Settings" />

      <div className="setting-card">
        <div className="nav-tab-wrapper">
          <div className="tab-link active-tab-link">
            Edit Profile
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="setting-form-wrapper">
            {SETTING_FORM_ELEMENTS?.map((item) => (
              <FormGenerator
                key={item.name}
                inputType={item.inputType}
                type={item.type}
                label={item.label}
                checkboxLabel={item.checkboxLabel}
                placeholder={item.placeholder}
                defaultValue={item.defaultValue}
                hasRequiredMark={item.hasRequiredMark}
                suggesstionText={item.suggesstionText}
                disabled={item.disabled}
                className={item.className}
                name={item.name}
                onUpdate={item.onUpdate}
                error={item.error}
                validation={item.validation}
              />
            ))}
          </div>

          <Button
            type="submit"
            color="primary"
            size="md"
            className="setting-btn"
            isLoading={isUpdating}
            disabled={Object.keys(formErrors).length > 0}
          >
            Update Profile
          </Button>
        </form>
      </div>
    </>
  )
}

export default SettingPage