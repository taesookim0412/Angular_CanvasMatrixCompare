import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-p2-data',
  templateUrl: './p2-data.component.html',
  styleUrls: ['./p2-data.component.scss']
})
export class P2DataComponent implements OnInit, AfterViewChecked {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('originalMatrixView') originalMatrixView: ElementRef;
  @ViewChild('postCanvasMatrixView') postCanvasMatrixView: ElementRef;
  @ViewChild('comparisonMatrix') comparisonMatrix: ElementRef;
  canvasEl: HTMLCanvasElement
  canvasCx: CanvasRenderingContext2D


  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {
  }
  ngAfterViewChecked() {
    this.canvasEl = this.canvas.nativeElement
    this.canvasCx = this.canvasEl.getContext('2d');
  }
  async convertToNonBitmap() {
    const rows = 512;
    const cols = 512;
    const typedArr = this.createTypedArray(rows, cols);
    this.matrixShow(typedArr, rows, cols, this.originalMatrixView);
    await this.putTypedArrayOnCanvas(typedArr, rows, cols, false)
    const bmpTypedArr = this.getCxData(rows, cols);
    this.matrixShow(bmpTypedArr, rows, cols, this.postCanvasMatrixView);
    this.matrixCompare(typedArr, bmpTypedArr, rows, cols, this.comparisonMatrix);
  }
  async convertToBitmap() {
    const rows = 512;
    const cols = 512;
    const typedArr = this.createTypedArray(rows, cols);
    this.matrixShow(typedArr, rows, cols, this.originalMatrixView);
    await this.putTypedArrayOnCanvas(typedArr, rows, cols, true)
    const bmpTypedArr = this.getCxData(rows, cols);
    this.matrixShow(bmpTypedArr, rows, cols, this.postCanvasMatrixView);
    this.matrixCompare(typedArr, bmpTypedArr, rows, cols, this.comparisonMatrix);
  }
  matrixCompare(typedArr: Uint8ClampedArray, bmpTypedArr: Uint8ClampedArray, rows: number, cols: number, view) {
    const cmpMtxDiv: HTMLElement = view.nativeElement;
    cmpMtxDiv.innerHTML = '';
    let differences = 0;
    for (let i = 0; i < rows; i++) {
      const row = document.createElement('div');
      this._renderer.appendChild(cmpMtxDiv, row);
      const rowApnd = new Array(cols);
      for (let j = 0; j < cols; j++) {
        const rgbaPos = (i * cols + j) * 4;
        rowApnd[j] = 0;
        rowApnd[j] += Math.abs(typedArr[rgbaPos] - bmpTypedArr[rgbaPos]);
        rowApnd[j] += Math.abs(typedArr[rgbaPos + 1] - bmpTypedArr[rgbaPos + 1]);
        rowApnd[j] += Math.abs(typedArr[rgbaPos + 2] - bmpTypedArr[rgbaPos + 2]);
        rowApnd[j] += Math.abs(typedArr[rgbaPos + 3] - bmpTypedArr[rgbaPos + 3]);
        differences += rowApnd[j];
      }
      row.innerText = rowApnd.join();
    }
    const fRow = document.createElement('div');
    this._renderer.appendChild(cmpMtxDiv, fRow);
    fRow.innerText = `Sum of differences: ${differences}`

  }
  getCxData(rows: number, cols: number) {
    const cxImgData = this.canvasCx.getImageData(0, 0, cols, rows);
    const bmpTypedArray = cxImgData.data;

    return bmpTypedArray
  }
  async putTypedArrayOnCanvas(typedArr: Uint8ClampedArray, rows: number, cols: number, isBitmap: boolean) {
    this.canvasEl.height = rows;
    this.canvasEl.width = cols;
    const imgData = new ImageData(typedArr, cols, rows);
    if (isBitmap) {
      await createImageBitmap(imgData).then(imgBmp => {
        this.canvasCx.drawImage(imgBmp, 0, 0);
      })
    }
    else{
      this.canvasCx.putImageData(imgData, 0, 0);
    }

  }
  //just show the red layer
  matrixShow(typedArr: Uint8ClampedArray, rows, cols, view: ElementRef) {
    const mtxDiv: HTMLElement = view.nativeElement;
    mtxDiv.innerHTML = '';
    for (let i = 0; i < rows; i++) {
      const row = document.createElement('div');
      this._renderer.appendChild(mtxDiv, row);
      const rowApnd = new Array(cols);
      for (let j = 0; j < cols; j++) {
        const rgbaPos = (i * cols + j) * 4;
        rowApnd[j] = typedArr[rgbaPos];
      }
      row.innerText = rowApnd.join();
    }
  }
  //create rxc mtx in rgba
  createTypedArray(rows, cols): Uint8ClampedArray {
    const arr = new Uint8ClampedArray(rows * cols * 4);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const rgbaIdx = (i * cols + j) * 4;
        let pixToPut = (j * 10 + (i & 1) * 2) % 255;
        let alphaToPut = 255;
        if (j < rows/10 || j > rows - rows/10)
        {
          pixToPut = 0;
          alphaToPut = 255;
        }
        arr[rgbaIdx] = pixToPut
        arr[rgbaIdx + 1] = (pixToPut * 2) % 255
        arr[rgbaIdx + 2] = (pixToPut * 3) % 255
        //Bitmap with Alpha Multiplication = Different results. Try it!
        arr[rgbaIdx + 3] = alphaToPut
        // arr[rgbaIdx + 3] = 255;

      }
    }
    return arr;
  }
}
