// import {  OnInit } from '@angular/core';
import {  AfterViewInit } from '@angular/core';
import { Component, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser} from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

// export class HomepageComponent implements OnInit {
export class HomepageComponent implements AfterViewInit {

  public dataSource = {
    datasets: [
        {
            data: [30, 350, 90],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#c6381a',
                '#bec61a',
                '#1a2fc6',
                '#c61ab1'
            ],
        }
    ],
    labels: [
        'Eat out',
        'Rent',
        'Groceries'
    ]

  };

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId :any) { }

  // ngOnInit(): void {
  ngAfterViewInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data[i] = res.myBudget[i].value;
        this.dataSource.labels[i] = res.myBudget[i].label;


      }
      this.createChart();

    });
  }

  // createChart() {
  //   var canvas = document.getElementById("myChart") as HTMLCanvasElement
  //   var ctx = canvas.getContext("2d");
  //   var myPieChart = new Chart(ctx, {
  //       type: 'pie',
  //       data: this.dataSource
  //   });
  // }

  createChart() {
    // var canvas = document.getElementById("myChart") as HTMLCanvasElement
    // var ctx = canvas.getContext("2d");
    if(isPlatformBrowser(this.platformId)){
      const ctx = <HTMLCanvasElement>document.getElementById('myChart');
      var myPieChart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
      });

    }


  }




}
