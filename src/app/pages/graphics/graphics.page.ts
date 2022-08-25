import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { SearchService } from 'src/app/services/search.service';

import { Chart, registerables } from 'chart.js';
import { FilterDTO } from 'src/app/model/DTO/filter-dto';
import { ResponseDTO } from 'src/app/model/DTO/response-dto';
import { ReceiptDTO } from 'src/app/model/DTO/receipt-dto';
import { AlertService } from 'src/app/services/alert.service';
import { AlertController } from '@ionic/angular';
import { el } from 'date-fns/locale';
Chart.register(...registerables);

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
})
export class GraphicsPage implements OnInit {
  @ViewChild('barCanvas1') private barCanvas1: ElementRef;
  @ViewChild('barCanvas2') private barCanvas2: ElementRef;

  barChart1: any;
  barChart2: any;
  checkedYear:string;

  id: number = +localStorage.getItem('userId');

  constructor(
    private profileService: ProfileService,
    private searchService: SearchService,
    private alertService: AlertService,
    private alertController: AlertController
  ) {}

  ngOnInit() {

  }

  async presentAlert() 
  { 
    let selectedValue:string;

    const alert = await this.alertController.create({
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            selectedValue = data;
            console.log(selectedValue)
            this.changeYear(selectedValue)
          },
        },
      ],
      inputs: [
        {
          label: '2022',
          type: 'radio',
          value: '2022',
          checked: this.checkedYear == '2022' 
        },
        {
          label: '2021',
          type: 'radio',
          value: '2021',
          checked: this.checkedYear == '2021' 

        },
        {
          label: '2020',
          type: 'radio',
          value: '2020',
          checked: this.checkedYear == '2020' 

        },
        {
          label: '2019',
          type: 'radio',
          value: '2019',
          checked: this.checkedYear == '2019' 
        }
      ],
      
    });
    await alert.present();    

  }

  ngAfterViewInit() {
    this.getReceipts(2022);
  }

  changeYear(year)
  {
    this.checkedYear = year;
    this.getReceipts(+year) 
  }

  getReceipts(year: number) {
    let filter = new FilterDTO();
    filter.userId = this.id;
    filter.dateFrom = `${year}-01-01`;
    filter.dateTo = `${year}-12-31`;

    this.searchService.myReceipts(filter).subscribe(
      (response) => {
        const r: ResponseDTO = response as ResponseDTO;
        if (r.code == 200) {
          const receipt: ReceiptDTO[] = r.data as ReceiptDTO[];
          this.barChartYear(receipt, year);
          this.barChartCategory(receipt, year);
        } else {
          this.alertService.showAlert(
            'Ooops',
            'Something went wrong',
            r.message,
            this.alertController
          );
        }
      },
      (error) => {
        this.alertService.showAlert(
          'Ooops',
          'Something went wrong',
          error.error.message,
          this.alertController
        );
      }
    );
  }

  barChartYear(receipts: ReceiptDTO[], year: number) 
  {
    if(this.barChart1)
    {
      this.barChart1.destroy();
    }
    let months: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let r of receipts) {
      const date = new Date(r.date);
      months[date.getMonth()] += r.total;
    }

    this.barChart1 = new Chart(this.barCanvas1.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            // label: `${year} REVIEW`,
            data: months,
            backgroundColor: [
              'rgba(255, 99, 132, 1.0)',
              'rgba(54, 162, 235, 1.0)',
              'rgba(255, 206, 86, 1.0)',
              'rgba(75, 192, 192, 1.0)',
              'rgba(153, 102, 255, 1.0)',
              'rgba(255, 159, 64, 1.0)',
              'rgba(255, 99, 132, 1.0)',
              'rgba(54, 162, 235, 1.0)',
              'rgba(255, 206, 86, 1.0)',
              'rgba(75, 192, 192, 1.0)',
              'rgba(153, 102, 255, 1.0)',
              'rgba(255, 159, 64, 1.0)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins:{
          tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || ' ';

                    if (label) {
                        label += ' ';
                    }
                    if (context.parsed.y !== null) {
                        label += new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(context.parsed.y);
                    }
                    return label;
                }
            }
        },
          title: {
            color: 'black',
                font: {
                  size: 20
                },
            display: true,
            text: `${year} REVIEW`,
            padding: {
                top: 20,
                bottom: 30
            }
        },
          legend: {
            display: false,
            // labels: {
            //     color: 'black',
            //     font: {
            //       size: 20
            //     }
            // }
        },

        },
        animation: {
          duration: 0,
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value, index, ticks) {
                return value + ' €';
              },
            },
          },
        },
      },
    });
  }

  randomColor()
  {
  return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
  }

  barChartCategory(receipts: ReceiptDTO[], year: number) 
  {
    if(this.barChart2)
    {
      this.barChart2.destroy();
    }
    let category = new Map<string, number>();
    for (let r of receipts) 
    {
      if(category.has(r.category))
      {
        const oldValue = category.get(r.category);
        category.delete(r.category)
        category.set(r.category, oldValue + r.total);
      }
      else
      {
        category.set(r.category, r.total);
      }
    }

    let colors:string [] = [];
    for(let i=0; i< category.size; i++)
    {
      colors.push(this.randomColor());
    }

    this.barChart2 = new Chart(this.barCanvas2.nativeElement, {
      type: 'doughnut',
      data: {
        labels: Array.from(category.keys()),
        datasets: [
          {
            data: Array.from(category.values()),
            backgroundColor: colors
           },
        ],
      },
      options: {        
        plugins:{
          tooltip: {
            callbacks: {
                label: function(context) {
                    let label = /*context.label ||*/ ' ';

                    if (label) {
                        label += ' ';
                    }
                    if (context.parsed !== null) {
                        label += new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(context.parsed);
                    }
                    return label;
                },
                title:function(context) {
                  return context[0].label
                }
            }
        },
        title: {
          color: 'black',
              font: {
                size: 20
              },
          display: true,
          text: `CATEGORIES REVIEW`,
          padding: {
              top: 30,
              bottom: 30
          }
      },
          legend: {
            display: false,
            // position: "right",
            // labels: {
            //   padding: 40,
            //     color: 'black',
            //     font: {
            //       size: 18
            //     }
            // }
        },

        },
        animation: {
          duration: 0,
        },
      },
    });
  }

  
}

