import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Layer, Network } from 'synaptic';

@Component({
  selector: 'app-number-recognition-training',
  templateUrl: './number-recognition-training.component.html',
  styleUrls: ['./number-recognition-training.component.scss'],
})
export class NumberRecognitionTrainingComponent implements OnInit, AfterViewInit {
  @ViewChild('numberOfColumns')
  numberOfColumns!: ElementRef<HTMLInputElement>;

  @ViewChild('numberOfRows')
  numberOfRows!: ElementRef<HTMLInputElement>;

  @ViewChild('loops')
  loops!: ElementRef<HTMLInputElement>;

  @ViewChild('learningRate')
  learningRate!: ElementRef<HTMLInputElement>;

  public configs = {
    numberOfColumns: 3,
    numberOfRows: 5,
    loops: 10000,
    learningRate: 0.2,
  };

  public loadingTraining = 0;

  public arrayForTraining: { number: number; representation: number[][] }[] =
    [];

  public foundNumbers: number[] = [];

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
    const numberOne5 = [
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
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
      { number: 1, representation: numberOne5 },
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

  ngAfterViewInit(): void {
    this.addListenersInputs();
  }

  addListenersInputs() {
    this.numberOfColumns.nativeElement.addEventListener('change', () =>
      this.handleInputConfigs('numberOfColumns')
    );
    this.numberOfRows.nativeElement.addEventListener('change', () =>
      this.handleInputConfigs('numberOfRows')
    );
    this.loops.nativeElement.addEventListener('change', () =>
      this.handleInputConfigs('loops')
    );
    this.learningRate.nativeElement.addEventListener('change', () =>
      this.handleInputConfigs('learningRate')
    );
  }

  toTrain(): void {
    for (let index = 0; index < this.configs.loops; index++) {
      setTimeout(() => {
        for (const element of this.arrayForTraining) {
          const arrayActivation: number[] = this.toPlainArray(
            element.representation
          );
          const result: number[] = [];
          for (let i = 0; result.length < 10; i++) {
            if (i === element.number) {
              result.push(1);
            } else {
              result.push(0);
            }
          }
          this._network.activate(arrayActivation);
          this._network.propagate(this.configs.learningRate, result);
        }
        this.loadingTraining = Math.round((index / this.configs.loops) * 100);
      }, 0);
    }
  }

  toPlainArray(array: number[][]): number[] {
    let arrayPlanify: number[] = [];
    for (const element of array) {
      arrayPlanify.push(...element);
    }
    return arrayPlanify;
  }

  handleClick(index: number) {
    this.input[index] = this.input[index] == 0 ? 1 : 0;
  }

  toVerify() {
    const result = this._network.activate([...this.input]);
    const resultCopy = [...result];
    const orderedResult: number[] = [];

    let length = result.length;
    while (length > 0) {
      const closer = result.reduce((prev, curr) => {
        return Math.abs(curr - 1) < Math.abs(prev - 1) ? curr : prev;
      });
      const index = resultCopy.findIndex(
        (element) => Math.abs(element - closer) < 0.01
      );
      if (index > -1) {
        orderedResult.push(index);
        result.splice(index, 1);
      }
      console.log(index);
      length--;
    }
    console.log(orderedResult);

    this.foundNumbers = orderedResult;
  }

  handleInputConfigs(id: string) {
    switch (id) {
      case 'numberOfColumns':
        this.configs.numberOfColumns = Math.max(
          0,
          Math.min(50, Math.ceil(+this.numberOfColumns.nativeElement.value))
        );
        this.numberOfColumns.nativeElement.value =
          this.configs.numberOfColumns.toString();
        break;
      case 'numberOfRows':
        this.configs.numberOfRows = Math.max(
          0,
          Math.min(50, Math.ceil(+this.numberOfRows.nativeElement.value))
        );
        this.numberOfRows.nativeElement.value =
          this.configs.numberOfRows.toString();
        break;
      case 'loops':
        this.configs.loops = Math.max(
          0,
          Math.min(100000, Math.round(+this.loops.nativeElement.value))
        );
        this.loops.nativeElement.value = this.configs.loops.toString();
        break;
      case 'learningRate':
        this.configs.learningRate = Math.max(
          0,
          Math.min(1, parseFloat(this.learningRate.nativeElement.value))
        );
        this.learningRate.nativeElement.value =
          this.configs.learningRate.toString();
        break;

      default:
        console.error('not mapped in swicth!');
        break;
    }
    //TODO: Falta ver uma maneira de gerar a grade para desenhas os numeros que respeite o digitado nos inputs
  }
}
