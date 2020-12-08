import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators'
import { log } from 'util';

@Component({
  selector: 'app-p1-data',
  templateUrl: './p1-data.component.html',
  styleUrls: ['./p1-data.component.scss']
})
export class P1DataComponent implements OnInit, AfterViewInit {
  @ViewChild("srcImg") srcImage: ElementRef;
  @ViewChild("testImg") testImage: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  canvasEl: HTMLCanvasElement
  srcImgEl: HTMLImageElement
  canvasCx: CanvasRenderingContext2D

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.srcImgEl = this.srcImage.nativeElement;
    this.canvasCx = this.canvasEl.getContext('2d');

  }
  convert() {
    this.canvasEl.height = this.srcImgEl.height;
    this.canvasEl.width = this.srcImgEl.width;
    this.canvasCx.drawImage(this.srcImgEl, 0, 0)

    this._http.get(this.srcImgEl.src, { responseType: 'blob' }).pipe(
      map(blob => {
        // console.log(blob);
        //Promise array buffer (JS )
        blob.arrayBuffer().then(buffer => console.log(buffer));
        return blob;

      })
    )
    //(Multiple file readers for brevity here)
    //Output:
    // ArrayBuffer(48346) {}
    // p1-data.component.ts:48 Array Buffer:  ArrayBuffer(48346) {}
    // p1-data.component.ts:53 Data URL: 
    //data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAA4ODg4PD.......
    // Binary String (Ascii encoded string?) ÿØÿà
    //JFIF (Bunch of Ascii Characters that won't load here)

      .subscribe(blob => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          console.log(`Array Buffer: `, fileReader.result)
        }
        fileReader.readAsArrayBuffer(blob)
        const fileReader2 = new FileReader();
        fileReader2.onload = () => {
          console.log(`Data URL: ${fileReader2.result}`)
        }
        fileReader2.readAsDataURL(blob)
        const fileReader3 = new FileReader();
        fileReader3.onload = () => {
          console.log(`Binary String (Ascii encoded string?) ${fileReader3.result}`)
        }
        fileReader3.readAsBinaryString(blob)
      });



  }

}
