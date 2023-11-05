import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


interface Props{
    product: Product;

}
const ProductCard = ({product}:Props) => {
  return (
    <Link href={'/products/${products._id}'} className ="product-card">
    <div className="product-card_img-container">
        <Image 
        src={product.image}
        alt={product.title}
        height = {200}
        width={200}
        className='product-card_img'/>
    </div>
    </Link>
  )
}

export default ProductCard
