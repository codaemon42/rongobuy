/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[] = [
    {
      id: '12',
      title: 'product one',
      slug: 'product-slug-1',
      short_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
      featured_image: "https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/p960x960/196212923_938037606764749_8713735566665562108_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=7cDGYr4RfeUAX-XeiRq&_nc_ht=scontent.fdac22-1.fna&oh=6736547cb51ace26d76ca4d70c7a05f2&oe=618033C6",
      images: [
        "./../../../assets/images/productone.png",
        "./../../../assets/images/productone.png",
        "https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/243295420_1007485596486616_3231594214147265530_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=G-reOA0wY_wAX9fWvz0&_nc_ht=scontent.fdac22-1.fna&oh=9401c13de5879772dc80a2be30bf2c69&oe=61859CD0",
        ],
      category: ["phone cover", "Accessories"],
      regular_price: '320',
      sale_price: '300',
      sale_start: '',
      sale_end: '',
      variations: ["1,2,3,4"],
      modified_at: '',
      created_at: ''
    },
    {
      id: '13',
      title: 'product two',
      slug: 'product-slug-2',
      short_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
      featured_image: "https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/243161112_1007485626486613_5310695680186595518_n.jpg?_nc_cat=100&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=IBlfB6zioJgAX_9c2Du&_nc_ht=scontent.fdac22-1.fna&oh=00676f316731700734646a83aef182cc&oe=61852897",
      images: [
        "./../../../assets/images/productone.png",
        "./../../../assets/images/productone.png",
        "https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/243295420_1007485596486616_3231594214147265530_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=G-reOA0wY_wAX9fWvz0&_nc_ht=scontent.fdac22-1.fna&oh=9401c13de5879772dc80a2be30bf2c69&oe=61859CD0",
        ],
      category: ["phone cover", "Accessories"],
      regular_price: '320',
      sale_price: '',
      sale_start: '',
      sale_end: '',
      variations: ["1,2,3,4"],
      modified_at: '',
      created_at: ''
    },
    {
      id: '14',
      title: 'product three',
      slug: 'product-slug-3',
      // eslint-disable-next-line @typescript-eslint/quotes
      short_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
      featured_image: "https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/p960x960/196212923_938037606764749_8713735566665562108_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=7cDGYr4RfeUAX-XeiRq&_nc_ht=scontent.fdac22-1.fna&oh=6736547cb51ace26d76ca4d70c7a05f2&oe=618033C6",
      images: [
        "./../../../assets/images/productone.png",
        "./../../../assets/images/productone.png",
        "https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/243295420_1007485596486616_3231594214147265530_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=G-reOA0wY_wAX9fWvz0&_nc_ht=scontent.fdac22-1.fna&oh=9401c13de5879772dc80a2be30bf2c69&oe=61859CD0",
        ],
      category: ["phone cover", "Accessories"],
      regular_price: '320',
      sale_price: '300',
      sale_start: '',
      sale_end: '',
      variations: ["1,2,3,4"],
      modified_at: '',
      created_at: ''
    },
    {
      id: '15',
      title: 'product four',
      slug: 'product-slug-4',
      short_description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
      featured_image: "https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/243161112_1007485626486613_5310695680186595518_n.jpg?_nc_cat=100&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=IBlfB6zioJgAX_9c2Du&_nc_ht=scontent.fdac22-1.fna&oh=00676f316731700734646a83aef182cc&oe=61852897",
      images: [
        "./../../../assets/images/productone.png",
        "./../../../assets/images/productone.png",
        "https://scontent.fdac22-1.fna.fbcdn.net/v/t1.6435-9/243295420_1007485596486616_3231594214147265530_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=G-reOA0wY_wAX9fWvz0&_nc_ht=scontent.fdac22-1.fna&oh=9401c13de5879772dc80a2be30bf2c69&oe=61859CD0",
        ],
      category: ["phone cover", "Accessories"],
      regular_price: '320',
      sale_price: '',
      sale_start: '',
      sale_end: '',
      variations: ["1,2,3,4"],
      modified_at: '',
      created_at: ''
    },
  ];

  constructor() { }
}
