import http from '../http-common';

const EDPOIONT = '/creatives';

class CreativeService {
    remove(id) {
        return http.delete(`${EDPOIONT}/${id}`);
    }
}

export default new CreativeService();
