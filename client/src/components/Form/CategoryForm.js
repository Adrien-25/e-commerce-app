import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="my-3 d-flex justify-content-center">
                <div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Enter new category'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="ms-2 btn btn-dark">✔️</button>
            </form>

        </>
    )
}

export default CategoryForm;