import { Conta } from "./Conta";

export class ContaPoupanca extends Conta {

    private _aniversario: number;

    constructor(numero: number, agencia: number, tipo: number, titular: string,
        saldo: number, aniversario: number) {
        super(numero, agencia, tipo, titular, saldo);
        this._aniversario = aniversario;
    }
    public get aniversario() {
        return this._aniversario;
    }

    public set aniversario(aniversario: number) {
        this._aniversario = aniversario;
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
        console.log("🎂 Dia do Aniversário: " + this._aniversario);
    }


}
