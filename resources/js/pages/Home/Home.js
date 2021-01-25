import React, { useState, useEffect } from 'react';

import CampaignService from '../../services/CampaignService';

import Header from '../../components/Header/Header';
import Alert from '../../components/ui/Alert/Alert';
import DataTable from '../../components/ui/DataTable/DataTable';
import Modal from '../../components/ui/Modal/Modal';
import Loader from '../../components/ui/Loader/Loader';

const Home = () => {
    const [isLoading, setLoader] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const [modal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        CampaignService.getAll()
            .then(res => {
                setCampaigns(res.data.data);
                setLoader(false);
            })
            .catch(e => {
                setAlert({
                    type: 'danger',
                    message: e.response.data.message || e.response.data.statusText
                });
                setLoader(false);
            });
    }, []);

    const handleDelete = id => {
        setLoader(true);
        CampaignService.remove(id)
            .then(res => {
                const campaignsClone = campaigns.filter(campaign => {
                    return campaign.id !== id;
                });

                setCampaigns(campaignsClone);
                setAlert({
                    type: 'success',
                    message: res.data.message
                });
                setLoader(false);
            })
            .catch(e => {
                setAlert({
                    type: 'danger',
                    message: e.response.data.message || e.response.data.statusText
                });
                setLoader(false);
            });
    };

    const handlePreview = id => {
        setLoader(true);
        const campaign = campaigns.find(campaign => {
            return campaign.id === id;
        });
    };

    return (
        <div className="container">
            <Loader isLoading={isLoading} />
            <div className="row">
                <div className="col-12">
                    <Header
                        title="Advertising campaigns list"
                        buttonText="Add campaign"
                        buttonLink="/campaigns/create"
                    />
                    <Alert
                        alert={alert}
                        onClose={() => setAlert(null)}
                    />
                    <DataTable
                        data={campaigns}
                        onDelete={handleDelete}
                        onPreview={handlePreview}
                    />
                </div>
            </div>
            <Modal
                header='Preview creatives'
                onClick={() => setShowModal(false)}
                isVisible={modal}
            >
            </Modal>
        </div>
    );
};

export default Home;
