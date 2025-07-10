import { Conta } from "./Conta";

export class ContaCorrente extends Conta {

    private _limite: number;

    constructor(numero: number, agencia: number, tipo: number, titular: string,
        saldo: number, limite: number) {
        super(numero, agencia, tipo, titular, saldo);
        this._limite = limite;
    }
    public get limite() {
        return this._limite;
    }

    public set limite(limite: number) {
        this._limite = limite;
    }

    public sacar(valor: number): boolean {
        if (valor <= 0) {
            console.log("\n ❌ Valor de saque deve ser positivo!");
            return false;
        }

        if (this.saldo < valor) {
            console.log("\n ❌ Saldo Insuficiente!");
            return false;
        }

        this.saldo = this.saldo - valor;
        console.log(`\n ✅ Saque de R$ ${valor.toFixed(2)} realizado com sucesso!`);
        return true;
    }

    public visualizar(): void {
        super.visualizar();
        console.log("💰 Limite: " + this._limite.toFixed(2));
    }
}
