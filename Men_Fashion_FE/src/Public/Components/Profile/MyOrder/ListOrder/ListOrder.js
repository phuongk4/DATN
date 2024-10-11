import React, {useEffect, useState} from 'react'
import Header from '../../Header/Header'
import Sidebar from '../../Sidebar/Sidebar'
import {Table} from 'antd';
import orderService from '../../../Service/OrderService';
import {Link} from 'react-router-dom';
import $ from "jquery";

function ListOrder() {
    let userId = sessionStorage.getItem('id');

    const handleCancel = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng?')) {
            await orderService.cancelOrder(id)
                .then((res) => {
                    console.log("cancel", res.data)
                    alert(`Hủy đơn hàng thành công!`)
                    getListOrder();
                })
                .catch((err) => {
                    console.log(err)
                    let res = err.response;
                    let mess = res.data.message;
                    alert('Thất bại ' + mess);
                })
        }
    }

    const loadFn = async () => {
        $(document).ready(function () {
            $("#inputSearchOrder").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $(".ant-table-content table tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
        });
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: '5%',
        },
        {
            title: 'Tên đầy đủ',
            dataIndex: 'fullName',
            width: '15%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            width: '15%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '15%',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '20%',
        },
        {
            title: 'Tổng tiền ',
            dataIndex: 'totalPrice',
            width: '5%',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: '5%',
        },
        {
            title: 'Hành động',
            dataIndex: 'id',
            key: 'x',
            render: (id) =>
                <>
                    <Link to={`/my-order/${id}`} className="btn btn-primary">
                        Xem chi tiết
                    </Link>

                    <button type="button" id={`btnDelete_${id}`} className="btn btn-danger"
                            onClick={() => handleCancel(id)}>Hủy đơn hàng
                    </button>
                </>
        },
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const getListOrder = async () => {
        await orderService.listOrder(userId)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setData(res.data)
                    setLoading(false)
                } else {
                    alert('Error')
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }


    useEffect(() => {
        getListOrder();
        loadFn();
    }, []);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    return (
        <div>
            <Header/>
            <Sidebar/>

            <main id="main" className="main" style={{backgroundColor: "#f6f9ff"}}>
                <div className="pagetitle">
                    <h1>Danh sách đơn hàng</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/profile">Người dùng</Link></li>
                            <li className="breadcrumb-item">Đơn hàng</li>
                            <li className="breadcrumb-item active">Danh sách đơn hàng</li>
                        </ol>
                    </nav>
                </div>

                <div className="row">
                    <div className="mb-3 col-md-3">
                        <h5>Tìm kiếm đơn hàng</h5>
                        <input className="form-control" id="inputSearchOrder" type="text" placeholder="Nhập thông tin.."/>
                        <br/>
                    </div>
                    <Table
                        style={{margin: "auto"}}
                        columns={columns}
                        dataSource={data}
                        pagination={tableParams.pagination}
                        loading={loading}
                        onChange={handleTableChange}
                    />
                </div>

            </main>
        </div>
    )
}

export default ListOrder
