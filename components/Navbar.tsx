// Importing necessary components from Next.js and React
import Link from 'next/link' // Used for client-side transitions between routes
import Image from 'next/image' // Optimized image component for Next.js
import React from 'react' // React library import, necessary for JSX

// Array of objects representing navigation icons with their image paths and alternative text
const navIcons = [
    { src: '/assets/icons/search.svg', alt: 'search' },
    { src: '/assets/icons/black-heart.svg', alt: 'heart' },
    { src: '/assets/icons/user.svg', alt: 'user' },
]

// Navbar functional component
const Navbar = () => {
  return (
    // Header tag defining the navigation bar's container
    <header className='w-full'>
        {/* Navigation container with a custom 'nav' class */}
        <nav className='nav'>
            {/* Link component wrapping the logo and text for navigation to the home page */}
            <Link href="/" className='flex items-center gap-1'>
                {/* Image component for the logo with specified dimensions and alt text */}
                <Image 
                src='/assets/icons/logo.svg'
                width={27}
                height={27}
                alt='logo'
                />

                {/* Paragraph tag for the site's name with a span highlighting 'Pro' */}
                <p className='nav-logo'>
                    Bargains <span className='text-primary'>Pro</span>
                </p>
            </Link>
            {/* Container for navigation icons */}
            <div className="flex items-center gap-5">
                {/* Mapping through navIcons array to render each icon */}
                {navIcons.map((icon) => (
                    <Image 
                    key={icon.alt} // Unique key for each child in a list, using the alt text
                    src={icon.src} // Source path for the icon image
                    alt={icon.alt} // Alternative text for the icon image
                    width={28} // Width of the icon image
                    height={28} // Height of the icon image
                    className='object-contain' // Class for CSS styling
                    />
                ))}

            </div>

        </nav>

    </header>
  )
}

// Exporting Navbar component for use in other parts of the application
export default Navbar
