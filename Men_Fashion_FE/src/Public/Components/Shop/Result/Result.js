import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useSearchParams} from 'react-router-dom';
import {Form, message} from 'antd';
import categoryService from '../../Service/CategoryService';
import propertyService from '../../Service/PropertyService';
import attributeService from '../../Service/AttributeService';
import Header from "../../Shared/Client/Header/Header";
import Footer from "../../Shared/Client/Footer/Footer";
import productService from "../../Service/ProductService";
import $ from "jquery";

function Result() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [searchParams] = useSearchParams();

    let category_param = searchParams.get('category');
    let keyword_param = searchParams.get('keyword');
    let size_param = searchParams.get('size');
    let sort_param = searchParams.get('sort');
    let minPrice_param = searchParams.get('minPrice');
    let maxPrice_param = searchParams.get('maxPrice');

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

    // Lọc sản phẩm theo size và sort
    const filterProduct = () => {
        setLoading(true);
        searchMainProduct(null, null, $('#size').val(), $('#sort').val(), null, null);
    }

    const getListCategory = async () => {
        await categoryService.listCategory()
            .then((res) => {
                if (res.status === 200) {
                    console.log("category", res.data.data)
                    setCategories(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // Lấy gía trị thuộc tính
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

    // Gọi hàm tìm kiếm
    const handleClick = (event) => {
        event.preventDefault();
        const categoryId = event.currentTarget.getAttribute('data-id');
        searchMainProduct(categoryId, null, null, null, null, null);
    }

    /* Gọi hàm search */
    const searchProduct = (event) => {
        event.preventDefault();
        searchMainProduct(null, null, null, null, null, null);
    }

    // Gọi api search product với các giá trị từ tham số
    const getListProduct = async () => {
        await productService.searchProduct(category_param, keyword_param, size_param, sort_param, minPrice_param, maxPrice_param)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data", res.data)
                    setProducts(res.data.data)
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
        getListCategory();
        getListAttribute();
    }, [loading]);

    return (
        <div className="site-wrap">
            <Header/>
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
                                                    onChange={filterProduct}>
                                                <option selected={size_param === ''} value="">All</option>
                                                <option selected={size_param === '3'} value="3">3</option>
                                                <option selected={size_param === '6'} value="6">6</option>
                                                <option selected={size_param === '9'} value="9">9</option>
                                            </select>
                                        </div>

                                        <div className="btn-group ms-3">
                                            <select name="sort" id="sort" className="form-select"
                                                    onChange={filterProduct}>
                                                <option selected={sort_param === 'desc'} value="desc">Từ cao đến thấp
                                                </option>
                                                <option selected={sort_param === 'asc'} value="asc">Từ thấp đến cao
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-5">
                                {
                                    products.map((product) => (
                                        <div className="col-sm-6 col-lg-4 mb-4 productDetail" key={product.id}>
                                            <div className="block-4 text-center border">
                                                <figure className="block-4-image">
                                                    <a href={`/products/${product.id}`}>
                                                        <img src={product.thumbnail}
                                                             alt={product.name}
                                                             className="img-fluid"/>
                                                    </a>
                                                </figure>
                                                <div className="block-4-text p-4">
                                                    <h3><a className="text_truncate_2_"
                                                           href={`/products/${product.id}`}>{product.name}</a></h3>
                                                    <p className="mb-0 text_truncate_2_"
                                                       dangerouslySetInnerHTML={{__html: product.short_description}}></p>
                                                    <p className="text-primary font-weight-bold">{product.sale_price} VND</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="col-md-3 order-1 mb-5 mb-md-0">
                            <div className="border p-4 rounded mb-4">
                                <h3 className="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
                                <ul className="list-unstyled mb-0 product_category">
                                    {
                                        categories.map((category) => (
                                            <li className="mb-1" key={category.id}>
                                                <a href={'/products?category=' + category.id} data-id={category.id}
                                                   className={`d-flex category${category_param}`}
                                                   onClick={handleClick}>
                                                    <span>{category.name}</span>
                                                    <span className="text-black ml-auto">({category.count})</span>
                                                </a>
                                            </li>
                                        ))
                                    }
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

export default Result
