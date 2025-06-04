import { RefundRuleFactory } from "./refund_rule_factory";

describe("RefundRuleFactory", () => {
  it("deve retornar FullRefund quando a reserva for cancelada com mais de 7 dias de antecedência", () => {
    const refund = RefundRuleFactory.getRefundRule(8);

    expect(refund.calculateRefund(100)).toBe(0);
  });

  it("deve retornar PartialRefund quando a reserva for cancelada entre 1 e 7 dias de antecedência", () => {
    const refund = RefundRuleFactory.getRefundRule(5);

    expect(refund.calculateRefund(100)).toBe(50);
  });

  it("deve retornar NoRefund quando a reserva for cancelada com menos de 1 dia de antecedência", () => {
    const refund = RefundRuleFactory.getRefundRule(0);

    expect(refund.calculateRefund(100)).toBe(100);
  });
});
