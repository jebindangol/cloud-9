const baseUrl = process.env.NODE_ENV === "production" 
? 'https://www.buymesmokes.com/' 
: 'http://localhost:3000';

export default baseUrl;