import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";

export abstract class BaseService{
   protected UrlServiceV1 : string ="https://localhost:5001/api/v1/";

   protected ObterHeaderJson(){

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }

    protected extractData(response : any){
      return response.data || {};
    }

    protected serviceError(response: Response | any){
      let customError :string[] =[];
      if(response instanceof HttpErrorResponse){
        if(  response.statusText === "Unknown Error"){
          // toda vez que tiver um erro no response, desse tipo
          // com essa frase, para o usuario só sera retornado que houve
          // um erro desconhecido.
          customError.push("Ocorreu um erro desconhecido");
          response.error.errors = customError;
        }
      }

      console.log(response);
      return throwError(response);
    }

}
