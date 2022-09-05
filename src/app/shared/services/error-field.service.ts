import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorFieldService {

  constructor() { }

  public findFieldIfError(field :string, errors:any) {

    let message = ""
    const result = errors.find((error: { field: string; }) => error.field === field)
    if (result)
      message = result.message

    return message;
  }

  public messageErrorConection(httpStatus:number) {

    if (httpStatus == 401)
      return "No se conecto a la Base de datos"
    else
      return "No se conecto al Servidor"
  }

}
