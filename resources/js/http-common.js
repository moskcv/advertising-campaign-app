import axios from "axios";

const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

export default axios.create({
    baseURL: "/api",
    headers: {
        "Content-type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": csrfToken
    }
});
