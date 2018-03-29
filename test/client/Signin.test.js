import { mount } from 'vue-test-utils';
import Signin from '../../src/components/Signin';

describe('Signin Component 測試', () => {
  let cmp;
  beforeEach(() => {
    cmp = mount(Signin);
  });

  describe('about Constructure', () => {
    it('snapshot:', () => {
      expect(cmp.element).toMatchSnapshot();
    });
  });

  describe('about Props:', () => {
    describe('about buttonValue:', () => {
      it('buttonValue 預設 "按鈕"', () => {
        expect(cmp.props().buttonValue).toBe('按鈕');
      });
      it('當 Props 帶入 "註冊" 時會成功帶到 template 上', () => {
        cmp.setProps({ buttonValue: '註冊' });
        expect(cmp.find('#button-send').text()).toBe('註冊');
      });
    });

    describe('about autoFakeAccount:', () => {
      it('autoFakeAccount 預設為空物件', () => {
        expect(cmp.props().autoFakeAccount).toEqual({});
      });
      it('當 Props 帶入帶有帳號與密碼的物件時，成功的帶到 data: account, password 上:', () => {
        cmp.setProps({
          autoFakeAccount: {
            fakeAccount: 'example@example.com',
            fakePassword: 'example',
          },
        });
        cmp.vm.$nextTick(() => {
          expect(cmp.vm.accountValue).toBe('example@example.com');
          expect(cmp.vm.passwordValue).toBe('example');
        });
      });
    });
  });

  describe('about Methods', () => {
    describe('clickSendBtn():', () => {
      let stub;
      beforeEach(() => {
        stub = jest.fn();
      });

      it('點擊 #button-send 後有被觸發', () => {
        cmp.setMethods({ clickSendBtn: stub });
        cmp.find('#button-send').trigger('click');
        expect(stub).toBeCalled();
      });
      it('點擊後有啟動 $emit', () => {
        cmp.vm.$on('handle-click-send-btn', stub);
        cmp.vm.clickSendBtn();
        expect(stub).toBeCalled();
      });
      it('input 輸入值後點擊，$emit 會送出正確格式的物件', () => {
        // 不知道為什麼，使用 setData({}) 的方式塞值進去，在內部使用 this 的方式抓取資料
        // 的時候會出現 undefind.
        cmp.vm.accountValue = 'example@example.com';
        cmp.vm.passwordValue = 'example';
        cmp.vm.$on('handle-click-send-btn', stub);
        cmp.vm.clickSendBtn();
        expect(stub).toBeCalledWith({
          account: 'example@example.com',
          password: 'example',
        });
      });
    });
  });

  describe('about Watch', () => {
    describe('autoFakeAccount:', () => {
      it('數值改變的時候，watch 有被呼叫', () => {
        cmp.setData({
          autoFakeAccount: {
            fakeAccount: 'example@example.com',
            fakePassword: 'example',
          },
        });
        cmp.vm.$nextTick(() => {
          expect(cmp.vm.accountValue).toBe('example@example.com');
          expect(cmp.vm.passwordValue).toBe('example');
        });
      });
    });
  });
});
