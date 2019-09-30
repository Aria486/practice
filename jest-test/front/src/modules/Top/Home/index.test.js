import React from "react";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { mount, shallow } from "enzyme";
import Home from "./index";

describe("Login画面", () => {
  it("文言チェック", () => {
    const wrapper = shallow(<Home />);
    const div = wrapper.find("div");
    expect(div.text()).toBe("home");
  });

  it("test", () => {
    const wrapper = shallow(<Home />);
    const div = wrapper.find("div");
    expect(div.text()).toBe("home");
  });
});
