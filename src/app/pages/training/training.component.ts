import { Component, OnInit } from '@angular/core';
import { Layer, Network } from 'synaptic';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  public configs = {
    numberOfColumns: 3,
    numberOfRows: 5,
  };

  public loops = 9000;

  public learningRate = 0.3;

  public loadingTraining = 0;

  public arrayForTraining: { number: number; representation: number[][] }[] =
    [];

  public foundNumber: number | null = null;

  private _network: Network = new Network();

  public get networkToString(): string {
    return JSON.stringify(this._network.toJSON());
  }

  public input: number[] = new Array(
    this.configs.numberOfColumns * this.configs.numberOfRows
  );

  constructor() {
    for (let i = 0; i < this.input.length; i++) {
      this.input[i] = 0;
    }
  }

  ngOnInit(): void {
    const inputLayer = new Layer(this.input.length);
    const hiddenLayer1 = new Layer(this.input.length * 2);
    const outputLayer = new Layer(10);

    inputLayer.project(hiddenLayer1);
    hiddenLayer1.project(outputLayer);

    this._network = new Network({
      input: inputLayer,
      hidden: [hiddenLayer1],
      output: outputLayer,
    });

    const numberZero = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    const numberOne1 = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1],
    ];
    const numberOne2 = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const numberOne3 = [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
    ];
    const numberOne4 = [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const numberTwo = [
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
    ];
    const numberThree = [
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
    ];
    const numberFor = [
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ];
    const numberFive = [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
    ];
    const numberSix = [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    const numberSeven1 = [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 1, 1],
    ];
    const numberSeven2 = [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
      [0, 1, 0],
      [1, 0, 0],
    ];
    const numberEight = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    const numberNine1 = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ];
    const numberNine2 = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
    ];
    this.arrayForTraining = [
      { number: 0, representation: numberZero },
      { number: 1, representation: numberOne1 },
      { number: 1, representation: numberOne2 },
      { number: 1, representation: numberOne3 },
      { number: 1, representation: numberOne4 },
      { number: 2, representation: numberTwo },
      { number: 3, representation: numberThree },
      { number: 4, representation: numberFor },
      { number: 5, representation: numberFive },
      { number: 6, representation: numberSix },
      { number: 7, representation: numberSeven1 },
      { number: 7, representation: numberSeven2 },
      { number: 8, representation: numberEight },
      { number: 9, representation: numberNine1 },
      { number: 9, representation: numberNine2 },
    ];
  }

  toTrain() {
    let index = 0;
    while (index < this.loops) {
      for (const element of this.arrayForTraining) {
        let array: number[] = [];
        for (const element2 of element.representation) {
          array = [...array, ...element2];
        }
        const result: number[] = [];
        for (let i = 0; result.length < 10; i++) {
          if (i === element.number) {
            result.push(1);
          } else {
            result.push(0);
          }
        }

        this._network.activate(array);
        this._network.propagate(this.learningRate, result);
      }
      index++;
      this.loadingTraining = Math.round((index / this.loops) * 100);
    }
  }

  handleClick(index: number) {
    this.input[index] = this.input[index] == 0 ? 1 : 0;
  }

  toVerify() {
    const result = this._network.activate([...this.input]);

    const closer = result.reduce((prev, curr) => {
      return Math.abs(curr - 1) < Math.abs(prev - 1) ? curr : prev;
    });
    this.foundNumber = result.findIndex((element) => element === closer);
  }
}
