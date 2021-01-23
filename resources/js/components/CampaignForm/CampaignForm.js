import React from 'react';
import Form from '../ui/Form/Form';
import Input from '../ui/Input/Input';
import ImagePreview from '../ui/ImagePreview/ImagePreview';

const CampaignForm = ({formData, onChange, onSubmit, isFormValid, onImageRemove}) => {
    return (
        <Form
            onSubmit={onSubmit}
            isFormValid={isFormValid}
        >
            {
                Object.keys(formData).map((controlName, index) => {
                    const control = formData[controlName];

                    return (
                        <React.Fragment key={control + index}>
                            <Input
                                type={control.type}
                                name={controlName}
                                value={control.value}
                                valid={control.valid}
                                touched={control.touched}
                                className={control.className}
                                label={control.label}
                                errorMessage={control.errorMessage}
                                required={control.required}
                                multiple={control.multiple}
                                accept={control.accept}
                                onChange={event => onChange(event, controlName)}
                                files={control.files}
                            />

                            {(control.hasOwnProperty('files')) ? <ImagePreview control={control} controlName={controlName} onClick={onImageRemove} /> : null}
                        </React.Fragment>
                    );
                })
            }

        </Form>
    );
};

export default CampaignForm;
