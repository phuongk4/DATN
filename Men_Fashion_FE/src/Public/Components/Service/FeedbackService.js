import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    LIST_FEEDBACK_BY_PRODUCT: "/api/reviews/list/",
    POST_FEEDBACK: "/api/reviews",
    // ADMIN
    LIST_FEEDBACK: "/admin/api/reviews/list",
    DETAIL_FEEDBACK: "/admin/api/reviews/detail/",
    UPDATE_FEEDBACK: "/admin/api/reviews/",
    DELETE_FEEDBACK: "/admin/api/reviews/",
}

class FeedbackService {
    // USER
    getFeedbackByProduct = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };

        return axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST_FEEDBACK_BY_PRODUCT + id, config);
    }

    sendFeedback = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };

        return axios.post(BASE_URL_SERVER + API_ENDPOINT.POST_FEEDBACK, data, config);
    }

    // ADMIN
    listFeedback = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST_FEEDBACK, config);
    }

    updateFeedback = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.UPDATE_FEEDBACK + id + "?status=" + data, "", config);
    }

    detailFeedback = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.DETAIL_FEEDBACK + id, config)
    }

    deleteFeedback = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_FEEDBACK + id, config);
    }
}

const feedbackService = new FeedbackService();
export default feedbackService;