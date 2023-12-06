import { useEffect, useState } from "react";
import Navbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import requestApi from "../../utils/axios";
import apiHost from "../../utils/api";
import InputBox from "../input";

function AddStocks() {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [field, setFields] = useState([]);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showQty, setShowQty] = useState(false);
    const [name, setName] = useState("");

    const handleSelectCategory = (item) => {
        setSelectedCategory([...selectedCategory, item]);

        setName((prevName) => {
            return prevName + (prevName.length > 0 ? "," : "") + (item.category_name || item.details_name);
        });

        if (selectedCategory.length === 0) {
            fetchFields(item.category_id);
        } else {
            if (selectedIndex < field.length - 1) {
                fetchOptions(selectedCategory[0].category_id, field[selectedIndex + 1].field_id);
                setSelectedIndex(selectedIndex + 1);
            } else {
                setShowQty(true);
            }
        }
    };

    const fetchCategory = async () => {
        const res = await requestApi("GET", "/categories", {});
        console.log(res);
        if (res.success) {
            setCategory(res.data);
        }
    };

    const fetchFields = async (id) => {
        const res = await requestApi("GET", "/categories/" + id);
        console.log(res);
        if (res.success) {
            setFields(res.data);
            await fetchOptions(id, res.data[0].field_id);
        }
    };

    const fetchOptions = async (id, field_id) => {
        const res = await requestApi("GET", `/categories/${id === 0 ? selectedCategory[0].category_id : id}/${field_id === 0 ? field[selectedIndex].field_id : field_id}`);
        console.log(res);
        if (res.success) {
            setCategory(res.data);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="vandc-container">
                <VerticalNavbar />
                <div className="dashboard-body">
                    <div className="category-page">
                        <div style={{ width: '90%' }} className="select-category-card">
                            {selectedCategory.length !== 0 ? (
                                selectedCategory.map((item) => (
                                    item.details_image === 'null' ? (
                                        <h2 key={item.id}>{item.details_name}</h2>
                                    ) : (
                                        <img key={item.id} src={`${apiHost}/${item.category_image === undefined ? item.details_image : item.category_image}`} alt={`${item.category_name} image`} />
                                    )
                                ))
                            ) : (
                                <h2>Select your category</h2>
                            )}
                        </div>
                        <div className="search-and-product-type-grid">
                            <div className="search-bar">
                                <h2>{showQty || selectedCategory.length === 0 || field.length === 0 ? "Category" : field[selectedIndex].field_name}</h2>
                                <input type="text" placeholder="Search products..." />
                            </div>
                            {!showQty ? (
                                <div className="product-type-grid">
                                    {category.map((item, i) => (
                                        <div
                                            key={i}
                                            className="product-type-item"
                                            onClick={() => {
                                                handleSelectCategory(item);
                                                if (selectedCategory.length === 0) {
                                                    fetchFields(item.category_id);
                                                } else {
                                                    if (selectedIndex < field.length - 1) {
                                                        fetchOptions(selectedCategory[0].category_id, field[selectedIndex + 1].field_id);
                                                        setSelectedIndex(selectedIndex + 1);
                                                    } else {
                                                        setShowQty(true);
                                                    }
                                                }
                                            }}
                                        >
                                            <p>{item.category_name === undefined ? item.details_name : item.category_name}</p>
                                            {item.details_image !== "null" ? (
                                                <img src={`${apiHost}/${item.category_image === undefined ? item.details_image : item.category_image}`} alt={`${item.category_name} image`} />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <h1>Qty</h1>
                                    <InputBox
                                        label={"Price"}
                                        type={"price"}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                    <InputBox
                                        label={"Quantity"}
                                        type={"quantity"}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            console.log(selectedCategory);
                                            alert(`Selected Category: ${selectedCategory[0].category_id} \n ${
                                                selectedCategory.map((item, i) => (
                                                    i !== 0 ? `${field[i - 1].field_name.toString()} - ${item.detail_id.toString() + "\n"}`.replaceAll(",", "-") : null
                                                ))
                                            }
                                            Name:${name}\nPrice: ${price}\nQuantity: ${quantity}`.replaceAll(",","-"));
                                        }}
                                        style={{
                                            background: 'linear-gradient(to right,#9181F4,#5038ED)',
                                            border: 'none',
                                            outline: "none",
                                            marginTop: 20,
                                            padding: 10,
                                            fontSize: 17,
                                            borderRadius: 8,
                                            color: 'white',
                                            letterSpacing: 1.4
                                        }}
                                    >
                                        Generate +
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStocks;
