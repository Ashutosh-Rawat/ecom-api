export default class ProductModel {
    constructor({name, desc, url, category, price, sizes, stock}) {
        this.productName = name
        this.productDesc = desc
        this.productImgUrl = url
        this.categories = category
        this.productPrice = parseFloat(price)
        this.productSizes = Array.isArray(sizes) ? 
            sizes : (
                sizes ? 
                sizes.split(',').map(ele => ele.trim()) : null
            )
        this.stock = stock ? parseFloat(stock) : 0
    }  
}

// Initialize products one by one
// const products = await ProductModel.getAll()
// if(!products.length) {
//     ProductModel.addProduct({
//         name: 'think and grow rich',
//         desc: 'a book by napolean hill about assets and how to make a resource an asset',
//         url: 'https://m.media-amazon.com/images/I/71AdHA+qqwL._SL1500_.jpg',
//         category: 'book', 
//         price: 165.00
//     })
//     ProductModel.addProduct({
//         name: 'nike men air max impact',
//         desc: 'running shoes made by nike sports',
//         url: 'https://m.media-amazon.com/images/I/71subBFxFLL._SY695_.jpg',
//         category: 'shoes', 
//         price: 6201.00, 
//         sizes: ['L', 'M', 'S']
//     })
//     ProductModel.addProduct({
//         name: 'marshell speaker',
//         desc: 'portable bluetooth speaker with 15+ hours of playtime',
//         url: 'https://m.media-amazon.com/images/I/51nHX0znAgL._SL1200_.jpg',
//         category: 'speakers', 
//         price: 9999.00
//     })
// }

