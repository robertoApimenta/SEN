import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

// Import de pages
import {Home} from './pages/Home'

import {LoginFuncionario} from './pages/Funcionario/Login'
import { DashboardFuncionario } from './pages/Funcionario/Dashboard';
import { CadFuncionario } from './pages/Funcionario/Cadastro';
import { EstudaEm } from './pages/Funcionario/DashEstudaEm';
import { DashNovoAluno } from './pages/Funcionario/DashNovoAluno';
import { DashMeusDados } from './pages/Funcionario/DashMeusDados';
import { DashTotalAlunos } from './pages/Funcionario/DashTotalAlunos';
import { DashRelatorio } from './pages/Funcionario/DashRelatorio';
import { DashEditarFuncionario } from './pages/Funcionario/DashEditarFuncionario'
import {DashNotasAluno} from './pages/Funcionario/DashNotasAluno'
//import {DashRelatorio} from './pages/Funcionario/DashRelatorio'


import {LoginAluno} from './pages/Aluno/Login'
import {DashboardAluno} from './pages/Aluno/Dashboard'
import { DashEditarAluno } from './pages/Funcionario/DashEditarAluno'
import { DashLancarNotas } from './pages/Aluno/DashLancarNotas'
import {DashHistorico} from './pages/Aluno/DashHistorico'
import {DashMeusDadosAluno} from './pages/Aluno/DashMeusDados'
import {DashRelatorioAluno} from './pages/Aluno/DashRelatorio'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login_funcionario" component={LoginFuncionario} />
          <Route exact path="/dash_funcionario/:id" component={DashboardFuncionario} />
          <Route exact path="/cad_funcionario" component={CadFuncionario} />
          <Route exact path="/novo_aluno/:id" component={DashNovoAluno} />
          <Route exact path="/estuda_em/:id" component={EstudaEm} />
          <Route exact path="/total_alunos/:id" component={DashTotalAlunos} />
          <Route exact path="/relatorio/:id" component={DashRelatorio} />
          <Route exact path="/editar_funcionario/:id" component={DashEditarFuncionario} />
          <Route exact path="/meus_dados/:id" component={DashMeusDados} />
          <Route exact path="/notas_aluno/:id" component={DashNotasAluno} />

          <Route exact path="/login_aluno" component={LoginAluno} />
          <Route exact path="/dash_aluno/:id" component={DashboardAluno} />
          <Route exact path="/editar_aluno/:id" component={DashEditarAluno} />
          <Route exact path="/lancar_notas/:id" component={DashLancarNotas} />
          <Route exact path="/historico/:id" component={DashHistorico} />
          <Route exact path="/meus_dados_aluno/:id" component={DashMeusDadosAluno} />
          <Route exact path="/relatorio_aluno/:id" component={DashRelatorioAluno} />
          

        </Switch>
      </BrowserRouter>
    </div>   
  );
}

export default App;
