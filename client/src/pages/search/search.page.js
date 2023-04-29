import React from "react"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import "./search.page.css"
// import {IoWarningSharp} from "react-icons/io5"
import ProductCard from "../../components/product-card/productCard"
import product_svc from "../../services/product.service"
const SearchPage = () => {
    let [query] = useSearchParams();
    let [searchData, setSearchData] = useState();
    const getSearchResults = useCallback(async (searchKeyword) => {
        try {
            let result = await product_svc.listSearchData(searchKeyword);
            if (result.result) {
                setSearchData(result.result);
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(() => {
        getSearchResults(query.get('q'));
    }, [query])

    return (
        <div className="row search">
            <h2 className="sub-title">Search results for "{query.get('q')}"</h2>
            <div className="search-container">
                <div className="row">
                    {
                        searchData ?
                            <>
                                {
                                    searchData.map((product, index) => (
                                        <div className="col-lg-2 col-md-6 col-sm-12">
                                            <ProductCard product={product} />
                                        </div>
                                    ))
                                }

                            </>
                            :
                            <>
                            not found
                                {/* <div className="not-found">
                                    <IoWarningSharp size={20}/>dfgfg
                                </div> */}
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPage