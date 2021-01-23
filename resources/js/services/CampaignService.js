import http from '../http-common';

const EDPOIONT = '/campaigns';

class CampaignService {
    getAll() {
        return http.get(`${EDPOIONT}`);
    }

    get(id) {
        return http.get(`${EDPOIONT}/${id}`);
    }

    create(data) {
        return http.post(`${EDPOIONT}`, data);
    }

    update(id, data) {
        // Workaround -> Laraver could not process PUT requests with multipart-form data
        data.append('_method', 'PUT');
        return http.post(`${EDPOIONT}/${id}`, data);
    }

    remove(id) {
        return http.delete(`${EDPOIONT}/${id}`);
    }
}

export default new CampaignService();
