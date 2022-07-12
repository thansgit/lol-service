import React, { useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesFetchAction } from "../../redux/slices/category/categorySlice";





const CategoryDropdown = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(categoriesFetchAction());
    }, [dispatch]);

    const category = useSelector(state => state?.category);
    const { categoryList, loading } = category;

    const allCategories = categoryList?.map(category => {
        return {
            label: category?.title,
            value: category?._id,
        };
    });

    //Handle change to pass from child to parent - in to createpost
    const handleChange = (value) => {
        props.onChange('category', value);
    };
    //Handle blur -||-
    const handleBlur = () => {
        props.onBlur('category', true)
    };


    return (
        <div style={{margin:'1rem 0'}}>
            {loading ? <h3 className="text-base text-custom-red">Categories loading...</h3>
                :
                <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id='category'
                    options={allCategories}
                    value={props?.value?.label}
                />}
            {/* Error message */}
            {props?.error &&
                <div style={{color:'red', marginTop:'.5rem'}}>
                    {props?.error}
                </div>}
        </div>
    );

};



export default CategoryDropdown
