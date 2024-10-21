import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import Header from '../Shared/Client/Header/Header';
import Footer from '../Shared/Client/Footer/Footer';
import $ from 'jquery';
import productService from "../Service/ProductService";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

window.jQuery = $;
window.$ = $;


/**
 * The Home component renders the main page of the application.
 * It contains a hero section, a section with 3 boxes, a section with 3 images,
 * a section with a carousel of products, a section with a big banner and a
 * section with a footer.
 * @return {JSX.Element}
 */
function Home() {
    const [loading, setLoading] = useState(true);
    const [newProducts, setNewProducts] = useState([]);

    const getListProduct = async () => {
        await productService.listProduct('', '')
            .then((res) => {
                if (res.status === 200) {
                    setNewProducts(res.data.data)
                    setLoading(false)
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    useEffect(() => {
        getListProduct();
    }, [loading]);

    return (
        <div className="site-wrap">
            <Header/>
            <div className="site-blocks-cover" style={{backgroundImage: `url('/assets/clients/images/hero_1.jpg')`}}>
                <div className="container">
                    <div className="row align-items-start align-items-md-center justify-content-end">
                        <div className="col-md-5 text-center text-md-left pt-5 pt-md-0">
                            <h1 className="mb-2">Finding Your Perfect Shoes</h1>
                            <div className="intro-text text-center text-md-left">
                                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                                    at iaculis quam. Integer accumsan tincidunt fringilla. </p>
                                <p>
                                    <a href="#" className="btn btn-sm btn-primary">Shop Now</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section site-section-sm site-blocks-1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-truck"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Free Shipping</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam.
                                    Integer accumsan tincidunt fringilla.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-refresh2"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Free Returns</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam.
                                    Integer accumsan tincidunt fringilla.</p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4">
                            <div className="icon mr-4 align-self-start">
                                <span className="icon-help"></span>
                            </div>
                            <div className="text">
                                <h2 className="text-uppercase">Customer Support</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam.
                                    Integer accumsan tincidunt fringilla.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section site-blocks-2">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <a className="block-2-item" href="#">
                                <figure className="image">
                                    <img src="/assets/clients/images/women.jpg" alt="" className="img-fluid"/>
                                </figure>
                                <div className="text">
                                    <span className="text-uppercase">Collections</span>
                                    <h3>Women</h3>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
                            <a className="block-2-item" href="#">
                                <figure className="image">
                                    <img src="/assets/clients/images/children.jpg" alt="" className="img-fluid"/>
                                </figure>
                                <div className="text">
                                    <span className="text-uppercase">Collections</span>
                                    <h3>Children</h3>
                                </div>
                            </a>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0">
                            <a className="block-2-item" href="#">
                                <figure className="image">
                                    <img src="/assets/clients/images/men.jpg" alt="" className="img-fluid"/>
                                </figure>
                                <div className="text">
                                    <span className="text-uppercase">Collections</span>
                                    <h3>Men</h3>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section block-3 site-blocks-2 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 site-section-heading text-center pt-4">
                            <h2>Featured Products</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <div className="item">
                                            <div className="block-4 text-center">
                                                <figure className="block-4-image">
                                                    <img src="/assets/clients/images/cloth_1.jpg"
                                                         alt="Image placeholder"
                                                         className="img-fluid"/>
                                                </figure>
                                                <div className="block-4-text p-4">
                                                    <h3><a href="#">Tank Top</a></h3>
                                                    <p className="mb-0">Finding perfect t-shirt</p>
                                                    <p className="text-primary font-weight-bold">$50</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="item">
                                            <div className="block-4 text-center">
                                                <figure className="block-4-image">
                                                    <img src="/assets/clients/images/shoe_1.jpg" alt="Image placeholder"
                                                         className="img-fluid"/>
                                                </figure>
                                                <div className="block-4-text p-4">
                                                    <h3><a href="#">Corater</a></h3>
                                                    <p className="mb-0">Finding perfect products</p>
                                                    <p className="text-primary font-weight-bold">$50</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="item">
                                            <div className="block-4 text-center">
                                                <figure className="block-4-image">
                                                    <img src="/assets/clients/images/cloth_2.jpg"
                                                         alt="Image placeholder"
                                                         className="img-fluid"/>
                                                </figure>
                                                <div className="block-4-text p-4">
                                                    <h3><a href="#">Polo Shirt</a></h3>
                                                    <p className="mb-0">Finding perfect products</p>
                                                    <p className="text-primary font-weight-bold">$50</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="item">
                                            <div className="block-4 text-center">
                                                <figure className="block-4-image">
                                                    <img src="/assets/clients/images/cloth_3.jpg"
                                                         alt="Image placeholder"
                                                         className="img-fluid"/>
                                                </figure>
                                                <div className="block-4-text p-4">
                                                    <h3><a href="#">T-Shirt Mockup</a></h3>
                                                    <p className="mb-0">Finding perfect products</p>
                                                    <p className="text-primary font-weight-bold">$50</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="item">
                                            <div className="block-4 text-center">
                                                <figure className="block-4-image">
                                                    <img src="/assets/clients/images/shoe_1.jpg" alt="Image placeholder"
                                                         className="img-fluid"/>
                                                </figure>
                                                <div className="block-4-text p-4">
                                                    <h3><a href="#">Corater</a></h3>
                                                    <p className="mb-0">Finding perfect products</p>
                                                    <p className="text-primary font-weight-bold">$50</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section block-3 site-blocks-2 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 site-section-heading text-center pt-4">
                            <h2>Sản phẩm mới nhất</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={30}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {newProducts.map((product, index) => (
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
                                                               href={'/products/' + product.id}>{product.name || "Product Name"}</a>
                                                        </h3>
                                                        <p className="mb-0 text_truncate_2_"
                                                           dangerouslySetInnerHTML={{__html: product.short_description}}></p>
                                                        <p className="text-primary font-weight-bold">${product.price || 50}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-section block-8">
                <div className="container">
                    <div className="row justify-content-center  mb-5">
                        <div className="col-md-7 site-section-heading text-center pt-4">
                            <h2>Big Sale!</h2>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-12 col-lg-7 mb-5">
                            <a href="#"><img src="/assets/clients/images/blog_1.jpg" alt="Image placeholder"
                                             className="img-fluid rounded"/></a>
                        </div>
                        <div className="col-md-12 col-lg-5 text-center pl-md-5">
                            <h2><a href="#">50% less in all items</a></h2>
                            <p className="post-meta mb-4">By <a href="#">Carl Smith</a> <span
                                className="block-8-sep">&bullet;</span> September 3, 2018</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iste dolor accusantium
                                facere corporis ipsum animi deleniti fugiat. Ex, veniam?</p>
                            <p><a href="#" className="btn btn-primary btn-sm">Shop Now</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home;
