import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastrarPessoa, Pessoa } from '../modelo/Pessoa';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private url = `${environment.url}/body`

  constructor(private httpClient: HttpClient) {
   }

  getData(){
    return this.httpClient.get<Pessoa[]>(this.url)
  }

  postData(pessoa: CadastrarPessoa){
    return this.httpClient.post<CadastrarPessoa>(this.url, pessoa)
  }

  putData(pessoa: Pessoa){
    var urlPessoa = `${this.url}/${pessoa.id}`
    return this.httpClient.put<Pessoa>(urlPessoa, pessoa)
  }

  remove(id: number){
    var urlPessoa = `${this.url}/${id}`
    return this.httpClient.delete<void>(urlPessoa)
  }

}
