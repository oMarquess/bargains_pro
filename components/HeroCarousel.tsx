
// 'use client' is a Next.js directive for client-side only components
'use client'
// Importing the Image component from Next.js for optimized image handling
import Image from 'next/image'
// Importing carousel styles, make sure you have a loader configured in your webpack for CSS
import "react-responsive-carousel/lib/styles/carousel.min.css";
// Importing the Carousel component from 'react-responsive-carousel' package
import { Carousel } from "react-responsive-carousel";

// Array of objects representing hero images with their image paths and alternative text
const heroImage = [
    { imgUrl: '/assets/images/hero-1.svg', alt: 'smartwatch' },
    { imgUrl: '/assets/images/hero-2.svg', alt: 'bag' },
    { imgUrl: '/assets/images/hero-3.svg', alt: 'lamp' },
    { imgUrl: '/assets/images/hero-4.svg', alt: 'air fryer' },
    { imgUrl: '/assets/images/hero-5.svg', alt: 'chair' },
]

// HeroCarousel functional component
const HeroCarousel = () => {
  return (
    // Container for the hero carousel
    <div className='hero-carousel'>
       {/* Carousel component with various props for behavior customization */}
       <Carousel
         showThumbs={false} // Hides thumbnail display
         autoPlay // Enables auto-play of slides
         interval={2000} // Time interval between auto-play slides
         showArrows={false} // Hides navigation arrows
         showStatus={false} // Hides the status of the current slide
       >
            {/* Mapping through heroImage array to render each image inside the carousel */}
            {heroImage.map((image) => (
                <Image
                  src={image.imgUrl} // Source path for the hero image
                  alt={image.alt} // Alternative text for the hero image
                  height={484} // Height of the hero image
                  width={484} // Width of the hero image
                  className='object-contain' // Class for CSS styling
                  key={image.alt} // Unique key for each child in a list, using the alt text
                />
            ))}
       </Carousel>

       {/* Static image outside of the carousel */}
       <Image
         src="/assets/icons/hand-drawn-arrow.svg" // Source path for the arrow image
         alt='arrow' // Alternative text for the arrow image
         width={175} // Width of the arrow image
         height={175} // Height of the arrow image
         className='max-xl:hidden absolute -left-[15%] bottom-0' // Class for CSS styling
       />
    </div>
  )
}

// Exporting HeroCarousel component for use in other parts of the application
export default HeroCarousel
