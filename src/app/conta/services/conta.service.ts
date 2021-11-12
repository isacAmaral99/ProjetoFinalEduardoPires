import { Usuario } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Injectable()
   export class ContaService extends BaseService {

    protected UrlServiceV1 = environment.UrlServiceV1;

    constructor(private http:HttpClient){super();}

    registrarUsuario(usuario:Usuario): Observable<Usuario>{

      let response = this.http.post(this.UrlServiceV1 + 'nova-conta',usuario,this.ObterHeaderJson())
      .pipe(

        map(this.extractData),

        catchError(this.serviceError));

        return response;


    }

    login(usuari:Usuario){

    }
   }
