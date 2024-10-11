import {Button, Form, Input, message} from 'antd';
import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import orderService from '../../../Service/OrderService';
import Header from '../../Header/Header'
import Sidebar from '../../Sidebar/Sidebar'
import $ from 'jquery';

function DetailOrder() {

    const {id} = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [order, setData] = useState([]);

    const detailOrder = async () => {
        await orderService.adminDetailOrder(id)
            .then((res) => {
                console.log('order: ' + res.data);
                renderOrder(res.data);
            })
            .catch((err) => {
                console.log(err)
            })
    };

    function renderOrder(order) {
        $('.FullName').text(order.fullName);
        $('.Email').text(order.email);
        $('.Phone').text(order.phone);
        $('.Address').text(order.address);
        $('#allProductPrice').text(order.totalProduct);
        $('#shipping_fee').text(order.shippingFee);
        $('#discount_fee').text(order.discountFee);
        $('#order_total').text(order.totalPrice);
        $('.notes').text(order.notes);
        $('#status').val(order.status);
        renderProduct(order.orderItemsList);
    }

    function renderProduct(orderItemsList) {
        let html = ``;
        for (let i = 0; i < orderItemsList.length; i++) {
            let orderItem = orderItemsList[i];
            let product = orderItem.product;

            html += `<tr>
                        <td>
                            <img src="${product.image}" alt="" width="100px">
                        </td>
                        <td>${product.name}</td>
                        <td>${orderItem.quantity}</td>
                        <td>${orderItem.price}</td>
                        <td>${parseFloat(orderItem.quantity) * parseFloat(orderItem.price)}</td>
                    </tr>`;
        }

        $('#tableOrderItem').empty().append(html);
    }

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
                            <li className="breadcrumb-item"><Link to="/profile">Người dùng</Link></li>
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
                                                    <thead>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Tên đầy đủ
                                                        </th>
                                                        <th className="text-black FullName">

                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Email
                                                        </th>
                                                        <th className="text-black Email">

                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Số điện thoại
                                                        </th>
                                                        <th className="text-black Phone">

                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-black font-weight-bold">
                                                            Địa chỉ
                                                        </th>
                                                        <th className="text-black Address">

                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Tổng tiền của sản phẩm</strong></td>
                                                        <td className="text-black">$
                                                            <span id="allProductPrice">0</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Phí vận chuyển</strong>
                                                        </td>
                                                        <td className="text-black">$
                                                            <span id="shipping_fee">0</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Miễn giảm giá</strong>
                                                        </td>
                                                        <td className="text-black">$
                                                            <span id="discount_fee">0</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>Tổng tiền
                                                            </strong>
                                                        </td>
                                                        <td className="text-black font-weight-bold">
                                                            <strong>$
                                                                <span id="order_total">0</span>
                                                            </strong>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                                <h5>Ghi chú:</h5>
                                                <div className="notes">

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

                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select id="status" className="form-select" disabled>
                                                    <option value="PROCESSING">Đang xử lý</option>
                                                    <option value="SHIPPING">Đang vận chuyển</option>
                                                    <option value="DELIVERED">Giao hàng thành công</option>
                                                    <option value="CANCELED">Đã hủy</option>
                                                </select>
                                            </div>
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

export default DetailOrder
