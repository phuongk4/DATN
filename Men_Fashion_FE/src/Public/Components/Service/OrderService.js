import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    LIST_ORDER: "/api/orders/list",
    DETAIL_ORDER: "/api/orders/detail/",
    CREATE_ORDER: "/api/checkout/create",
    CREATE_ORDER_VNPAY: "/api/checkout/checkout_vnpay",
    CREATE_ORDER_VNPAY_V2: "/api/orders/vnpay-v2",
    CREATE_ORDER_VNPAY_RETURN: "/api/orders/vnpay-return",
    CANCEL_ORDER: "/api/orders/cancel/",
    // ADMIN
    ADMIN_LIST_ORDER: "/admin/api/orders/list",
    ADMIN_DETAIL_ORDER: "/admin/api/orders/detail/",
    ADMIN_UPDATE_ORDER: "/admin/api/orders/",
    ADMIN_DELETE_ORDER: "/admin/api/orders/",
}

class OrderService {
    // USER
    listOrder = (status) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST_ORDER + '?status=' + status, config);
    }

    detailOrder = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.DETAIL_ORDER + id, config);
    }

    createOrder = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_ORDER, data, config);
    }

    createOrderVnpay = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_ORDER_VNPAY, data, config);
    }
    createOrderVnpayV2 = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_ORDER_VNPAY_V2, data, config);
    }
    createOrderVnpayReturn = (data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.CREATE_ORDER_VNPAY_RETURN, data, config);
    }

    cancelOrder = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.CANCEL_ORDER + id, '', config);
    }


    // ADMIN
    adminListOrder = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_LIST_ORDER, config);
    }

    adminDetailOrder = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DETAIL_ORDER + id, config);
    }

    adminUpdateOrder = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.ADMIN_UPDATE_ORDER + id + '?status=' + data, "", config)
    }

    adminDeleteOrder = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.ADMIN_DELETE_ORDER + id, config);
    }
}

const orderService = new OrderService();
export default orderService;