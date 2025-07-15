import { colors } from "./src/util/Colors";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";
import read = require('readline-sync');

// validações
const validarNomeTitular = (titular: string): boolean =>/^[A-Za-zÀ-ú\s]+$/.test(titular);

function validarValorPositivo(mensagem: string, mensagemErro: string = "❌ Valor deve ser maior que zero. Tente novamente."): number {
    let valor: number;
    do {
        console.log(colors.magenta);
        valor = read.questionFloat(` ${mensagem}`);
        if (valor <= 0) {
            console.log(colors.red);
            console.log(mensagemErro);
        }
    } while (valor <= 0);
    return valor;
}

function validarValorIntervalo(
    mensagem: string,
    min: number,
    max: number,
    mensagemErro: string = `❌ Valor deve estar entre ${min} e ${max}. Tente novamente.`): number {

    let valor: number;

    do {
        console.log(colors.magenta);
        valor = read.questionInt(`${mensagem}`);
        if (valor < min || valor > max) {
            console.log(colors.red);
            console.log(mensagemErro);
        }
    } while (valor < min || valor > max);

    return valor;
}

export function main() {
    let contas: ContaController = new ContaController();

    let opcao, numero, agencia, tipo, saldo, limite, aniversario: number, valor, numeroDestino:number;
    let titular: string;
    let continuar: boolean = true;

    const tiposContas = ['Conta Corrente', 'Conta Poupança'];

    while (continuar) {
        console.log(colors.yellow);
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            💰 BANCO DO BRAZIL COM Z 💰              ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1️⃣  Criar Conta                          ");
        console.log("            2️⃣  Listar todas as Contas               ");
        console.log("            3️⃣  Buscar Conta por Numero              ");
        console.log("            4️⃣  Atualizar Dados da Conta             ");
        console.log("            5️⃣  Apagar Conta                         ");
        console.log("            6️⃣  Sacar                                ");
        console.log("            7️⃣  Depositar                            ");
        console.log("            8️⃣  Transferir valores entre Contas      ");
        console.log("            9️⃣  Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log(colors.reset);

        console.log(colors.green);
        opcao = read.questionInt("\nEntre com a opção desejada:\n🔵 ");
        console.log(colors.reset);

        switch (opcao) {
            case 1:
                console.log(colors.blue);
                console.log("\nCriar nova conta");
                console.log(colors.reset);

                console.log(colors.magenta);
                console.log("\nDigite o  numero da agencia (apenas números):");
                agencia = read.questionInt("🔵 ");

                console.log("\nDigite o nome do titular da conta:");
                titular = read.question("🔵 ");
                console.log(colors.reset);

                while (!validarNomeTitular(titular)) {
                    console.log(colors.red);
                    console.log("❌ Nome inválido! Use apenas letras e espaços.");
                    console.log(colors.reset);
                    console.log(colors.magenta);
                    titular = read.question("\n➡ Digite novamente: ").trim();
                    console.log(colors.reset);
                }

                console.log("Escolha o tipo de conta:");
                tipo = read.keyInSelect(tiposContas, " ", { cancel: false }) + 1;

                console.log(colors.magenta);
                saldo = validarValorPositivo("\n Digite o saldo inicial da conta (apenas números): \n🔵 R$");
                console.log(colors.reset);

                switch (tipo) {
                    case 1: // Conta Corrente
                        limite = validarValorPositivo("\nDigite o limite da conta (apenas números):\n🔵 R$");
                        contas.cadastrar(new ContaCorrente(contas.gerarNumeroConta(), agencia, tipo, titular, saldo, limite));
                        break;
                    case 2: // Conta Poupança
                        aniversario = validarValorIntervalo(" Dia do aniversário (1-31): \n🔵  ", 1, 31);

                        try {
                            contas.cadastrar(new ContaPoupanca(contas.gerarNumeroConta(), agencia, tipo, titular, saldo, aniversario));
                        } catch (error) {
                            console.log(colors.red);

                            // Verificação segura do tipo do erro
                            if (error instanceof Error) {
                                console.log(`❌ Erro ao criar conta: ${error.message}`);
                            } else {
                                console.log('❌ Ocorreu um erro inesperado');
                            }
                            console.log(colors.reset);
                            keyPress();
                            continue;
                        }
                        break;
                }
                console.log(colors.reset);
                keyPress();
                break;

            case 2:
                console.log(colors.yellow);
                console.log("\nLista com as contas criadas:");
                contas.listarTodas();
                console.log(colors.reset);
                keyPress();
                break;

            case 3:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta que deseja consultar (apenas números)");
                numero = read.questionInt("🔵 ");
                contas.procurarPorNumero(numero);

                console.log(colors.reset);
                keyPress();
                break;

            case 4:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta que deseja atualizar (apenas números)");
                numero = read.questionInt("🔵 ");

                let conta = contas.buscarContaPorNumero(numero);

                if (conta != null) {
                    console.log("\nDigite o novo número da agência (apenas números):");
                    agencia = read.questionInt("🔵 ");

                    console.log("\nDigite o novo nome do titular da conta:");
                    titular = read.question("🔵 ");

                    while (!validarNomeTitular(titular)) {
                        console.log(colors.red);
                        console.log("❌ Nome inválido! Use apenas letras e espaços.");
                        console.log(colors.reset);

                        console.log(colors.magenta);
                        titular = read.question("➡ Digite novamente: ").trim();
                        console.log(colors.reset);
                    }

                    console.log(colors.reset);
                    console.log("Escolha o tipo de conta:");
                    tipo = read.keyInSelect(tiposContas, "🔵 ", { cancel: false }) + 1;

                    console.log(colors.magenta);
                    saldo = validarValorPositivo("\nDigite o novo saldo  da conta (apenas números): \n🔵 R$");
                    console.log(colors.reset);

                    switch (tipo) {
                        case 1: // Conta Corrente
                            console.log(colors.magenta);
                            limite = validarValorPositivo("Digite o novo limite da conta (apenas números): \n🔵 R$ ");
                            contas.atualizar(new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            console.log(colors.reset);
                            keyPress();
                            break;

                        case 2: // Conta Poupança
                            console.log(colors.magenta);
                            aniversario = validarValorIntervalo(" Dia do aniversário (1-31): \n🔵  ", 1, 31);

                            try {
                                contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                            } catch (error) {
                                console.log(colors.red);
                                if (error instanceof Error) {
                                    console.log(`❌ Erro ao atualizar conta: ${error.message}`);
                                } else {
                                    console.log('❌ Ocorreu um erro inesperado');
                                }
                            }
                            console.log(colors.reset);
                            keyPress();
                            break;
                    }
                } else {
                    console.log(colors.red);
                    console.log('❌ Conta não encontrada. Número inválido ou conta não existe.');
                    console.log(colors.reset);
                    keyPress();
                }
                break;

            case 5:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta que deseja excluir (apenas números)");
                numero = read.questionInt("🔵 ");

                contas.deletar(numero);

                console.log(colors.reset);
                keyPress();
                break;

            case 6:
                console.log(colors.blue);
                console.log("\nSaque de valores");
                console.log(colors.reset);

                console.log(colors.magenta);
                console.log("\nInsira os dados da conta origem do saque (apenas números)");
                numero = read.questionInt("🔵 ");

                console.log("\nInsira o valor do saque (apenas números)");
                valor = validarValorPositivo("🔵 R$");

                contas.sacar(numero, valor);
                console.log(colors.reset);

                keyPress();
                break;

            case 7:
                console.log(colors.blue);
                console.log("\nDeposito de valores");
                console.log(colors.reset);

                console.log(colors.magenta);
                console.log("\nInsira os dados da conta origem do depósito (apenas números)");
                numero = read.questionInt("🔵 ");

                console.log("\nInsira o valor do depósito (apenas números)");
                valor = validarValorPositivo("🔵 R$");

                contas.depositar(numero, valor);

                console.log(colors.reset);
                keyPress();
                break;

            case 8:
                console.log(colors.blue);
                console.log("\Transferencia de valores");
                console.log(colors.reset);

                console.log(colors.magenta);
                console.log("\nInsira os dados da conta origem da transferência (apenas números)");
                numero = read.questionInt("🔵 ");

                console.log("\nInsira os dados da conta destino da transferência (apenas números)");
                numeroDestino = read.questionInt("🔵 ");

                console.log("\nInsira o valor da transferência (apenas números)");
                valor = validarValorPositivo("🔵 R$");

                contas.transferir(numero, numeroDestino, valor);
                console.log(colors.reset);
                keyPress();
                break;

            case 9:
                console.log(colors.magenta);
                console.log("\n 💹 Banco do Brazil com Z - O seu Futuro começa aqui!");
                console.log(colors.reset);
                sobre();
                console.log("👋 Saindo do sistema...");
                console.log(colors.reset);
                continuar = false;
                break;

            default:
                console.log(colors.red);
                console.log("❌ Opção inválida. Tente novamente.");
                console.log(colors.reset);
                keyPress();
        }
    }
}

function keyPress(): void {
    console.log("\n ✔️  Pressione enter para continuar...");
    read.prompt();
}

export function sobre(): void {
    console.log(colors.cyan);
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Sarah Affonço");
    console.log("Generation Brasil - saraha@genstudents.org");
    console.log("https://github.com/sarahaffonco/conta_bancaria");
    console.log("*****************************************************");
}

main();
