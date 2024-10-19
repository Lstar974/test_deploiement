const { expect } = require('chai');

describe('Email Validation', () => {
  it('Should validate email format', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = "test@example.com";
    const invalidEmail = "invalid-email";
    
    expect(emailPattern.test(validEmail)).to.be.true;
    expect(emailPattern.test(invalidEmail)).to.be.false;
  });
});
