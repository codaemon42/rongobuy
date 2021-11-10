import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  images = [
    'https://images.unsplash.com/photo-1612012460576-5d51b5b04b00?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyJTIwZm9yJTIwbW9iaWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://i.pinimg.com/564x/c4/2c/d3/c42cd325eb9e88ff4acd0b6914b9a3f0.jpg',
    'https://images.unsplash.com/photo-1611068813580-b07ef920964b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyJTIwZm9yJTIwbW9iaWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://i.pinimg.com/originals/76/35/04/763504bd750c39bd9f3a053c70ebcf1b.jpg',
    'https://images.unsplash.com/photo-1612012460576-5d51b5b04b00?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyJTIwZm9yJTIwbW9iaWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://i.pinimg.com/564x/c4/2c/d3/c42cd325eb9e88ff4acd0b6914b9a3f0.jpg',
    'https://images.unsplash.com/photo-1611068813580-b07ef920964b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2FsbHBhcGVyJTIwZm9yJTIwbW9iaWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
    'https://i.pinimg.com/originals/76/35/04/763504bd750c39bd9f3a053c70ebcf1b.jpg'
  ];

  constructor() { }
}
