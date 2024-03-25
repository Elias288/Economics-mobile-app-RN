/**
 * Formatea valores
 * @param {number} amount Monto a ser formatead a 00.000,00
 */
export default function formatAmount(amount) {
    if (amount === 0) return "0,00";

    // Verificar si el número es entero
    if (amount % 1 === 0) {
        return amount.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    return amount
        .toLocaleString("es-ES", { minimumFractionDigits: 2 })
        .replace('.', ',')
}