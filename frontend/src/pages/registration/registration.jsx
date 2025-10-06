import React, { useState } from 'react';
import './registrationStyles.css';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',

    celular: '',
    link_lattes: '',
    paginas_institucionais: [''],

    instituicao_primaria: '',
    instituicao_secundaria: '',
    laboratorio: '',
    grupo_pesquisa: '',

    areas_pesquisa: [''],
    disciplinas: [{ nome: '', descricao: '' }],

    pq: false,
    membro_sbfte: false,

    publicacoes: [''],
    editor_revista: false,
    revistas_editadas: [''],

    redes_sociais: [{ plataforma: 'linkedin', url: '' }],
  });

  // Função para campos simples (texto, email, checkbox)
  const handleSimpleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleListChange = (index, event, listName) => {
    const { name, value } = event.target;
    const list = [...formData[listName]];
    // se o item da lista for um objeto (como disciplina ou rede social)
    if (typeof list[index] === 'object' && list[index] !== null) {
      list[index][name] = value;
    } else { // se for uma lista de strings (como publicacoes)
      list[index] = value;
    }
    setFormData(prev => ({ ...prev, [listName]: list }));
  };

  const addListItem = (listName, newItem) => {
    setFormData(prev => ({
      ...prev,
      [listName]: [...prev[listName], newItem]
    }));
  };

  const removeListItem = (index, listName) => {
    const list = [...formData[listName]];
    list.splice(index, 1);
    setFormData(prev => ({ ...prev, [listName]: list }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    // Lógica para enviar 'formData' para a API
    console.log("Dados do Cadastro:", JSON.stringify(formData, null, 2));
    alert('Cadastro realizado com sucesso!');
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form-card">
        <header className="registration-header">
          <h1>Cadastro</h1>
        </header>

        {/* Informações Pessoais e Login */}
        <fieldset>
          <legend>Informações Pessoais e Acesso</legend>
          <div className="form-group"><label>Nome Completo</label><input required name="nome" value={formData.nome} onChange={handleSimpleChange} /></div>
          <div className="form-group"><label>E-mail</label><input required type="email" name="email" value={formData.email} onChange={handleSimpleChange} /></div>
          <div className="form-group"><label>Senha</label><input required type="password" name="senha" value={formData.senha} onChange={handleSimpleChange} minLength="6" /></div>
          <div className="form-group"><label>Confirmar Senha</label><input required type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleSimpleChange} /></div>
          <div className="form-group"><label>Celular</label><input type="tel" name="celular" value={formData.celular} onChange={handleSimpleChange} /></div>
          <div className="form-group"><label>Link Lattes</label><input type="url" name="link_lattes" value={formData.link_lattes} onChange={handleSimpleChange} /></div>
        </fieldset>

        {/* Vínculos e Afiliações */}
        <fieldset>
          <legend>Vínculos e Afiliações</legend>
          <div className="form-group"><label>Instituição Primária</label><input name="instituicao_primaria" value={formData.instituicao_primaria} onChange={handleSimpleChange} /></div>
          <div className="form-group"><label>Instituição Secundária (Opcional)</label><input name="instituicao_secundaria" value={formData.instituicao_secundaria} onChange={handleSimpleChange} /></div>
          <div className="form-group"><label>Laboratório de Pesquisa (Opcional)</label><input name="laboratorio" value={formData.laboratorio} onChange={handleSimpleChange} /></div>
          <div className="form-group"><label>Grupo de Pesquisa</label><input name="grupo_pesquisa" value={formData.grupo_pesquisa} onChange={handleSimpleChange} /></div>
          <div className="form-group checkbox-group"><input type="checkbox" id="pq" name="pq" checked={formData.pq} onChange={handleSimpleChange} /><label htmlFor="pq">É pesquisador PQ (CNPq)?</label></div>
          <div className="form-group checkbox-group"><input type="checkbox" id="membro_sbfte" name="membro_sbfte" checked={formData.membro_sbfte} onChange={handleSimpleChange} /><label htmlFor="membro_sbfte">É membro da SBFTE?</label></div>
        </fieldset>

        {/* Páginas Institucionais */}
        <fieldset>
          <legend>Páginas Institucionais (Opcional)</legend>
          {formData.paginas_institucionais.map((pagina, index) => (
            <div key={index} className="dynamic-list-item">
              <input value={pagina} onChange={(e) => handleListChange(index, e, 'paginas_institucionais')} placeholder="http://sua-pagina.edu.br" />
              {formData.paginas_institucionais.length > 1 && <button type="button" className="remove-btn" onClick={() => removeListItem(index, 'paginas_institucionais')}>Remover</button>}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => addListItem('paginas_institucionais', '')}>Adicionar Página</button>
        </fieldset>

        {/* Áreas de Pesquisa */}
        <fieldset>
          <legend>Áreas de Pesquisa</legend>
          {formData.areas_pesquisa.map((area, index) => (
            <div key={index} className="dynamic-list-item">
              <input value={area} onChange={(e) => handleListChange(index, e, 'areas_pesquisa')} placeholder="Ex: Biologia Molecular" />
              {formData.areas_pesquisa.length > 1 && <button type="button" className="remove-btn" onClick={() => removeListItem(index, 'areas_pesquisa')}>Remover</button>}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => addListItem('areas_pesquisa', '')}>Adicionar Área</button>
        </fieldset>

        {/* Disciplinas */}
        <fieldset>
          <legend>Disciplinas Lecionadas</legend>
          {formData.disciplinas.map((disciplina, index) => (
            <div key={index} className="dynamic-list-item-column">
              <input name="nome" value={disciplina.nome} onChange={(e) => handleListChange(index, e, 'disciplinas')} placeholder="Nome da Disciplina" />
              <textarea name="descricao" value={disciplina.descricao} onChange={(e) => handleListChange(index, e, 'disciplinas')} placeholder="Descrição da Disciplina" />
              {formData.disciplinas.length > 1 && <button type="button" className="remove-btn" onClick={() => removeListItem(index, 'disciplinas')}>Remover Disciplina</button>}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => addListItem('disciplinas', { nome: '', descricao: '' })}>Adicionar Disciplina</button>
        </fieldset>

        {/* Publicações */}
        <fieldset>
          <legend>Principais Publicações (DOI, máx. 5)</legend>
          {formData.publicacoes.map((pub, index) => (
            <div key={index} className="dynamic-list-item">
              <input value={pub} onChange={(e) => handleListChange(index, e, 'publicacoes')} placeholder="doi.org/10.1038/171737a0" />
              {formData.publicacoes.length > 1 && <button type="button" className="remove-btn" onClick={() => removeListItem(index, 'publicacoes')}>Remover</button>}
            </div>
          ))}
          {formData.publicacoes.length < 5 && <button type="button" className="add-btn" onClick={() => addListItem('publicacoes', '')}>Adicionar Publicação</button>}
        </fieldset>

        {/* Redes Sociais */}
        <fieldset>
          <legend>Redes Sociais</legend>
          {formData.redes_sociais.map((rede, index) => (
            <div key={index} className="dynamic-list-item">
              <select name="plataforma" value={rede.plataforma} onChange={(e) => handleListChange(index, e, 'redes_sociais')}>
                <option value="linkedin">LinkedIn</option><option value="researchgate">ResearchGate</option><option value="x">X (Twitter)</option><option value="instagram">Instagram</option>
              </select>
              <input name="url" value={rede.url} onChange={(e) => handleListChange(index, e, 'redes_sociais')} placeholder="URL do seu perfil" />
              {formData.redes_sociais.length > 1 && <button type="button" className="remove-btn" onClick={() => removeListItem(index, 'redes_sociais')}>Remover</button>}
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => addListItem('redes_sociais', { plataforma: 'linkedin', url: '' })}>Adicionar Rede Social</button>
        </fieldset>

        {/* Edição de Revistas */}
        <fieldset>
          <legend>Atuação Editorial</legend>
          <div className="form-group checkbox-group"><input type="checkbox" id="editor_revista" name="editor_revista" checked={formData.editor_revista} onChange={handleSimpleChange} /><label htmlFor="editor_revista">É editor(a) de revista científica?</label></div>
          {formData.editor_revista && (
            <div>
              {formData.revistas_editadas.map((revista, index) => (
                <div key={index} className="dynamic-list-item">
                  <input value={revista} onChange={(e) => handleListChange(index, e, 'revistas_editadas')} placeholder="Nome da Revista" />
                  {formData.revistas_editadas.length > 1 && <button type="button" className="remove-btn" onClick={() => removeListItem(index, 'revistas_editadas')}>Remover</button>}
                </div>
              ))}
              <button type="button" className="add-btn" onClick={() => addListItem('revistas_editadas', '')}>Adicionar Revista</button>
            </div>
          )}
        </fieldset>

        <button type="submit" className="submit-btn">Criar Conta</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
