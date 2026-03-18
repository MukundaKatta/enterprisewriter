import { describe, it, expect } from "vitest";
import { Enterprisewriter } from "../src/core.js";
describe("Enterprisewriter", () => {
  it("init", () => { expect(new Enterprisewriter().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Enterprisewriter(); await c.learn(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Enterprisewriter(); await c.learn(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
