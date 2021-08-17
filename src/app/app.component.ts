import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //atributo utilizado para definir se o usuario
  //esta ou não autenticado na aplicação
  isLoggedIn = false;

  //método construtor
  constructor() { }

  formLogin = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required, //campo obrigatório
        Validators.email, //formato de email        
      ]),
      senha: new FormControl('', [
        Validators.required, //campo obrigatório
        Validators.minLength(8), //mínimo de caracteres
        Validators.maxLength(25), //máximo de caracteres
      ])
    }
  );

  get form(): any {
    return this.formLogin.controls;
  }

  //método executado sempre que o componente for aberto
  ngOnInit(): void {

    //verificar se o usuario está autenticado
    if (localStorage.getItem('AUTHENTICATION') != null) {
      this.isLoggedIn = true; //usuario está autenticado!
    }
    else {
      this.isLoggedIn = false; //usuário não está autenticado!
    }

  }

  onSubmit(): void {

    //MOCK de autenticação (FAKE)
    if (this.formLogin.value.email === 'admin@gmail.com'
      && this.formLogin.value.senha === 'admin123') {

      //gravar o email do usuario autenticado em sessão
      localStorage.setItem('AUTHENTICATION', this.formLogin.value.email);

      //recarregar a página..
      this.ngOnInit();
    }
    else {
      alert('Acesso negado. Usuário inválido.');
    }
  }

  logout(): void {

    //apagar o conteudo da localstorage
    localStorage.removeItem('AUTHENTICATION');

    //recarregar a página..
    window.location.href = "/";
  }

}
