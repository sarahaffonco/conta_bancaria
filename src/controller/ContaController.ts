import { ContaRepository } from "../repository/ContaRepository";
import { Conta } from "../model/Conta";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {

        let buscaConta = this.buscarContaPorNumero(numero);

        if (buscaConta != null) {
            console.log(colors.green);
            console.log(`Conta encontrada. Número: ${buscaConta.numero}.`);
            buscaConta.visualizar();
            console.log(colors.reset);
        }
        else {
            console.log(colors.red);
            console.log('❌ Conta não encontrada. Numero inválido ou conta não existe.');
            console.log(colors.reset);
        }
    }

    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }

    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.cyan);
        console.log(`Conta número ${conta.numero} criada com sucesso!🎉`);
        console.log(colors.reset);
    }

    atualizar(conta: Conta): void {
        let buscaConta = this.buscarContaPorNumero(conta.numero);

        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.green);
            console.log(`Conta número ${conta.numero} atualizada com sucesso!🎉`);
            console.log(colors.reset);
        }
        else {
            console.log(colors.red);
            console.log('❌ Conta não encontrada. Número inválido ou conta não existe.');
            console.log(colors.reset);
        }
    }

    deletar(numero: number): void {
        let buscaConta = this.buscarContaPorNumero(numero);

        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.green);
            console.log(`Conta número ${numero} excluída com sucesso!`);
            console.log(colors.reset);
        }
        else {
            console.log(colors.red);
            console.log('❌ Conta não encontrada. Número inválido ou conta não existe.');
            console.log(colors.reset);
        }
    }

    sacar(numero: number, valor: number): void {
        // Implementação para sacar de uma conta
    }

    depositar(numero: number, valor: number): void {
        // Implementação para depositar em uma conta
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        // Implementação para transferir entre contas
    }

    // Métodos auxiliares

    //Gerar numero da conta
    public gerarNumeroConta(): number {
        this.numero++;
        return this.numero;
    }

    // Buscar conta por número
    public buscarContaPorNumero(numero: number): Conta | null {
        for (let conta of this.listaContas) {
            if (conta.numero === numero) {
                return conta;
            }
        }

        return null;
    }
}
