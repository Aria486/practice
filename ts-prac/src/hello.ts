type SN = string | number;

class Hello {
  msg: SN;
  name: string;
  constructor(message: SN, name: string) {
    this.msg = message;
    this.name = name;
  }

  private say() {
    return 'Hello' + this.msg;
  }

  alertName(name: string): void {
    alert(`${this.name} ${name}`);
  }
}

class MiniHello extends Hello {
  constructor(msg: SN, name: string) {
    super(msg, name);

  }

  head() {
    const a = super.say();
    return a;
  }
}