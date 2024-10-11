import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    DETAIL_MARKETING: "/api/marketings/show",
    // ADMIN
    ADMIN_LIST_MARKETING: "/admin/api/marketings/list",
    ADMIN_DETAIL_MARKETING: "/admin/api/marketings/detail/",
    ADMIN_POST_MARKETING: "/admin/api/marketings",
    ADMIN_UPDATE_MARKETING: "/admin/api/marketings/",
    ADMIN_DELETE_MARKETING: "/admin/api/marketings/",
}

class MarketingService {
    // USER
    detailMarketing = () => {
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.DETAIL_MARKETING);
    }
    // ADMIN
    adminListMarketing = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_MARKETING, config);
    }

    adminListMarketingStatus = (status) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_MARKETING_STATUS + status, config);
    }

    adminDetailMarketing = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_MARKETING + id, config);
    }

    adminCreateMarketing = (data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.ADMIN_POST_MARKETING, data, config);
    }

    adminUpdateMarketing = (id, data) => {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_MARKETING + id, data, config)
    }

    adminDeleteMarketing = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_MARKETING + id, config);
    }
}

const marketingService = new MarketingService();
export default marketingService;