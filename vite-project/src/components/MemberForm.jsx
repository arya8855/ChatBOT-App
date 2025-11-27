import React from 'react';
import Button from "./Button";
import FormGenerator from "./FormGenerator";
import styles from '../Styles/memberform.module.css';
import useMemberForm from "../hooks/team/use-member-form"

const MemberForm = ({ handleConfirmation }) => {
  const { MEMBER_FORM_ELEMENTS, formErrors, handleSubmission, isLoading } =
    useMemberForm({ confirmFn: handleConfirmation })


  return (
    <div>
        <div className={styles.description }>
        Talk with colleagues in a group chat. Messages in this group are only
        visible to its participants. New teammates may only be invited by the
        administrators.
      </div>
      <form onSubmit={handleSubmission}>
        {MEMBER_FORM_ELEMENTS?.map((item) => (
          <FormGenerator
            key={item.name}
            inputType={item.inputType}
            type={item.type}
            label={item.label}
            checkboxLabel={item.checkboxLabel}
            placeholder={item.placeholder}
            options={item.options}
            name={item.name}
            onUpdate={item.onUpdate}
            error={item.error}
            validation={item.validation}
        />
        ))}

        <Button
          type="submit"
          className={styles.submitBtn}
          disabled={isLoading || Object.keys(formErrors).length > 0}
        >
          Create New Member
        </Button>
      </form>
    </div>
  );
}
export default MemberForm;