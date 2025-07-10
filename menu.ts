import { colors } from "./src/util/Colors";
import { ContaCorrente } from "./src/model/ContaCorrente";
import { ContaPoupanca } from "./src/model/ContaPoupanca";
import read = require('readline-sync');

// const conta: Conta = new Conta(1, 123, 1, "Sarah", 100);
// conta.visualizar();
// conta.sacar(500);
// conta.visualizar();
// conta.depositar(10000);
// conta.visualizar();

const contacorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Flavia", 1000, 50);
contacorrente.visualizar();
contacorrente.sacar(2000);
contacorrente.visualizar();
contacorrente.depositar(1000);
contacorrente.visualizar();

const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "João", 1000, 10);
contapoupanca.visualizar();
contapoupanca.sacar(200);
contapoupanca.visualizar();
contapoupanca.depositar(1000);
contapoupanca.visualizar();

export function main() {
    let opcao: number;
    let continuar: boolean = true;

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
        opcao = read.questionInt("Entre com a opção desejada:\n🔵 ");
        console.log(colors.reset);

        switch (opcao) {
            case 1:
                console.log(colors.magenta);
                console.log("\nCriar nova conta");
                console.log(colors.reset);
                keyPress();
                break;

            case 2:
                console.log(colors.magenta);
                console.log("\nLista com as contas criadas:");
                console.log(colors.reset);
                keyPress();
                break;

            case 3:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta que deseja consultar (apenas números)");
                console.log(colors.reset);
                keyPress();
                break;

            case 4:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta que deseja atualizar (apenas números)");
                console.log(colors.reset);
                keyPress();
                break;

            case 5:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta que deseja excluir (apenas números)");
                console.log(colors.reset);
                keyPress();
                break;

            case 6:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta (apenas números)");
                console.log(colors.reset);
                keyPress();
                break;

            case 7:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta origem do depósito (apenas números)");
                console.log(colors.reset);
                keyPress();
                break;

            case 8:
                console.log(colors.magenta);
                console.log("\nInsira os dados da conta origem da transferência (apenas números)");
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
