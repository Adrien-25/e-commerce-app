import React from 'react';

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit} className="mb-3 d-flex">
                <div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder='Enter new category'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="ms-2 btn btn-primary">✔️</button>
            </form>

        </>
    )
}

export default CategoryForm;