import {Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import categoryService from '../../../Service/CategoryService';
import Header from '../../../Shared/Admin/Header/Header';
import Sidebar from '../../../Shared/Admin/Sidebar/Sidebar';
import $ from 'jquery';

function UpdateUser() {
    const [category, setCategory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const detailCategory = async () => {
        await categoryService.adminDetailCategory(id)
            .then((res) => {
                console.log("detail category", res.data);
                setCategory(res.data.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    };

    const getListCategory = async () => {
        await categoryService.adminListCategory()
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setCategories(res.data.data)
                    setLoading(false)
                } else {
                    alert(res.data.message)
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        detailCategory();
        getListCategory();
    }, [form, id, loading])


    const onFinish = async () => {
        $('#btnUpdate').prop('disabled', true).text('Đang lưu...');

        let inputs = $('#formUpdate input, #formUpdate textarea');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnUpdate').prop('disabled', false).text('Lưu thay đổi');
                return
            }
        }

        const formData = new FormData($('#formUpdate')[0]);

        await categoryService.adminUpdateCategory(id, formData)
            .then((res) => {
                message.success("Thay đổi thành công")
                navigate("/admin/categories/list")
            })
            .catch((err) => {
                console.log(err)
                message.error(err.response.data.message)
                $('#btnUpdate').prop('disabled', false).text('Lưu thay đổi');
            })
    };

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Chỉnh sửa tài khoản</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Trang quản trị</Link></li>
                            <li className="breadcrumb-item">Tài khoản</li>
                            <li className="breadcrumb-item active">Chỉnh sửa tài khoản</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Chỉnh sửa danh mục</h5>
                                    <Form onFinish={onFinish} id="formUpdate">
                                        <div className="form-group">
                                            <label htmlFor="full_name">Tên tài khoản</label>
                                            <input type="text" name="full_name" className="form-control" id="full_name"
                                                   required/>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" name="email" className="form-control"
                                                       id="email" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="phone">Số điện thoại</label>
                                                <input type="text" name="phone" className="form-control"
                                                       id="phone" required/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="password">Mật khẩu</label>
                                                <input type="password" name="password" className="form-control"
                                                       id="password" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="password_confirm">Nhập lại mật khẩu</label>
                                                <input type="password" name="password_confirm" className="form-control"
                                                       id="password_confirm" required/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input type="text" name="address" className="form-control" id="address"
                                                   required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="about">Giới thiệu</label>
                                            <textarea name="about" id="about" cols="30" rows="5"
                                                      className="form-control"></textarea>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="avatar">Ảnh đại diện</label>
                                                <input type="file" name="avatar" className="form-control"
                                                       id="avatar" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select id="status" name="status" className="form-select">
                                                    <option value="ĐANG HOẠT ĐỘNG">ĐANG HOẠT ĐỘNG</option>
                                                    <option value="KHÔNG HOẠT ĐỘNG">KHÔNG HOẠT ĐỘNG</option>
                                                    <option value="ĐÃ KHOÁ">ĐÃ KHOÁ</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" id="btnUpdate" className="btn btn-primary mt-3">Lưu lại
                                        </button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default UpdateUser
