import axios from 'axios'
import React from 'react'

const DetailsCategoryInfo = async () => {

    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/product-details-category/get-all`)
    const data = res.data.data

    return (
        <div className='grid grid-cols-4 gap-4'>
            {
                data.length !== 0 && data.map(cat => <div key={cat._id}>
                    <h3>{cat.name}</h3>
                </div>)
            }
        </div>
    )
}

export default DetailsCategoryInfo