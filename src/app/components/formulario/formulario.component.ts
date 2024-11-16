import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pessoa } from '../../modelo/Pessoa';
import { CommonModule } from '@angular/common';
import { ModelService } from '../../servece/model.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent {

  constructor(private modelService: ModelService){
    this.obterDados()
  }

  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(3)]),
    idade: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),
    cidade: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  btnCadastrar: boolean = true;

  vetor$ = new Observable<Pessoa[]>()

  id: number = -1

  obterDados(){
    this.vetor$ = this.modelService.getData()
  }

  cadastrar(){
    if(this.formulario.valid){
      this.modelService.postData({
        nome: this.formulario.value.nome as string,
        idade: this.formulario.value.idade as number,
        cidade: this.formulario.value.cidade as string
        
      }).subscribe(_ => this.obterDados())
      this.formulario.reset()
    }
    
  } 

  selecionar(data: Pessoa){
    this.id = data.id

    this.formulario.setValue({
      nome : data.nome,
      idade: data.idade,
      cidade: data.cidade
    })

    this.btnCadastrar = false
  }

  alterar(){
    this.modelService.putData({
      id: this.id,
      nome: this.formulario.value.nome as string,
      idade: this.formulario.value.idade as number,
      cidade: this.formulario.value.cidade as string
    }).subscribe(_ => this.obterDados())
    this.formulario.reset()
    this.btnCadastrar = true
  }

  remover(){
    this.modelService.remove(this.id).subscribe(_ => this.obterDados())
    this.formulario.reset()
    this.btnCadastrar = true
  }

  cancelamento(){
    this.formulario.reset()
    this.btnCadastrar = true
  }
}
