import { Component } from '@angular/core';
import { Item } from './item';
import { Comment} from './comment'
import {MatDialog} from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
//-----------------------------------------






//-----------------------------------------





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ItemsApp'

  products: Array<Item> = []
  productInfo: Array<Item> = []
  comments: Array<Comment> = []
  productComments: Array<Comment> = []
  newBody: string = ''

  constructor(private matDialog: MatDialog){
    this.fetchData()
  }

  closeAlert(){
    this.productInfo =[]
    this.productComments = []
    
  }
 showInfo(item: Item){
    this.productComments =[]
    this.productInfo = []
    this.productInfo.push(item)
    this.comments.forEach(element => {
      if(element.postId === item.id){
        this.productComments.push(element)
      }
    });
    console.log(item.id)
    console.log(this.productComments)
 }
  

  MaxDiscount(){
    let max = 0
    this.products.forEach(element => {
      if(element.discountPercentage > max){
        max = element.discountPercentage
      }
      
    });
    
    alert("Max discount: " + max)
  }

  PriceLevel(){
    let avg = 0
    this.products.forEach(element => {
      avg = avg + element.price
    });
    avg = avg/this.products.length
    
    let v: Array<string> = []

    this.products.forEach(element => {
      if(element.price > avg){
        v.push(element.id + " - " + element.title + "\n")
      }
    })

    alert(v)
  }

  onlyUnique(name: string, index: number, array: Array<any> ){
    return array.indexOf(name) === index
  }

  CountCategory(){
    let b: Array<string> = []
    this.products.forEach(element => {
      b.push(element.category)
    })

    let unique = b.filter((item, i, ar) => ar.indexOf(item) === i);
   
    
    let result: Array<string> = []

    for (let i = 0; i < unique.length; i++) {
      let count = 0
      for (let j = 0; j < this.products.length; j++) {
        if(unique[i] === this.products[j].category)
          count +=1
      }
      result.push(unique[i] + ": " + count)
    }


    alert(result)
  }

  styleBinding(product: Item){
      if(product.stock<=50){
        return'table-danger'
      }
      else if(product.stock <= 100){
        return 'table-warning'
      }
      else{
        return 'table-success'
      }
    
      
    
  }
 
 
  EditComment(id: string){
    this.productComments.forEach(element => {
      if(element.id === id){
        element.body=this.newBody

      }
      
    });
   console.log(id)
   this.newBody =''
  }

  deleteItem(product: Item) {
    let index = this.products.findIndex(x => x.id === product.id)
    this.products.splice(index, 1)
    index=index+1
    fetch('https://dummyjson.com/products/'+ product.id, {
    method: 'DELETE',})
    .then(res => res.json())
    .then(console.log);
    this.productInfo.forEach(element => {
      if(element.id === product.id){
        this.productInfo =[]
        this.productComments = []
      }
    });
    
   

  }

  async fetchData(){
    const urlComment = 'https://dummyjson.com/comments'
    let comObjects = (await(await fetch(urlComment)).json()).comments

    comObjects.map((x: any) =>{
      let s = new Comment()
      s.id =x.id
      s.body = x.body
      s.postId = x.postId
      s.userId = x.user.id
      s.userNamm = x.user.username

      this.comments.push(s)

    })

    console.log(this.comments)


    const url = 'https://dummyjson.com/products?limit=0'
    let objects = (await(await fetch(url)).json()).products

    objects.map((x: any) =>{
      let s = new Item()
      s.id = x.id
      s.title = x.title
      s.description = x.description
      s.price = x.price
      s.discountPercentage = x.discountPercentage
      s.category = x.category
      s.rating = x.rating
      s.stock = x.stock
      s.thumbnail = x.thumbnail
      s.images = x.images
      s.brand = x.brand

      this.products.push(s)
    })




    console.log(this.products)
  }
 
}
