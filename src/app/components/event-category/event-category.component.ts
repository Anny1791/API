import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

const Get_getAllEventCategory = gql`
query{
  getAllEventCategory{
    _id
    name
    description
    active_flag
  }
}
`

const Get_getEventCategoryByName = gql`
query($NAME: String!){
  getEventCategoryByName(name:$NAME){
    _id
    name
    description
    active_flag
  }
}
`


@Component({
  selector: 'app-event-category',
  templateUrl: './event-category.component.html',
  styleUrls: ['./event-category.component.css']
})
export class EventCategoryComponent implements OnInit {
  isCard: boolean = false;
  event_category: any[] = [];

  selectbyName = '';

  constructor(private apollo: Apollo,) { }

  openCard(){
    this.isCard = !this.isCard
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: Get_getAllEventCategory,

      })
      .valueChanges.subscribe((res: any) => {

        this.event_category = res?.data?.getAllEventCategory;
        console.log("data Reward Inventory", res);
      })
  }

  SearchRewardInvenByName() {
    this.apollo
      .watchQuery({
        query: Get_getEventCategoryByName,
        variables:
        {
          NAME: this.selectbyName,
        }
      })
      .valueChanges.subscribe((res: any) => {

        this.event_category = res?.data?.getEventCategoryByName;
        console.log("Search By Name: ", this.event_category)
      })
  }
}
