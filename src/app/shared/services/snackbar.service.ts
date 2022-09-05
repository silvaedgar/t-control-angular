import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar : MatSnackBar) { }


  public showSnackBar(message:string, accept:string, duration:number,
                        verticalPosition:string, horizontalPosition:string) {
      this._snackBar.open(message,accept,{
        duration : duration,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    }
}
