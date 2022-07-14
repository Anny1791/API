import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const Get_getAllEventCategory =  gql `
query{
  getAllEventCategory{
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
  event_category: any[] = [];

  constructor(private apollo: Apollo) { }
  isCard: boolean = false;
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
    console.log("data Event Category", res);
  })
  }

}
