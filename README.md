# task.io-api

## Configurando ambiente de desenvolvimento
- Realizar fork do reposítório.
- Clonar o reposítório.
    - `git clone https://github.com/SeuUsuarioDoGit/task.io-api`
- Rodar o seguinte comando para adicionar a upstream:
    - `git remote add upstream https://github.com/Task-io/task.io-api`
- Bloquear push para upstream:
    - `git remote set-url --push origin NO_PUSH`
- Atualizar repositório:
    - `git pull upstream main`
- Para enviar as alterações (Sempre deve ser enviado para sua origin):
    - `git push origin`
- Sempre que for implementar uma nova funcionalidade no projeto, deve ser criado uma nova branch:
    - `git checkout -b type-nome-da-branch`

## Building project
WIP