import React, {useEffect, useState} from 'react'
import Header from '../../../Shared/Admin/Header/Header'
import Sidebar from '../../../Shared/Admin/Sidebar/Sidebar'
import {Button, Form, Input, message} from 'antd'
import userService from '../../../Service/UserService';
import {Link, useNavigate} from 'react-router-dom'
import $ from 'jquery';


function CreateUser() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const onFinish = async () => {
        $('#btnCreate').prop('disabled', true).text('Đang tạo mới...');

        let inputs = $('#formCreate input, #formCreate textarea, #formCreate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val()) {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
                return
            }
        }

        const formData = new FormData($('#formCreate')[0]);

        await userService.adminCreateUser(formData)
            .then((res) => {
                console.log("create user", res.data)
                alert("Tạo tài khoản thành công!")
                navigate("/admin/users/list")
            })
            .catch((err) => {
                console.log(err)
                alert(err.response.data.message)
                $('#btnCreate').prop('disabled', false).text('Tạo mới');
            })
    };

    useEffect(() => {
        setLoading(true);
    }, [loading]);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Tạo tài khoản</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Trang quản trị</Link></li>
                            <li className="breadcrumb-item">Tài khoản</li>
                            <li className="breadcrumb-item active">Tạo tài khoản</li>
                        </ol>
                    </nav>
                </div>
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Tạo tài khoản</h5>
                                    <Form onFinish={onFinish} id="formCreate">
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
                                        <button type="submit" id="btnCreate" className="btn btn-primary mt-3">Tạo
                                            mới
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

export default CreateUser
