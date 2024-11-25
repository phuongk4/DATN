import {BASE_URL_SERVER} from "../config/server";
import axios from "axios";

const API_ENDPOINT = {
    POST_CONTACT: "/api/contacts/create",
    // ADMIN
    LIST_CONTACT: "/admin/api/contacts/list",
    DETAIL_CONTACT: "/admin/api/contacts/detail/",
    UPDATE_CONTACT: "/admin/api/contacts/",
    DELETE_CONTACT: "/admin/api/contacts/",
}

class ContactService {
    //
    sendContact = (data) => {
        return axios.post(BASE_URL_SERVER + API_ENDPOINT.POST_CONTACT, data);
    }
    // ADMIN
    listContact = () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.LIST_CONTACT, config);
    }

    updateContact = (id, data) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        console.log(config)
        return axios.put(BASE_URL_SERVER + API_ENDPOINT.UPDATE_CONTACT + id + "?status=" + data, "", config);
    }

    detailContact = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.get(BASE_URL_SERVER + API_ENDPOINT.DETAIL_CONTACT + id, config)
    }

    deleteContact = (id) => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
            }
        };
        return axios.delete(BASE_URL_SERVER + API_ENDPOINT.DELETE_CONTACT + id, config);
    }
}

const contactService = new ContactService();
export default contactService;