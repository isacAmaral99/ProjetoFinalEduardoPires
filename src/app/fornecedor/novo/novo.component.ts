import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { NgBrazilValidators } from 'ng-brazil';
import { utilsBr} from 'js-brasil';

import { ValidationMessages, GenericValidator, DisplayMessage } from 'src/app/utils/generic-form-validation';
import { Fornecedor } from '../models/fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { CepConsulta } from '../models/endereco';
import { StringUtils } from 'src/app/utils/string-utils';


@Component({
  selector: 'app-novo',
  templateUrl: './novo.component.html'
})
export class NovoComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  fornecedorForm: FormGroup;
  fornecedor: Fornecedor = new Fornecedor();

  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};
  textoDocumento:string = 'CPF (requerido)';

  MASKS =utilsBr.MASKS;
  formResult: string = '';

  mudancasNaoSalvas: boolean;

  constructor(private fb: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private toastr: ToastrService) {

    this.validationMessages = {
      nome: {
        required: 'Informe o Nome',
      },
      documento: {
        required: 'Informe o Documento ',
        cpf:'Cpf em formato invalido',
        cnpj:'Cnpj em formato invalido'

      },
      logradouro: {
        required: 'Informe o Logradouro',
      },
      numero: {
        required: 'Informe o Número',
      },
      bairro: {
        required: 'Informe o Bairro',
      },
      cep: {
        required: 'Informe o CEP',
        cep:' Cep em formato invalido'
      },
      cidade: {
        required: 'Informe a Cidade',
      },
      estado: {
        required: 'Informe o Estado',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required]],
      documento: ['', [Validators.required, NgBrazilValidators.cpf]],
      ativo: ['', [Validators.required]],
      tipoFornecedor: ['', [Validators.required]],
      endereco : this.fb.group({
        logradouro:['',[Validators.required]],
        numero: ['', [Validators.required]],
        complemento: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required,NgBrazilValidators.cep]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      })
    });

    this.fornecedorForm.patchValue({tipoFornecedor:'1', ativo:true})
  }

  ngAfterViewInit(): void {

    this.tipoFornecedorForm().valueChanges.subscribe(() => {
      this.trocarValidacaoDocumento();
      this.configuraElementosValidacao();
      this.validarFormulario();
    });



    this.configuraElementosValidacao();
  }
  configuraElementosValidacao(){
    let  controlBlurs: Observable<any>[] = this.formInputElements.map((formControl:ElementRef) => fromEvent(formControl.nativeElement,'blur'));

    merge(...controlBlurs).subscribe(() =>{
      this.validarFormulario();
    });
  }

  validarFormulario(){
    this.displayMessage = this.genericValidator.processarMensagens(this.fornecedorForm);
    this.mudancasNaoSalvas = true;
  }

  trocarValidacaoDocumento(){

    if( this.tipoFornecedorForm().value === "1" ){

      this.documento().clearValidators();
      this.documento().setValidators([Validators.required,NgBrazilValidators.cpf]);
      this.textoDocumento = "CPF (requerido)";

    }else{

      this.documento().clearValidators();
      this.documento().setValidators([Validators.required,NgBrazilValidators.cnpj]);
      this.textoDocumento = "CNPJ (requerido)";
    }
  }


  tipoFornecedorForm(): AbstractControl {
    return this.fornecedorForm.get('tipoFornecedor');
  }

  documento(): AbstractControl{

    return this.fornecedorForm.get('documento');
  }

   adicionarFornecedor() {
     console.log('chamou')
     debugger
    if (this.fornecedorForm.dirty && this.fornecedorForm.valid) {
      this.fornecedor = Object.assign({}, this.fornecedor, this.fornecedorForm.value);
      this.formResult = JSON.stringify(this.fornecedor);

      this.fornecedor.endereco.cep = StringUtils.somenteNumeros(this.fornecedor.endereco.cep);
      this.fornecedor.documento = StringUtils.somenteNumeros(this.fornecedor.documento);
      this.fornecedor.tipoFornecedor = this.fornecedor.tipoFornecedor == 1 ? +'1' : +'2';
      console.log(this.fornecedor.tipoFornecedor);
      this.fornecedorService.novoFornecedor(this.fornecedor)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );

      this.mudancasNaoSalvas = false;
    }
  }

  buscarCep(cep:string){

    cep = StringUtils.somenteNumeros(cep);
    if(cep.length < 8) return ;
    this.fornecedorService.consultaCep(cep).subscribe(cepRetorno => this.preencherEnderecoConsulta(cepRetorno),erro => this.errors.push(erro));

  }
  preencherEnderecoConsulta(cepRetorno: CepConsulta): void {
   this.fornecedorForm.patchValue({
     endereco: {
       logradouro:cepRetorno.logradouro,
       bairro: cepRetorno.bairro,
       cep: cepRetorno.cep,
       cidade: cepRetorno.localidade,
       estado: cepRetorno.uf

     }
   })
  }

  processarSucesso(response: any) {
    this.fornecedorForm.reset();
    this.errors = [];


    let toast = this.toastr.success('Fornecedor cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/fornecedores/listar-todos']);
      });
    }
  }

  processarFalha(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Ocorreu um erro!', 'Opa :(');

  }
}
