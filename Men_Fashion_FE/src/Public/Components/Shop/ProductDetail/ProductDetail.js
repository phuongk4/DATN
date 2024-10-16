import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Form, message} from 'antd';
import cartService from '../../Service/CartService';
import Header from "../../Shared/Client/Header/Header";
import Footer from "../../Shared/Client/Footer/Footer";
import productService from "../../Service/ProductService";
import feedbackService from "../../Service/FeedbackService";
import $ from "jquery";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";

function ProductDetail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [optionsProduct, setOptionsProduct] = useState([]);
    const [product_others, setProductOthers] = useState([]);

    const getProduct = async () => {
        await productService.detailProduct(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("product", res.data.data)
                    setProduct(res.data.data.product)
                    setProductOthers(res.data.data.other_products)
                    setOptionsProduct(res.data.data.product.options)
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    const handleShowDescription = () => {
        let product_description_ = $('#product_description_area_ .product_description_');
        if (product_description_.hasClass('show_')) {
            product_description_.removeClass('show_')
            $('#btnReadmore').text('Xem thêm')
        } else {
            product_description_.addClass('show_')
            $('#btnReadmore').text('Ẩn bớt')
        }
    }

    const minusQuantity = () => {
        let qty = $('#inputQuantity').val();
        qty = parseInt(qty);
        if (qty > 1) {
            qty = qty - 1;
            $('#inputQuantity').val(qty);
        }
    }

    const plusQuantity = () => {
        let qty = $('#inputQuantity').val();
        qty = parseInt(qty);
        qty = qty + 1;
        $('#inputQuantity').val(qty);
    }

    const checkInput = () => {
        let val = $('#inputQuantity').val();

        if (!$.isNumeric(val)) {
            val = val.replace(/\D/g, '');

            $('#inputQuantity').val(val);
        }
    }

    useEffect(() => {
        getProduct();
    }, [loading]);

    return (
        <div className="site-wrap">
            <Header/>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><a href="">Trang chủ</a> <span
                            className="mx-2 mb-0">/</span> <strong className="text-black">{product.name}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section">
                <div className="container">
                    <Form className="row">
                        <div className="col-md-6">
                            <img src={product.thumbnail} alt="Image" className="img-fluid"/>
                        </div>
                        <div className="col-md-6">
                            <h2 className="text-black">{product.name}</h2>
                            <p dangerouslySetInnerHTML={{__html: product.short_description}}></p>
                            <p><strong className="text-primary h4">{product.price}</strong> VND</p>
                            <div className="list_option_">
                                {
                                    optionsProduct.map((option, optionIndex) => (
                                        <div className="option_item" key={optionIndex}>
                                            <h6 className="option_name">{option.attribute.name}</h6>
                                            <div className="mb-1 d-flex">
                                                {
                                                    option.properties && option.properties.length > 0 ? (
                                                        option.properties.map((property, propertyIndex) => {
                                                            const inputId = `option-${optionIndex}-property-${propertyIndex}`;
                                                            return (
                                                                <label htmlFor={inputId} className="d-flex mr-3 mb-3" key={propertyIndex}>
                                                                    <span className="d-inline-block mr-2" style={{top: '0px', position: 'relative'}}>
                                                                        <input type="radio" value={option.attribute.id + '-' + property.id} id={inputId} name={`option-${optionIndex}`}/>
                                                                    </span>
                                                                    <span className="d-inline-block text-black">{property.name}</span>
                                                                </label>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>No properties available</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                            <div className="mb-5">
                                <div className="input-group mb-3" style={{maxWidth: '150px'}}>
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-primary js-btn-minus" onClick={minusQuantity}
                                                type="button">-
                                        </button>
                                    </div>

                                    <input type="text" className="form-control text-center" defaultValue="1"
                                           placeholder="" min='0' max={product.quantity} onInput={checkInput}
                                           aria-label="Example text with button addon" id="inputQuantity"
                                           aria-describedby="button-addon1"/>

                                    <div className="input-group-append">
                                        <button className="btn btn-outline-primary js-btn-plus" onClick={plusQuantity}
                                                type="button">+
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <p><a href="/cart" className="buy-now btn btn-sm btn-primary">Add To Cart</a></p>

                        </div>
                        <div className="col-md-12" id="product_description_area_">
                            <p className="product_description_" dangerouslySetInnerHTML={{__html: product.description}}></p>
                            <button id="btnReadmore" onClick={handleShowDescription} type="button"
                                    className="btn btn-outline-info">Xem thêm
                            </button>
                        </div>
                    </Form>

                    <div className="w-100 border-top mt-5 mb-3" id="product_review_area_">
                        <h5 className="text-start text-danger mt-3">Đánh giá gần đây</h5>

                        <div className="list_review_content_ mt-2">
                            <div className="verified_customer_section mb-2">
                                <div className="image_review">
                                    <div className="customer_image">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0664/2191/5900/t/8/assets/screenshot-20221121-alle-191353-1669054447602.png?v=1669054450"
                                            alt="customer image"/>
                                    </div>

                                    <div className="customer_name_review_status">
                                        <div className="customer_name">Olivia Smith</div>
                                        <div className="customer_review">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                </div>


                                <div className="customer_comment">"My little boy loves it! He used to spend hours
                                    watching
                                    videos on my phone, since we bought Drawing Projector all he does is drawing, it's
                                    like
                                    the phone never existed, I'm so happy!"
                                </div>

                            </div>

                            <div className="verified_customer_section mb-2">
                                <div className="image_review">
                                    <div className="customer_image">
                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0664/2191/5900/t/8/assets/screenshot-20221121-alle-191353-1669054447602.png?v=1669054450"
                                            alt="customer image"/>
                                    </div>

                                    <div className="customer_name_review_status">
                                        <div className="customer_name">Olivia Smith</div>
                                        <div className="customer_review">
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                    </div>
                                </div>


                                <div className="customer_comment">"My little boy loves it! He used to spend hours
                                    watching
                                    videos on my phone, since we bought Drawing Projector all he does is drawing, it's
                                    like
                                    the phone never existed, I'm so happy!"
                                </div>

                            </div>
                        </div>

                        <h5 className="text-start text-success mt-3">Đánh giá của bạn...</h5>

                        <Form id="formReviewProduct">
                            <div className="form-group">
                                <label htmlFor="option-sm" className="d-flex mr-3">
                                    <span className="d-inline-block mr-2"
                                          style={{top: '0', position: 'relative'}}><input
                                        type="radio" id="option-sm" name="stars"/></span> <span
                                    className="d-inline-block text-black">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star none_active"></i>
                                        <i className="fa-solid fa-star none_active"></i>
                                        <i className="fa-solid fa-star none_active"></i>
                                        <i className="fa-solid fa-star none_active"></i> (Rất Tệ)
                                    </span>
                                </label>
                                <label htmlFor="option-md" className="d-flex mr-3">
                                    <span className="d-inline-block mr-2"
                                          style={{top: '0', position: 'relative'}}><input
                                        type="radio" id="option-md" name="stars"/></span> <span
                                    className="d-inline-block text-black">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star none_active"></i>
                                        <i className="fa-solid fa-star none_active"></i>
                                        <i className="fa-solid fa-star none_active"></i> (Tệ)
                                </span>
                                </label>
                                <label htmlFor="option-lg" className="d-flex mr-3">
                                    <span className="d-inline-block mr-2"
                                          style={{top: '0', position: 'relative'}}><input
                                        type="radio" id="option-lg" name="stars"/></span> <span
                                    className="d-inline-block text-black"> <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star none_active"></i>
                                        <i className="fa-solid fa-star none_active"></i> (Bình thường)</span>
                                </label>
                                <label htmlFor="option-xl" className="d-flex mr-3">
                                    <span className="d-inline-block mr-2"
                                          style={{top: '0', position: 'relative'}}><input
                                        type="radio" id="option-xl" name="stars"/></span> <span
                                    className="d-inline-block text-black">   <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star none_active"></i> (Tốt)</span>
                                </label>
                                <label htmlFor="option-xxl" className="d-flex mr-3">
                                    <span className="d-inline-block mr-2"
                                          style={{top: '0', position: 'relative'}}><input
                                        type="radio" id="option-xxl" name="stars"/></span> <span
                                    className="d-inline-block text-black"> <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i> (Rất Tốt)</span>
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Tiêu đề</label>
                                <input type="text" className="form-control" id="title" name="title" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Nội dung</label>
                                <textarea className="form-control" id="content" name="content" rows="5"></textarea>
                            </div>

                            <button type="submit" className="btn btn-secondary" id="btnSendReview">Gửi đánh giá</button>
                        </Form>
                    </div>
                </div>
            </div>

            <div className="site-section block-3 site-blocks-2 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 site-section-heading text-center pt-4">
                            <h2>Sản phẩm liên quan</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{clickable: true}}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {product_others?.length > 0 ? (
                                        product_others.map((product, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="item">
                                                    <div className="block-4 text-center">
                                                        <figure className="block-4-image">
                                                            <img
                                                                src={product.thumbnail || "/assets/clients/images/cloth_1.jpg"}
                                                                alt={product.name || "Image placeholder"}
                                                                className="img-fluid"
                                                            />
                                                        </figure>
                                                        <div className="block-4-text p-4">
                                                            <h3><a className="text_truncate_"
                                                                   href={`/products/${product.id}`}>{product.name || "Product Name"}</a>
                                                            </h3>
                                                            <p className="mb-0 text_truncate_2_"
                                                               dangerouslySetInnerHTML={{__html: product.short_description}}></p>
                                                            <p className="text-primary font-weight-bold">${product.price || 50}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        <p>No products available</p>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProductDetail
