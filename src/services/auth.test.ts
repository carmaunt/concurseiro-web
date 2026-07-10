import { describe, expect, it } from "vitest";
import { parseUserRole } from "./auth";

describe("parseUserRole", () => {
  it("normaliza os perfis aceitos", () => {
    expect(parseUserRole(" usuario_final ")).toBe("USUARIO_FINAL");
    expect(parseUserRole("admin")).toBe("ADMIN");
    expect(parseUserRole("VISITANTE")).toBe("VISITANTE");
  });

  it("recusa valores desconhecidos", () => {
    expect(parseUserRole("GESTOR")).toBeNull();
    expect(parseUserRole(null)).toBeNull();
  });
});
