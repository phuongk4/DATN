import {Button, Form, Input, message} from 'antd';
import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import orderService from '../../../Service/OrderService';
import Header from '../../../Shared/Admin/Header/Header'
import Sidebar from '../../../Shared/Admin/Sidebar/Sidebar'
import $ from 'jquery';
import ConvertNumber from "../../../Shared/Utils/ConvertNumber";

function DetailOrder() {
    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('');

    const [order, setData] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const updateOrder = async (id) => {
        let status = $('#status').val();
        let data = {
            status: status,
        };
        if (window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng?')) {
            await orderService.adminUpdateOrder(id, data)
                .then((res) => {
                    console.log("cancel", res.data.data)
                    alert(`Thay đổi trạng thái thành công!`)
                    detailOrder();
                })
                .catch((err) => {
                    console.log(err)
                    let res = err.response;
                    let mess = res.data.message;
                    alert('Thất bại ' + mess);
                })
        }
    }

    const handleCancel = async (id) => {
        let reason_cancel = $('#reason_cancel').val();
        let data = {
            reason_cancel: reason_cancel,
        };
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng?')) {
            await orderService.adminUpdateOrder(id, data)
                .then((res) => {
                    console.log("cancel", res.data.data)
                    alert(`Hủy đơn hàng thành công!`)
                    detailOrder();
                })
                .catch((err) => {
                    console.log(err)
                    let res = err.response;
                    let mess = res.data.message;
                    alert('Thất bại ' + mess);
                })
        }
    }

    const detailOrder = async () => {
        await orderService.adminDetailOrder(id)
            .then((res) => {
                console.log('order: ' + res.data);
                setData(res.data.data);
                setOrderItems(res.data.data.order_items);
                setSelectedValue(res.data.data.status);
            })
            .catch((err) => {
                console.log(err)
            })
    };

    useEffect(() => {
        detailOrder();
    }, [form, id])

    return (
        <>
            <Header/>
            <Sidebar/>
            <main id="main" className="main" style={{backgroundColor: "#f6f9ff"}}>
                <div className="pagetitle">
                    <h1>Chi tiết đơn hàng</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/admin/dashboard">Trang quản trị</Link></li>
                            <li className="breadcrumb-item">Đơn hàng</li>
                            <li className="breadcrumb-item active">Chi tiết đơn hàng</li>
                        </ol>
                    </nav>
                </div>
                {/* End Page Title */}
                <section className="section">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Chi tiết đơn hàng</h5>
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <div className="p-3 border">
                                                <table className="table site-block-order-table mb-5">
                                                    <colgroup>
                                                        <col width="40%"/>
                                                        <col width="60%"/>
                                                    </colgroup>
                                                    <thead>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Tên đầy đủ
                                                        </th>
                                                        <th className="text-black FullName">
                                                            {order.full_name}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Email
                                                        </th>
                                                        <th className="text-black Email">
                                                            {order.email}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Số điện thoại
                                                        </th>
                                                        <th className="text-black Phone">
                                                            {order.phone}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Địa chỉ
                                                        </th>
                                                        <th className="text-black Address">
                                                            {order.address}
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Phương thức thanh toán
                                                        </th>
                                                        <th className="text-black Address">
                                                            {order.order_method}
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Tổng tiền của sản phẩm</strong></td>
                                                        <td className="text-black">
                                                            <span
                                                                id="allProductPrice">{ConvertNumber(order.products_price)}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Phí vận chuyển</strong>
                                                        </td>
                                                        <td className="text-black">
                                                            <span
                                                                id="shipping_fee">{ConvertNumber(order.shipping_price)}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Miễn giảm giá</strong>
                                                        </td>
                                                        <td className="text-black">
                                                            <span
                                                                id="discount_fee">{ConvertNumber(order.discount_price)}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Tổng tiền
                                                            </strong>
                                                        </td>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>
                                                                <span
                                                                    id="order_total">{ConvertNumber(order.total_price)}</span>
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <h5>Ghi chú:</h5>
                                                <div className="notes">
                                                    {order.notes}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="p-3 p-lg-5 border">
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Hình ảnh</th>
                                                        <th scope="col">Tên sản phẩm</th>
                                                        <th scope="col">Số lượng</th>
                                                        <th scope="col">Đơn giá</th>
                                                        <th scope="col">Thành tiền</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody id="tableOrderItem">
                                                    {
                                                        orderItems.map((orderItem, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <img src={orderItem.product.thumbnail} alt=""
                                                                             width="100px"/>
                                                                    </td>
                                                                    <td>{orderItem.product.name}</td>
                                                                    <td>{orderItem.quantity}</td>
                                                                    <td>{orderItem.price}</td>
                                                                    <td>{ConvertNumber(orderItem.price * orderItem.quantity)}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select id="status" className="form-select" value={selectedValue}
                                                        onChange={handleChange}>
                                                    <option defaultValue="ĐANG XỬ LÝ">ĐANG XỬ LÝ</option>
                                                    <option defaultValue="ĐANG CHỜ THANH TOÁN">ĐANG CHỜ THANH TOÁN
                                                    </option>
                                                    <option defaultValue="ĐANG VẬN CHUYỂN">ĐANG VẬN CHUYỂN</option>
                                                    <option defaultValue="ĐÃ GIAO HÀNG">ĐÃ GIAO HÀNG</option>
                                                    <option defaultValue="ĐÃ HOÀN THÀNH">ĐÃ HOÀN THÀNH</option>
                                                    <option defaultValue="ĐÃ HỦY">ĐÃ HỦY</option>
                                                </select>
                                            </div>
                                            {order.status === 'ĐANG XỬ LÝ' && (
                                                <div className="d-flex gap-3 align-items-center justify-content-start">
                                                    <button type="button" className="btn btn-primary mt-3"
                                                            onClick={() => updateOrder(order.id)}>
                                                        Lưu trạng thái
                                                    </button>

                                                    <button type="button" data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal"
                                                            className="btn btn-danger mt-3">
                                                        Hủy đơn hàng
                                                    </button>
                                                </div>
                                            )}
                                            {order.reason_cancel && (
                                                <>
                                                    <h5 className="mt-2 font-weight-bold">Lý do huỷ đơn hàng:</h5>
                                                    <div className="text-danger">
                                                        {order.reason_cancel}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Huỷ đơn hàng</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="reason_cancel" className="text-black">Lý do huỷ đơn hàng</label>
                                <textarea name="reason_cancel" id="reason_cancel" cols="30" rows="5"
                                          className="form-control"
                                          placeholder="Vui lòng nhập lý do huỷ đơn hàng của bạn ở đây..."></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-danger" onClick={() => handleCancel(order.id)}>
                                Xác nhận huỷ đơn hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailOrder
