import {Form, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import categoryService from '../../../Service/CategoryService';
import Header from '../../../Shared/Admin/Header/Header';
import Sidebar from '../../../Shared/Admin/Sidebar/Sidebar';
import $ from 'jquery';
import userService from "../../../Service/UserService";

function UpdateUser() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();


    const onFinish = async () => {
        $('#btnUpdate').prop('disabled', true).text('Đang lưu...');

        let inputs = $('#formUpdate input, #formUpdate textarea, #formUpdate select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file' && $(inputs[i]).attr('type') !== 'password') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnUpdate').prop('disabled', false).text('Lưu lại');
                return
            }
        }

        const formData = new FormData($('#formUpdate')[0]);

        await userService.adminUpdateUser(id, formData)
            .then((res) => {
                console.log("create user", res.data)
                alert("Lưu tài khoản thành công!")
                navigate("/admin/users/list")
            })
            .catch((err) => {
                console.log(err)
                alert(err.response.data.message)
                $('#btnUpdate').prop('disabled', false).text('Lưu lại');
            })
    };

    const detailUser = async () => {
        await userService.adminDetailUser(id)
            .then((res) => {
                setUser(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setLoading(false);
            })
    };


    useEffect(() => {
        detailUser();
    }, [form, id, loading])

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
                                                   defaultValue={user.full_name}
                                                   required/>
                                        </div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="email">Email</label>
                                                <input type="email" name="email" className="form-control"
                                                       defaultValue={user.email}
                                                       id="email" required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="phone">Số điện thoại</label>
                                                <input type="text" name="phone" className="form-control"
                                                       defaultValue={user.phone}
                                                       id="phone" required/>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="password">Mật khẩu</label>
                                                <input type="password" name="password" className="form-control"
                                                       id="password"/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="password_confirm">Nhập lại mật khẩu</label>
                                                <input type="password" name="password_confirm" className="form-control"
                                                       id="password_confirm"/>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="address">Địa chỉ</label>
                                            <input type="text" name="address" className="form-control" id="address"
                                                   defaultValue={user.address}
                                                   required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="about">Giới thiệu</label>
                                            <textarea name="about" id="about" cols="30" rows="5"
                                                      defaultValue={user.about}
                                                      className="form-control"></textarea>
                                        </div>

                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="avatar">Ảnh đại diện</label>
                                                <input type="file" name="avatar" className="form-control"
                                                       id="avatar"/>
                                                <img src={user.avt} alt="" className="mt-3" style={{width: '100px'}}/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select id="status" name="status" className="form-select">
                                                    <option selected={user.status === "ĐANG HOẠT ĐỘNG"}
                                                            value="ĐANG HOẠT ĐỘNG">ĐANG HOẠT ĐỘNG
                                                    </option>
                                                    <option selected={user.status === "KHÔNG HOẠT ĐỘNG"}
                                                            value="KHÔNG HOẠT ĐỘNG">KHÔNG HOẠT ĐỘNG
                                                    </option>
                                                    <option selected={user.status === "ĐÃ KHOÁ"}
                                                            value="ĐÃ KHOÁ">ĐÃ KHOÁ
                                                    </option>
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
