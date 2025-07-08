export class Conta {
    private _numero: number;
    private _agencia: number;
    private _tipo: number;
    private _titular: string;
    private _saldo: number;


    constructor(numero: number, agencia: number, tipo: number, titular: string, saldo: number) {
        this._numero = numero;
        this._agencia = agencia;
        this._tipo = tipo;
        this._titular = titular;
        this._saldo = saldo;
    }
    public getNumero(): number {
        return this._numero;
    }
    public setNumero(value: number) {
        this._numero = value;
    }
    public getAgencia(): number {
        return this._agencia;
    }
    public setAgencia(value: number) {
        this._agencia = value;
    }
    public getTipo(): number {
        return this._tipo;
    }
    public setTipo(value: number) {
        this._tipo = value;
    }
    public getTitular(): string {
        return this._titular;
    }
    public setTitular(value: string) {
        this._titular = value;
    }

    public getSaldo(): number {
        return this._saldo;
    }
    public setSaldo(value: number) {
        this._saldo = value;
    }
}
