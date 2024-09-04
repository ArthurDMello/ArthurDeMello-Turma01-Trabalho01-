const Trabalho1Turma1 = require('../src/trabalho1Turma1');

describe('Testes da classe Trabalho1Turma1', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new Trabalho1Turma1();
    })

    test('Deve adicionar uma tarefa corretamente.', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toContain(tarefa);
    });

    test('Não deve adicionar uma tarefa com descrição muito curta.', () => {
        const tarefa = { id: 2, descricao: 'A' };
        expect(() => gerenciador.adicionarTarefa(tarefa)).toThrow('Erro ao cadastrar tarefa');
    });

    test('Deve remover uma tarefa corretamente.', () => {
        const tarefa = { id: 3, descricao: 'Lavar carro' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(3);
        expect(gerenciador.listarTarefas()).not.toContain(tarefa);
    });

    test('Deve buscar uma tarefa por id corretamente.', () => {
        const tarefa = { id: 4, descricao: 'Estudar' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(4)).toEqual(tarefa);
    });

    test('Deve atualizar uma tarefa corretamente.', () => {
        const tarefa = { id: 5, descricao: 'Fazer exercícios' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(5, { descricao: 'Fazer exercícios físicos' });
        expect(gerenciador.buscarTarefaPorId(5).descricao).toBe('Fazer exercícios físicos');
    });

    test('Deve listar todas as tarefas corretamente.', () => {
        const tarefa1 = { id: 6, descricao: 'Limpar a casa' };
        const tarefa2 = { id: 7, descricao: 'Preparar jantar' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('Deve contar o número de tarefas corretamente.', () => {
        gerenciador.adicionarTarefa({ id: 8, descricao: 'Fazer compras' });
        expect(gerenciador.contarTarefas()).toBe(1);
    });

    test('Deve marcar uma tarefa como concluída.', () => {
        const tarefa = { id: 9, descricao: 'Estudar para prova do Leandro' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(9);
        expect(gerenciador.buscarTarefaPorId(9).concluida).toBe(true);
    });

    test('Deve listar todas as tarefas concluídas.', () => {
        const tarefa1 = { id: 10, descricao: 'Limpar o quarto', concluida: true };
        const tarefa2 = { id: 11, descricao: 'Estudar', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasConcluidas()).toEqual([tarefa1]);
    });

    test('Deve listar todas as tarefas pendentes.', () => {
        const tarefa1 = { id: 12, descricao: 'Fazer café', concluida: false };
        const tarefa2 = { id: 13, descricao: 'Ler livro', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).toEqual([tarefa1]);
    });

    test('Deve remover todas as tarefas concluídas.', () => {
        const tarefa1 = { id: 14, descricao: 'Estudar matemática', concluida: true };
        const tarefa2 = { id: 15, descricao: 'Comprar pão', concluida: false };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2]);
    });

    test('Deve buscar tarefas por descrição.', () => {
        const tarefa = { id: 16, descricao: 'Fazer exercícios' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorDescricao('exercícios')).toEqual([tarefa]);
    });

    test('Deve adicionar uma tag a uma tarefa.', () => {
        const tarefa = { id: 17, descricao: 'Visitar médico' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(17, 'saúde');
        expect(gerenciador.buscarTarefaPorId(17).tags).toContain('saúde');
    });

    test('Deve remover uma tag de uma tarefa.', () => {
        const tarefa = { id: 18, descricao: 'Ler artigo', tags: ['leitura', 'estudo'] };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTagDaTarefa(18, 'leitura');
        expect(gerenciador.buscarTarefaPorId(18).tags).not.toContain('leitura');
    });

    test('Deve listar tarefas por tag.', () => {
        const tarefa1 = { id: 19, descricao: 'Fazer exercícios', tags: ['saúde'] };
        const tarefa2 = { id: 20, descricao: 'Comprar roupas', tags: ['compras'] };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorTag('saúde')).toEqual([tarefa1]);
    });

    test('Deve buscar tarefas por data.', () => {
        const tarefa = { id: 21, descricao: 'Reunião', data: '2024-09-01' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefasPorData('2024-09-01')).toEqual([tarefa]);
    });

    test('Deve atualizar a prioridade de uma tarefa.', () => {
        const tarefa = { id: 22, descricao: 'Comprar presente' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(22, 1);
        expect(gerenciador.buscarTarefaPorId(22).prioridade).toBe(1);
    });

    test('Deve listar tarefas por prioridade.', () => {
        const tarefa1 = { id: 23, descricao: 'Fazer comida', prioridade: 2 };
        const tarefa2 = { id: 24, descricao: 'Limpar a casa', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toEqual([tarefa2]);
    });

    test('Deve contar o número de tarefas por prioridade.', () => {
        const tarefa1 = { id: 25, descricao: 'Estudar', prioridade: 3 };
        const tarefa2 = { id: 26, descricao: 'Comprar leite', prioridade: 3 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefasPorPrioridade(3)).toBe(2);
    });

    test('Deve marcar todas as tarefas como concluídas.', () => {
        const tarefa1 = { id: 27, descricao: 'Ler livro' };
        const tarefa2 = { id: 28, descricao: 'Escrever relatório' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([
            { ...tarefa1, concluida: true },
            { ...tarefa2, concluida: true },
        ]);
    });

    test('Deve reabrir uma tarefa.', () => {
        const tarefa = { id: 29, descricao: 'Revisar código', concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.reabrirTarefa(29);
        expect(gerenciador.buscarTarefaPorId(29).concluida).toBe(false);
    });

    test('Deve ordenar tarefas por data.', () => {
        const tarefa1 = { id: 30, descricao: 'Visitar amigos', data: '2024-09-05' };
        const tarefa2 = { id: 31, descricao: 'Comprar livro', data: '2024-09-01' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });
    
    test('Deve ordenar tarefas por prioridade.', () => {
        const tarefa1 = { id: 32, descricao: 'Fazer compras', prioridade: 2 };
        const tarefa2 = { id: 33, descricao: 'Pagar contas', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2, tarefa1]);
    });
});

