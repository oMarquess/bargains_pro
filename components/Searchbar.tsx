// 'use client' is a Next.js directive for client-side only components
'use client'
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

// Function to validate if a URL is an Amazon product URL
const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check if the hostname is an Amazon domain
    return hostname.includes('amazon.com') ||
           hostname.includes('amazon.') ||
           hostname.endsWith('amazon');
  } catch (error) {
    // If URL parsing fails, return false
    return false;
  }
}

// Searchbar functional component
const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit  = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if the entered URL is valid
    const isValidLink = isValidAmazonProductURL(searchPrompt);
    //  displaying an error or proceeding with a valid link
    // alert(isValidLink ? 'Valid link': 'Invalidd link')
    if(!isValidLink) return alert ('Please provide a valid link')
    try {
  setIsLoading(true);

  //Scrapping
  const product = await scrapeAndStoreProduct(searchPrompt);

  } catch(error){
    console.log(error);
  }
  finally{
    setIsLoading(false);
  }
  }

  // Render the search bar form
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter product link"
        className="searchbar-input"        
      />

      <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
        {isLoading ? 'Searching...': 'Search'}
      </button>
    </form>
  )
}

// Export the Searchbar component
export default Searchbar
