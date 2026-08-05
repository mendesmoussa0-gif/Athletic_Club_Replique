<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin CRUD - Athletic Club Replique</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 24px; background: #f7f7f7; color: #222; }
        .card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 12px rgba(0,0,0,.08); margin-bottom: 24px; }
        .card h1, .card h2 { margin-top: 0; }
        .form-grid { display: grid; gap: 12px; grid-template-columns: 1fr 1fr; }
        label { display: block; font-size: 0.95rem; margin-bottom: 6px; }
        input, select, button { width: 100%; padding: 10px 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; }
        button { cursor: pointer; background: #0078d4; color: white; border: none; }
        button.secondary { background: #666; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { padding: 12px; border-bottom: 1px solid #e1e1e1; text-align: left; }
        th { background: #f1f1f1; }
        .actions button { margin-right: 8px; }
        .message { margin-top: 12px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Gerenciar Membros</h1>
        <p>Use este painel para criar, listar, atualizar e excluir membros da academia.</p>
    </div>

    <div class="card">
        <h2>Formulário de Membro</h2>
        <form id="memberForm">
            <div class="form-grid">
                <div>
                    <label for="nome">Nome</label>
                    <input id="nome" name="nome" type="text" required>
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" name="email" type="email" required>
                </div>
                <div>
                    <label for="telefone">Telefone</label>
                    <input id="telefone" name="telefone" type="tel">
                </div>
                <div>
                    <label for="categoria">Categoria</label>
                    <select id="categoria" name="categoria">
                        <option value="">Selecione</option>
                        <option value="Iniciação">Iniciação</option>
                        <option value="Infantil">Infantil</option>
                        <option value="Juvenil">Juvenil</option>
                        <option value="Adulto">Adulto</option>
                    </select>
                </div>
            </div>
            <input type="hidden" id="memberId" name="id">
            <div style="margin-top:16px; display:flex; gap:12px; flex-wrap: wrap;">
                <button id="saveButton" type="submit">Salvar</button>
                <button id="resetButton" type="button" class="secondary">Limpar</button>
            </div>
            <div id="message" class="message"></div>
        </form>
    </div>

    <div class="card">
        <h2>Lista de Membros</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Categoria</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="membersTableBody"></tbody>
        </table>
    </div>

    <script>
        const memberForm = document.getElementById('memberForm');
        const messageEl = document.getElementById('message');
        const tableBody = document.getElementById('membersTableBody');
        const saveButton = document.getElementById('saveButton');
        const resetButton = document.getElementById('resetButton');

        const apiUrl = 'crud.php';

        async function fetchMembers() {
            const response = await fetch(`${apiUrl}?action=list`);
            const data = await response.json();
            if (data.success) {
                renderMembers(data.data);
            } else {
                showMessage(data.error || 'Erro ao carregar membros.', true);
            }
        }

        function renderMembers(members) {
            tableBody.innerHTML = members.map(member => `
                <tr>
                    <td>${member.id}</td>
                    <td>${member.nome}</td>
                    <td>${member.email}</td>
                    <td>${member.telefone || '-'}</td>
                    <td>${member.categoria || '-'}</td>
                    <td class="actions">
                        <button type="button" onclick="editMember(${member.id})">Editar</button>
                        <button type="button" onclick="deleteMember(${member.id})" style="background:#c62828;">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }

        function showMessage(text, isError = false) {
            messageEl.textContent = text;
            messageEl.style.color = isError ? '#c62828' : '#0b6623';
        }

        memberForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(memberForm);
            const id = formData.get('id');
            const action = id ? 'update' : 'create';
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: new URLSearchParams({ ...Object.fromEntries(formData), action }),
            });
            const data = await response.json();
            if (data.success) {
                showMessage(id ? 'Membro atualizado com sucesso.' : 'Membro criado com sucesso.');
                memberForm.reset();
                document.getElementById('memberId').value = '';
                fetchMembers();
            } else {
                showMessage(data.error || 'Erro ao salvar.', true);
            }
        });

        resetButton.addEventListener('click', () => {
            memberForm.reset();
            document.getElementById('memberId').value = '';
            showMessage('Formulário limpo.');
        });

        window.editMember = async function (id) {
            const response = await fetch(`${apiUrl}?action=read&id=${id}`);
            const data = await response.json();
            if (data.success) {
                const member = data.data;
                document.getElementById('memberId').value = member.id;
                document.getElementById('nome').value = member.nome;
                document.getElementById('email').value = member.email;
                document.getElementById('telefone').value = member.telefone || '';
                document.getElementById('categoria').value = member.categoria || '';
                showMessage('Editando membro ID ' + member.id);
            } else {
                showMessage(data.error || 'Erro ao carregar membro.', true);
            }
        };

        window.deleteMember = async function (id) {
            if (!confirm('Deseja realmente excluir este membro?')) {
                return;
            }
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ action: 'delete', id }),
            });
            const data = await response.json();
            if (data.success) {
                showMessage('Membro excluído com sucesso.');
                fetchMembers();
            } else {
                showMessage(data.error || 'Erro ao excluir.', true);
            }
        };

        fetchMembers();
    </script>
</body>
</html>