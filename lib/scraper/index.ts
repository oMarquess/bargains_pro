import axios from "axios";
import * as cheerio from 'cheerio'
import { extractCurrency, extractPrice } from "../utils";
export async function scrapeAmazonProduct(url:string) {
    if(!url) return;
    //Bright Data Config
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (100000 * Math.random())|0;

    const options = {
        auth: {
            username: '${username}-session-${session_id}',
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try{

        //Fetch the product page

        const response = await axios.get(url, options);
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        const title = $('#productTitle').text().trim();
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price')


        );
        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price')

        );
        const outOfStock = $('#availability span').text().trim().toLowerCase()=='currently unavailable';

        const images = 
        $('#imgBlkFront').attr('data-a-dynamic-image') ||
        $('#landingImage').attr('data-a-dynamic-image') ||
        '{}'

        const currency = extractCurrency($('.a-price-symbol'))
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, "");

        const imageUrls = Object.keys(JSON.parse(images));
        //console.log({title, currentPrice, originalPrice, imageUrls, currency, discountRate})
        //construct data object with scrapped information
        const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(originalPrice),
            discountRate: Number(discountRate),
            reviewsCount:100,
            stars:4.6,
            isOutOfStock: outOfStock,
            





        }

    }catch(error:any){
        throw new Error('Failed to scrape product: ${error.message}')
    }


}