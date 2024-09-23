// import {  OnInit } from '@angular/core';
// import {  AfterViewInit } from '@angular/core';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser} from '@angular/common'
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';



import { Chart } from 'chart.js/auto';
import * as d3 from 'd3';




@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})

// export class HomepageComponent implements OnInit {
export class HomepageComponent implements OnInit {

  public dataSource: any = {
    datasets: [
        {
            data: [],
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
        },
    ],
    labels: [],

  };


  public newDataSource: any = [];

  private svg: any;

  private width = 650;
  private height = 300;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2;
  private colors: any;





  // constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId :any) { }
  constructor(private dataService: DataService, @Inject(PLATFORM_ID) private platformId :any) {}

  // ngAfterViewInit(): void {

  //   // Fetch data for Chart.js
  //   this.http.get('http://localhost:3000/budget')
  //   .subscribe((res: any) => {
  //     for (var i = 0; i < res.myBudget.length; i++) {
  //       this.dataSource.datasets[0].data[i] = res.myBudget[i].value;
  //       this.dataSource.labels[i] = res.myBudget[i].label;


  //     }
  //     this.createChart();
  //   });

  //   this.createSvg();
  //   this.createColors();
  //   this.drawChart();

  // }





  // ********* Chart.js **************
  createChart() {
    if(isPlatformBrowser(this.platformId)){
      const ctx = <HTMLCanvasElement>document.getElementById('myChart');
      var myPieChart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
      });
    }
  }

  // ********* d3js **************

  private createSvg(): void {
    // console.log(this.newDataSource)
    this.svg = d3
    .select("#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    const titles = this.dataSource.labels;

    this.colors = d3
    .scaleOrdinal()
    .domain(titles)
    .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.budget));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.newDataSource))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d: any, i: any) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");



    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(this.newDataSource))
    .enter()
    .append('text')
    .text((d: any)=> d.data.title)
    .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }



  ngOnInit(): void {
    if (
      this.dataService.getDataSource().length == 0 ||
      this.dataService.getNewDataSource().length == 0
    ) {
      this.dataService.getBudgetData().subscribe((res: any) => {
        for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].value;
          this.dataSource.labels[i] = res.myBudget[i].label;

          this.newDataSource.push({
            title: res.myBudget[i].label,
            budget: res.myBudget[i].value,
          });
        }
        this.dataService.setDataSource(this.dataSource);
        this.dataService.setNewDataSource(this.newDataSource);

        console.log(this.dataService.getDataSource());
        this.createChart();
        this.createSvg();
        this.createColors();
        this.drawChart();
      });
    } else {
      this.createChart();
      this.createSvg();
      this.createColors();
      this.drawChart();
    }
  }


}
