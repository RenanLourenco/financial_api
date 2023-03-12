const { DespesasServices, ReceitasServices } = require('../../src/services')

const despesasServices = new DespesasServices()
const receitasServices = new ReceitasServices()


test('test', () => {
    const result = 1 + 1

    expect(result).toBe(2)
})