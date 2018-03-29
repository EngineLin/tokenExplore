import { mount } from 'vue-test-utils'
import Button from '../../src/components/Button/Button.vue'

/**
 * 這邊可以思考一下測試的時候基本需要測試的項目是什麼？
 * 慢慢累積經驗。
 * 1. props
 * 2. methods and $emit
 * 3. computed and watch
 * 4. template
 * 5. slot
 */
describe('Button Component 測試', () => {
  let cmp;
  beforeEach(() => {
    cmp = mount(Button);
  });

  describe('about Constructure', () => {
    it('snapshot:', () => {
      expect(cmp.element).toMatchSnapshot();
    });
  });

  describe('about Props:', () => {
    it("預設是 '按鈕'", () => {
      expect(cmp.props().buttonValue).toBe('按鈕');
    });
    it("當 Props 帶入 '註冊' 時會成功帶到 template 上", () => {
      cmp.setProps({ buttonValue: '註冊' });
      expect(cmp.find('button').text()).toBe('註冊');
    });
  });

  describe('about Methods:', () => {
    it('當 button 被點擊時，linkToOtherPage 被呼叫', () => {
      const mock = jest.fn();
      cmp.setMethods({ linkToOtherPage: mock });
      cmp.find('button').trigger('click');
      expect(mock).toBeCalled();
    });
    it("當 props.buttonValue 的類別不是 'string'，$emit.handleLinkToOtherPage 不被呼叫", () => {
      const mock = jest.fn();
      cmp.setProps({ buttonValue: 1 });
      cmp.vm.$on('handleLinkToOtherPage', mock);
      cmp.vm.linkToOtherPage();
      expect(mock).not.toBeCalled();
    });
    it("當 props.buttonValue 的內容是 '按鈕'，$emit.handleLinkToOtherPage 不被呼叫", () => {
      const mock = jest.fn();
      cmp.setProps({ buttonValue: '按鈕' });
      cmp.vm.$on('handleLinkToOtherPage', mock);
      cmp.vm.linkToOtherPage();
      expect(mock).not.toBeCalled();
    });
    it("當 props.buttonValue 的類別是 'string' 且不等於 '按鈕' 時，$emit.handleLinkToOtherPage 被呼叫", () => {
      const mock = jest.fn();
      cmp.setProps({ buttonValue: '註冊' });
      cmp.vm.$on('handleLinkToOtherPage', mock);
      cmp.vm.linkToOtherPage();
      expect(mock).toBeCalledWith('註冊');
    });
  });
});
