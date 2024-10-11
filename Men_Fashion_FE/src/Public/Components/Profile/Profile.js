import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import accountService from "../Service/AccountService";
import {Form, message} from "antd";
import $ from "jquery";

function Profile() {
    const navigate = useNavigate();
    const email = sessionStorage.getItem("email")
    const Token = sessionStorage.getItem("accessToken")

    const [data, setData] = useState([]);

    const checkLogin = async () => {
        if (email == null || Token == null) {
            navigate('/login')
        }
    };

    const check_pass = async () => {
        if (document.getElementById('newPassword').value === document.getElementById('renewPassword').value) {
            document.getElementById('btnChangePass').disabled = false;
        } else {
            document.getElementById('btnChangePass').disabled = true;
        }
    }

    const getUser = async () => {
        await accountService.getInfo()
            .then((res) => {
                setData(res.data);
                console.log("data:", JSON.parse(JSON.stringify(res.data)));
                let user = JSON.parse(JSON.stringify(res.data.data));
                setData(user);
            })
            .catch((err) => {
                console.log(err)
                let stt = err.response.status;
                if (stt === 444) {
                    alert('Phiên đăng nhập đã hết hạn, đăng nhập lại...');
                    sessionStorage.clear();
                    navigate('/login');
                } else {
                    navigate('/not-found');
                }
            });
    };

    const updateInfo = async () => {
        let id = sessionStorage.getItem('id');

        $('#btnSave').prop('disabled', true).text('Saving Changes...');

        let inputs = $('#formUpdateInfo input, #formUpdateInfo textarea, #formUpdateInfo select');
        for (let i = 0; i < inputs.length; i++) {
            if (!$(inputs[i]).val() && $(inputs[i]).attr('type') !== 'file') {
                let text = $(inputs[i]).prev().text();
                alert(text + ' không được bỏ trống!');
                $('#btnSave').prop('disabled', false).text('Lưu thay đổi');
                return
            }
        }

        const formData = new FormData($('#formUpdateInfo')[0]);

        await accountService.updateAccount(id, formData)
            .then((res) => {
                console.log("update", res.data)
                alert("Thay đổi thông tin thành công!")
                getUser();
                $('#btnSave').prop('disabled', false).text('Lưu thay đổi');
            })
            .catch((err) => {
                message.error("Thay đổi thông tin thất bại! Vui lòng thử lại sau")
                $('#btnSave').prop('disabled', false).text('Lưu thay đổi');
            })
    };

    function clickHandleImage() {
        var loadFile = function (event) {
            var output = document.getElementById('avtPreview');
            output.src = URL.createObjectURL(event.target.files[0]);
            output.onload = function () {
                URL.revokeObjectURL(output.src)
            }
        };

        $('#input_avatar').change(function (event) {
            loadFile(event);
        });
    }

    function showUpload() {
        $('#input_avatar').trigger('click');
    }

    clickHandleImage();

    const changePass = async () => {
        $('#btnChangePass').prop('disabled', true).text('Changing...');
        let id = sessionStorage.getItem('id');

        var oldPassword = document.getElementById("currentPassword").value;
        var password = document.getElementById("newPassword").value;
        var confirmPassword = document.getElementById("renewPassword").value;

        if (!oldPassword) {
            alert("Vui lòng nhập mật khẩu hiện tại!")
            return;
        }

        if (!password) {
            alert("Vui lòng nhập mật khẩu mới!")
            return;
        }

        if (!confirmPassword) {
            alert("Vui lòng nhập mật khẩu xác nhận!")
            return;
        }

        let data = {
            oldPassword: oldPassword,
            password: password,
            confirmPassword: confirmPassword
        }
        await accountService.changePassAccount(id, data)
            .then((res) => {
                $('#btnChangePass').prop('disabled', false).text('Lưu thay đổi');
                console.log("change pass: ", res.data)
                alert("Đổi mật khẩu thành công!")
                $('#formChangePassword')[0].reset();
            })
            .catch((err) => {
                $('#btnChangePass').prop('disabled', false).text('Lưu thay đổi');
                console.log(err)
                message.error("Đổi mật khẩu thất bại! Vui lòng thử lại sau")
            })
    };

    useEffect(() => {
        checkLogin();
        getUser();
        check_pass();
    }, []);

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1>Trang cá nhân</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                            <li className="breadcrumb-item">Người dùng</li>
                            <li className="breadcrumb-item active">Trang cá nhân</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section profile">
                    <div className="row">
                        <div className="col-xl-4">
                            <div className="card">
                                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                    <img src={data.avatar} alt="Profile" className="rounded-circle" width="100px"/>
                                    <h2>{data.fullName}</h2>
                                    <h3>{data.userName}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="card">
                                <div className="card-body pt-3">
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab"
                                                    data-bs-target="#profile-overview">Tổng quan
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab"
                                                    data-bs-target="#profile-edit">Chỉnh sửa trang cá nhân
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab"
                                                    data-bs-target="#profile-change-password">Đổi mật khẩu
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-2">
                                        <div className="tab-pane fade show active profile-overview"
                                             id="profile-overview">
                                            <h5 className="card-title">Chi tiết</h5>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label ">Tên đầy đủ:</div>
                                                <div className="col-lg-9 col-md-8">{data.fullName}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Tên đăng nhập:</div>
                                                <div className="col-lg-9 col-md-8">{data.userName}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Giới tính</div>
                                                <div className="col-lg-9 col-md-8">{data.gender}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Ngày sinh</div>
                                                <div className="col-lg-9 col-md-8">{data.birthday}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Địa chỉ</div>
                                                <div className="col-lg-9 col-md-8">{data.addressInfo}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Số điện thoại</div>
                                                <div className="col-lg-9 col-md-8">{data.phoneNum}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-4 label">Email</div>
                                                <div className="col-lg-9 col-md-8">{data.userEmail}</div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                                            {/* Profile Edit Form */}
                                            <Form className="form-update-info" id="formUpdateInfo"
                                                  onFinish={updateInfo}>
                                                <div className="row mb-3">
                                                    <label htmlFor="profileImage"
                                                           className="col-md-4 col-lg-3 col-form-label">Ảnh đại
                                                        diện: </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <img style={{borderRadius: "50%"}} src={data.avatar}
                                                             alt="Profile" width="100px" id="avtPreview"/>
                                                        <div className="pt-2">
                                                            <button type="button" onClick={showUpload} id="btnUploadAvt"
                                                                    className="btn btn-primary btn-sm">
                                                                <label className="upload position-relative">
                                                                    <p className="mb-0">
                                                                        <i className="bi bi-cloud-arrow-up text-white fs-6"></i>
                                                                    </p>
                                                                </label>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mb-3 d-none">
                                                    <label htmlFor="input_avatar"
                                                           className="col-md-4 col-lg-3 col-form-label">Ảnh đại
                                                        diện: </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="file" type="file" className="form-control"
                                                               id="input_avatar"/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="fullName"
                                                           className="col-md-4 col-lg-3 col-form-label">Tên đầy
                                                        đủ: </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="fullName" type="text" className="form-control"
                                                               id="fullName" defaultValue={data.fullName}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="Job"
                                                           className="col-md-4 col-lg-3 col-form-label">Giới
                                                        tính</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="gender" type="text" className="form-control"
                                                               id="gender" defaultValue={data.gender}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="birthday"
                                                           className="col-md-4 col-lg-3 col-form-label">Ngày
                                                        sinh</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="birthday" type="text" className="form-control"
                                                               id="birthday" defaultValue={data.birthday}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="addressInfo"
                                                           className="col-md-4 col-lg-3 col-form-label">Đia chỉ</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="addressInfo" type="text" className="form-control"
                                                               id="addressInfo" defaultValue={data.addressInfo}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="phoneNum"
                                                           className="col-md-4 col-lg-3 col-form-label">Số điện
                                                        thoại</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="phoneNum" type="text" className="form-control"
                                                               id="phoneNum" defaultValue={data.phoneNum}/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="userEmail"
                                                           className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="userEmail" type="email" className="form-control"
                                                               id="userEmail" defaultValue={data.userEmail}/>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" id="btnSave" className="btn btn-primary">
                                                        Lưu thay đổi
                                                    </button>
                                                </div>
                                            </Form>{/* End Profile Edit Form */}
                                        </div>
                                        <div className="tab-pane fade pt-3" id="profile-change-password">
                                            {/* Change Password Form */}
                                            <Form className="form-change-password" id="formChangePassword"
                                                  onFinish={changePass}>
                                                <div className="row mb-3">
                                                    <label htmlFor="currentPassword"
                                                           className="col-md-4 col-lg-3 col-form-label">Mật khẩu hiện
                                                        tại</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="password" type="password" className="form-control"
                                                               id="currentPassword"/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="newPassword"
                                                           className="col-md-4 col-lg-3 col-form-label">Mật khẩu
                                                        mới</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="newpassword" type="password" onKeyUp={check_pass}
                                                               className="form-control" id="newPassword"/>
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="renewPassword"
                                                           className="col-md-4 col-lg-3 col-form-label">Xác nhận mật
                                                        khẩu mới</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="renewpassword" type="password" onKeyUp={check_pass}
                                                               className="form-control" id="renewPassword"/>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button id="btnChangePass" type="submit"
                                                            className="btn btn-primary">Lưu thay đổi
                                                    </button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>

    )
}

export default Profile
