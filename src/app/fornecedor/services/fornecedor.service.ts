import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { BaseService } from 'src/app/services/base.service';
import { Fornecedor } from '../models/fornecedor';
import { environment } from "src/environments/environment";

@Injectable()
export class FornecedorService extends BaseService {

    fornecedor: Fornecedor = new Fornecedor();
    protected UrlServiceV1 = environment.UrlServiceV1;
    constructor(private http: HttpClient) { super()

        this.fornecedor.nome = "Teste Fake"
        this.fornecedor.documento = "32165498754"
        this.fornecedor.ativo = true
        this.fornecedor.tipoFornecedor = 1
    }

    obterTodos(): Observable<Fornecedor[]> {
        return this.http
            .get<Fornecedor[]>(this.UrlServiceV1 + "fornecedores")
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }

    excluirFornecedor(id: string): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }
}
