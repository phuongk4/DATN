import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import attributeService from '../../Service/AttributeService';
import Header from "../../Shared/Client/Header/Header";
import Footer from "../../Shared/Client/Footer/Footer";
import productService from "../../Service/ProductService";
import $ from "jquery";

function ProductList() {
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [attributes, setAttributes] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    const getListProduct = async () => {
        await productService.listProduct('', sort_param)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setNewProducts(res.data.data)
                    setLoading(false)

                    // const productsPerPage = size_param ?? 12;
                    // const totalPages = Math.ceil(newProducts.length / productsPerPage);
                    // const indexOfLastProduct = currentPage * productsPerPage;
                    // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
                    // const currentProducts = newProducts.slice(indexOfFirstProduct, indexOfLastProduct);

                    // setProductsPerPage(size_param ?? 12);
                    // setTotalPages(Math.ceil(newProducts.length / productsPerPage));
                    // setIndexOfLastProduct(currentPage * productsPerPage);
                    // setIndexOfFirstProduct(indexOfLastProduct - productsPerPage);
                    // setCurrentProducts(newProducts.slice(indexOfFirstProduct, indexOfLastProduct));
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    let category_param = searchParams.get('category') ?? '';
    let keyword_param = searchParams.get('keyword') ?? '';
    let size_param = searchParams.get('size') ?? '';
    let sort_param = searchParams.get('sort') ?? '';
    let minPrice_param = searchParams.get('minPrice') ?? '';
    let maxPrice_param = searchParams.get('maxPrice') ?? '';

    $('#min-price').val(minPrice_param);
    $('#max-price').val(maxPrice_param);
    $('#keywordSearch').val(keyword_param);

    const [currentPage, setCurrentPage] = useState(1);

    // const [productsPerPage, setProductsPerPage] = useState([]);
    // const [totalPages, setTotalPages] = useState([]);
    // const [indexOfLastProduct, setIndexOfLastProduct] = useState([]);
    // const [indexOfFirstProduct, setIndexOfFirstProduct] = useState([]);
    // const [currentProducts, setCurrentProducts] = useState([]);

    let productsPerPage = parseInt(size_param);

    if (isNaN(productsPerPage) || productsPerPage <= 0) {
        productsPerPage = 12;
    }

    let totalPages = Math.ceil(newProducts.length / productsPerPage);

    let indexOfLastProduct = currentPage * productsPerPage;
    let indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    let currentProducts = newProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    console.log(newProducts.length, totalPages);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function searchMainProduct(categoryID, keywordID, sizeID, sortID, minPriceID, maxPriceID) {
        let baseurl = '/products/search';
        let category = categoryID ?? category_param;
        let keyword = keywordID ?? $('#keywordSearch').val();
        let size = sizeID ?? size_param;
        let sort = sortID ?? sort_param;
        let minPrice = minPriceID ?? $('#min-price').val() ?? '';
        let maxPrice = maxPriceID ?? $('#max-price').val() ?? '';
        let searchUrl = `${baseurl}?keyword=${keyword}&size=${size}&category=${category}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        console.log(searchUrl);
        window.location.href = searchUrl;
    }

    const getListAttribute = async () => {
        await attributeService.listAttribute()
            .then((res) => {
                if (res.status === 200) {
                    console.log("attribute", res.data.data)
                    setAttributes(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const sortProduct = (event) => {
        event.preventDefault();
        let sort_ = $('#sort').val();
        let size_ = $('#size').val();
        let url = window.location.href;
        let urlArray = url.split('?');
        if (urlArray.length > 1) {
            url = urlArray[0] + '?sort=' + sort_;
            url = url + '&size=' + size_;
        } else {
            url = url + '?sort=' + sort_;
            url = url + '&size=' + size_;
        }

        window.location.href = url;
    }

    const searchProduct = (event) => {
        event.preventDefault();
        searchMainProduct(null, null, null, null, null, null);
    }

    useEffect(() => {
        getListProduct();
        getListAttribute();
    }, [loading, size_param, sort_param, category_param, minPrice_param, maxPrice_param, keyword_param]);

    return (
        <div className="site-wrap">
            <Header/>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><a href="/">Trang chủ</a> <span
                            className="mx-2 mb-0">/</span> <strong className="text-black">Shop</strong></div>
                    </div>
                </div>
            </div>

            <div className="site-section">
                <div className="container">

                    <div className="row mb-5">
                        <div className="col-md-9 order-2">

                            <div className="row">
                                <div className="col-md-12 mb-5">
                                    <div className="float-md-left mb-4"><h2 className="text-black h5">Shop All</h2>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <div className="btn-group">
                                            <select name="size" id="size" className="form-select"
                                                    onChange={sortProduct}>
                                                <option selected={size_param === ''} value="">All</option>
                                                <option selected={size_param === '3'} value="3">3</option>
                                                <option selected={size_param === '6'} value="6">6</option>
                                                <option selected={size_param === '9'} value="9">9</option>
                                            </select>
                                        </div>

                                        <div className="btn-group ms-3">
                                            <select name="sort" id="sort" className="form-select"
                                                    onChange={sortProduct}>
                                                <option selected={sort_param === 'desc'} value="desc">From High to Low
                                                </option>
                                                <option selected={sort_param === 'asc'} value="asc">From Low to High
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-5">

                                {currentProducts.map((product) => (
                                    <div className="col-sm-6 col-lg-4 mb-4 productDetail">
                                        <div className="block-4 text-center border">
                                            <figure className="block-4-image">
                                                <a href={'/products/' + product.id}>
                                                    <img src={product.thumbnail}
                                                         alt={product.name}
                                                         className="img-fluid"/></a>
                                            </figure>
                                            <div className="block-4-text p-4">
                                                <h3><a className="text_truncate_2_ "
                                                       href={'/products/' + product.id}>{product.name}</a></h3>
                                                <p className="mb-0 text_truncate_2_"
                                                   dangerouslySetInnerHTML={{__html: product.short_description}}></p>
                                                <p className="text-primary font-weight-bold">{product.price}VND</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                }

                            </div>
                            <div className="row">
                                <div className="col-md-12 text-center">
                                    <div className="site-block-27">
                                        <ul>
                                            <li>
                                                <a href="#" onClick={() => handleClick(currentPage - 1)}>&lt;</a>
                                            </li>

                                            {Array.from({length: totalPages}, (_, i) => (
                                                <li key={i + 1} className={currentPage === i + 1 ? "active" : ""}>
                                                    <a href="#" onClick={() => handleClick(i + 1)}>{i + 1}</a>
                                                </li>
                                            ))}

                                            <li>
                                                <a href="#" onClick={() => handleClick(currentPage + 1)}>&gt;</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 order-1 mb-5 mb-md-0">
                            <div className="border p-4 rounded mb-4">
                                <h3 className="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
                                <ul className="list-unstyled mb-0">
                                    <li className="mb-1"><a href="#" className="d-flex"><span>Men</span> <span
                                        className="text-black ml-auto">(2,220)</span></a></li>
                                    <li className="mb-1"><a href="#" className="d-flex"><span>Women</span> <span
                                        className="text-black ml-auto">(2,550)</span></a></li>
                                    <li className="mb-1"><a href="#" className="d-flex"><span>Children</span> <span
                                        className="text-black ml-auto">(2,124)</span></a></li>
                                </ul>
                            </div>

                            <div className="border p-4 rounded mb-4">
                                <div className="mb-4">
                                    <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
                                    <div className="form-group d-flex align-items-center justify-content-between gap-3">
                                        <input type="number" name="min-price" id="min-price"
                                               className="form-control border"/>
                                        <span>-</span>
                                        <input type="number" name="max-price" id="max-price"
                                               className="form-control border"/>
                                    </div>
                                </div>

                                {
                                    attributes.length > 0 && (
                                        attributes.map((attribute) => (
                                            attribute.properties.length > 0 && (
                                                <div className="mb-4" key={attribute.id}>
                                                    <h3 className="mb-3 h6 text-uppercase text-black d-block">{attribute.name}</h3>
                                                    {
                                                        attribute.properties.map((property) => (
                                                            <label htmlFor={`property_${property.id}`} className="d-flex"
                                                                   key={property.id}>
                                                                <input type="checkbox" id={`property_${property.id}`}
                                                                       className="mr-2 mt-1"/>
                                                                <span className="text-black">{property.name}</span>
                                                                <span>
                                                                    <img className="ms-1" src={property.thumbnail}
                                                                         alt="" width="15px" height="15px"
                                                                         style={{
                                                                             width: '15px',
                                                                             height: '15px',
                                                                             objectFit: 'cover',
                                                                             borderRadius: '50%'
                                                                         }}/>
                                                                </span>
                                                            </label>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        ))
                                    )
                                }

                                <div className="mb-4">
                                    <button className="btn btn-primary w-100" type="button"
                                            onClick={searchProduct}>Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default ProductList
