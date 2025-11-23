import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexPlotOptions,
  ChartComponent
} from 'ng-apexcharts';

export type GaugeChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  labels: string[];
};

@Component({
  selector: 'app-ocupacion-card',
  templateUrl: './ocupacion-card.html',
  imports: [
    CommonModule,
    ChartComponent
  ]
})
export class OcupacionCardComponent implements OnChanges {

  @Input() occupied: number = 0;      // habitaciones ocupadas
  @Input() totalRooms: number = 0;    // habitaciones totales
  @Input() variation: number = 0;     // variación % del día anterior

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: GaugeChartOptions;

  ngOnChanges(changes: SimpleChanges): void {
    this.buildChart();
  }

  private buildChart(): void {
    const percentage = this.totalRooms > 0
      ? Math.round((this.occupied / this.totalRooms) * 100)
      : 0;

    this.chartOptions = {
      series: [percentage],
      chart: {
        type: 'radialBar',
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            margin: 0,
            size: "60%"
          },
          track: {
            background: "#E0E0E0",
            strokeWidth: "100%"
          },
          dataLabels: {
            name: { show: false },
            value: {
              fontSize: "32px",
              fontWeight: "bold",
              offsetY: -10
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          gradientToColors: ["#6366F1"],
          stops: [0, 100]
        }
      },
      labels: ["Ocupación"]
    };
  }
}
