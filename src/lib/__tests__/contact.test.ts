import { describe, expect, it } from "vitest";
import { isBot, parseContact } from "../contact";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I'd like to talk about a full-stack role.",
};

describe("parseContact", () => {
  it("accepts a valid message and trims whitespace", () => {
    const result = parseContact({ ...valid, name: "  Ada Lovelace  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.name).toBe("Ada Lovelace");
  });

  it("returns one error per invalid field", () => {
    const result = parseContact({ name: "", email: "not-an-email", message: "hi" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(Object.keys(result.errors).sort()).toEqual(["email", "message", "name"]);
      expect(result.errors.email).toBe("Enter a valid email address.");
    }
  });

  it("rejects non-object input", () => {
    expect(parseContact("hello").ok).toBe(false);
    expect(parseContact(null).ok).toBe(false);
  });
});

describe("isBot", () => {
  it("flags submissions that fill the honeypot field", () => {
    const result = parseContact({ ...valid, company: "Spam Inc" });
    expect(result.ok && isBot(result.data)).toBe(true);
  });

  it("lets real submissions through", () => {
    const result = parseContact(valid);
    expect(result.ok && isBot(result.data)).toBe(false);
  });
});
