import { useEffect, useState } from "react"
import Navbar from "../Horizontal_Navbar/horizontal_navbar"
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar"
import requestApi from "../../utils/axios"
import apiHost from "../../utils/api"
import InputBox from "../input"

function AddStocks() {

    const [selectedCategory, setSelectedCategory] = useState([])
    const [category, setCategory] = useState([])
    const [field, setFields] = useState([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [showQty, setShowQty] = useState(false)

    const handleSelectCategory = (item) => {
        setSelectedCategory([...selectedCategory, item])
    }

    const fetchCategory = async () => {
        const res = await requestApi("GET", "/categories", {})
        console.log(res)
        if (res.success) {
            setCategory(res.data)
        }
    }

    const fetchFields = async (id) => {
        const res = await requestApi("GET", "/categories/" + id)
        console.log(res)
        if (res.success) {
            setFields(res.data)
            await fetchOptions(id, res.data[0].field_id)
        }
    }

    const fetchOptions = async (id, field_id) => {
        const res = await requestApi("GET", `/categories/${id === 0 ? selectedCategory[0].category_id : id}/${field_id === 0 ? field[selectedIndex].field_id : field_id}`)
        console.log(res)
        if (res.success) {
            setCategory(res.data)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="vandc-container">
                <VerticalNavbar />
                <div className="dashboard-body">
                    <div className="category-page">
                        <div style={{ width: '90%' }} className="select-category-card">
                            {
                                selectedCategory.length !== 0
                                    ? selectedCategory.map((item) => (
                                        item.details_image === 'null'
                                            ? <h2>{item.details_name}</h2>
                                            :
                                            <img src={`${apiHost}/${item.category_image === undefined ? item.details_image : item.category_image}`} alt={`${item.category_name} image`} />
                                    ))
                                    : <h2>Select your category</h2>
                            }
                        </div>
                        <div className="search-and-product-type-grid">


                            <div className="search-bar">
                                <h2>{showQty || selectedCategory.length === 0 || field.length === 0 ? "Category" : field[selectedIndex].field_name}</h2>
                                <input type="text" placeholder="Search products..." />
                            </div>

                            {
                                !showQty ?
                                    <div className="product-type-grid">
                                        {
                                            category.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="product-type-item" onClick={() => {
                                                        handleSelectCategory(item)
                                                        
                                                        if (selectedCategory.length === 0) {
                                                            fetchFields(item.category_id)
                                                        } else {
                                                            if (selectedIndex < field.length - 1) {
                                                                fetchOptions(selectedCategory[0].category_id, field[selectedIndex + 1].field_id)
                                                                setSelectedIndex(selectedIndex + 1)
                                                            } else {
                                                                setShowQty(true)
                                                            }
                                                        }
                                                    }}>
                                                    <p>{item.category_name === undefined ? item.details_name : item.category_name}</p>
                                                    {
                                                        item.details_image !== "null"
                                                            ?
                                                            <img src={`${apiHost}/${item.category_image === undefined ? item.details_image : item.category_image}`} alt={`${item.category_name} image`} />
                                                            : null
                                                    }
                                                </div>
                                            ))
                                        }
                                    </div>
                                    :<>
                                     <h1>Qty</h1>
                                    <InputBox label={'Price'} type={"price"} />
                                    <InputBox label={'Quantity'} type={"quantity"} />
                                    <button onClick={()=>{
                                        console.log(selectedCategory)
                                        alert(`Selected Category : ${selectedCategory[0].category_name} \n ${
                                            selectedCategory.map((item,i)=>(
                                                i !== 0 ? `${field[i - 1].field_name.toString()} - ${item.details_name.toString()+"\n"}`.replaceAll(",","") : null
                                            ))
                                        }
                                        `)
                                    }}> Generate +</button>
                                </>
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AddStocks