import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = false
  ProductData: any
  CustomerData: any
  OrderData: any
  PopularProduct: any
  MostOrderCustomer: any
  InexpensiveCustomer: any

  constructor( private service: RestService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getCustomers()
    this.getOrders()
    this.getPopularProduct()
    this.getMostOrderCustomer()
    this.getInexpensiveCustomer()
  }

  getProducts() {
    this.isLoading = true
    this.service.fetchProductData()
    .subscribe((res) => {
      this.isLoading = false
      this.ProductData = res
      // console.log(this.ProductData)
    },
    (error) => {
      this.isLoading = false
      console.log(error)
    })
  }

  getCustomers() {
    this.isLoading = true
    this.service.fetchCustomerData()
    .subscribe((res) => {
      this.isLoading = false
      this.CustomerData = res
      // console.log(this.CustomerData)
    },
    (error) => {
      this.isLoading = false
      console.log(error)
    })
  }

  getOrders() {
    this.isLoading = true
    this.service.fetchOrdersData()
    .subscribe((res) => {
      this.isLoading = false
      this.OrderData = res
      // console.log(this.OrderData)
    },
    (error) => {
      this.isLoading = false
      console.log(error)
    })
  }

  getPopularProduct() {
    this.isLoading = true
    this.service.fetchPopularProduct()
    .subscribe((res) => {
      this.PopularProduct = res
      // console.log(this.PopularProduct)
    })
  }

  getMostOrderCustomer() {
    this.isLoading = true
    this.service.fetchMostOrderCustomer()
    .subscribe((res) => {
      this.MostOrderCustomer = res
      // console.log(this.MostOrderCustomer)
    })
  }

  getInexpensiveCustomer() {
    this.isLoading = true
    this.service.fetchInexpensiveCustomer()
    .subscribe((res) => {
      this.InexpensiveCustomer = res
      // console.log(this.InexpensiveCustomer)
    })
  }

}
