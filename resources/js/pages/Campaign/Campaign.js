import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import Header from '../../components/Header/Header';
import CampaignService from '../../services/CampaignService';
import CreativeService from '../../services/CreativeService';
import CampaignForm from "../../components/CampaignForm/CampaignForm";
import Loader from '../../components/ui/Loader/Loader';
import Alert from "../../components/ui/Alert/Alert";

import { buildCampaignFormData } from "../../utils/campaigns";

const Campaign = props => {
    let history = useHistory();

    const { id } = useParams();
    const isUpdating = !!id;

    const [alert, setAlert] = useState(null);
    const [formData, setFormData] = useState({});
    const [isFormValid, setFormValid] = useState(false);
    const [isLoading, setLoader] = useState(true);

    useEffect(() => {
        if (isUpdating) {
            console.log('test');
            CampaignService.get(id)
                .then(res => {
                    setFormData(buildCampaignFormData(res.data.data));
                    setFormValid(true);
                    setLoader(false);
                })
                .catch(err => {
                    handleError(err)
                });

            return;
        }

        setFormData(buildCampaignFormData());
        setLoader(false);
    }, []);

    const handleChange = (event, controlName) => {
        const formDataClone = {...formData};
        const control = {...formDataClone[controlName]};

        if (control.type === 'file') {
            formDataClone[controlName] = handleFileUpload(event, control);
        } else {
            control.value = event.target.value;
            control.touched = true;

            try {
                validateControl(control.value, control.validation);
                control.valid = true;
            } catch (e) {
                control.valid = false;
                control.errorMessage = e;
            }

            formDataClone[controlName] = control;
        }

        let isFormValid = true;
        Object.keys(formDataClone).map(name => {
            isFormValid = formDataClone[name].valid && isFormValid;
        });

        setFormData(formDataClone);
        setFormValid(isFormValid);
    };

    const validateControl = (value, rules) => {
        if (!rules) {
            return true;
        }

        if (rules.required) {
            if (value.trim() === '') {
                throw 'This element is required';
            }
        }

        if (rules.date) {
            if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
                throw 'Please, provid proper date format: yyyy-mm-dd';
            }

        }

        if (rules.float) {
            if (isNaN(Number(value))) {
                throw 'Please, provide valid number';
            }
        }
    };

    const handleFileUpload = (event, control) => {
        const files = event.target.files;
        control.touched = true;

        if (files.length) {
            const validFormates = [
                'image/png',
                'image/jpeg',
                'image/jpg',
                'image/bmp',
            ];
            for (let i = 0; i < files.length; i++) {
                if (validFormates.includes(files[i].type)) {
                    control.valid = true;
                    control.value = event.target.value;
                    control.files.push(files[i]);
                } else {
                    control.valid = false;
                    control.errorMessage = 'Please, provide only images';
                    control.value = '';
                }
            }
        }

        return control;
    };

    const handleFormSubmit = event => {
        setLoader(true);
        event.preventDefault();
        const data = new FormData();

        Object.keys(formData).map(controlName => {
            if (formData[controlName].type === 'file') {
                formData[controlName].files.map((file) => {
                    data.append(`${controlName}[]`, file);
                })
            } else {
                data.append(controlName, formData[controlName].value);
            }
        });

        if (isUpdating) {
            CampaignService.update(id, data)
                .then(res => {
                    setAlert({
                        type: 'success',
                        message: res.data.message
                    });
                    setFormData(buildCampaignFormData(res.data.data));
                    setFormValid(true);
                    setLoader(false);
                })
                .catch(err => {
                    handleError(err);
                });

            return;
        }

        CampaignService.create(data)
            .then(res => {
                setLoader(false);
                setAlert({
                    type: 'success',
                    message: res.data.message
                });
                history.push(`/campaigns/edit/${res.data.data}`);
            })
            .catch(err => {
                handleError(err);
            });
    };

    const handleError = err => {
        if (err.hasOwnProperty('response') && err.response.status === 422) {
            const errors = err.response.data;
            const formDataClone = {...formData};

            Object.keys(errors.errors).map(fieldName => {
                const errMessages = errors.errors[fieldName];
                if (fieldName.indexOf('.') !== -1) {
                    fieldName = fieldName.split('.')[0];
                }

                formDataClone[fieldName].valid = false;
                formDataClone[fieldName].touched = true;
                formDataClone[fieldName].errorMessage =
                    (formDataClone[fieldName].errorMessage) ?
                        `${formDataClone[fieldName].errorMessage}; ${errMessages.join("; ")}`
                        : errMessages.join("; ");
            });

            setAlert({
                type: 'danger',
                message: errors.message
            });
            setFormData(formDataClone);
        } else {
            setAlert({
                type: 'danger',
                message: err.response.data.message || err.response.data.statusText
            });
        }

        setLoader(false);
    };

    const handleImageRemove = (controlName, id, keyType) => {
        setLoader(true);
        const formDataClone = {...formData};

        formDataClone[controlName][keyType] = formDataClone[controlName][keyType].filter((file, i) => {
            if (keyType === 'uploaded') {
                return file.id !== id;
            }

            return i !== id;
        });

        if (keyType === 'uploaded') {
            CreativeService.remove(id)
                .then(res => {
                    setAlert({
                        type: 'success',
                        message: res.data.message
                    });
                })
                .catch(err => {
                    handleError(err);
                });
        }

        setFormData(formDataClone);
        setLoader(false);
    };

    return (
        <div className="container">
            <Loader isLoading={isLoading} />
            <div className="row">
                <div className="col-12">
                    <Header
                        title={(isUpdating) ? `Edit campaign ID: ${id}` : 'Create campaign'}
                        buttonText="Back to all campaigns"
                        buttonLink="/"
                    />
                    <Alert
                        alert={alert}
                        onClose={() => setAlert(null)}
                    />
                    <CampaignForm
                        formData={formData}
                        onChange={handleChange}
                        isFormValid={isFormValid}
                        onSubmit={handleFormSubmit}
                        onImageRemove={handleImageRemove}
                    />
                </div>
            </div>
        </div>
    );
};

export default Campaign;
