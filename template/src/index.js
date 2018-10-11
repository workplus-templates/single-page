import '@/assets/styles';

import $ from 'zepto';
import McxDialog from "mcx-dialog-mobile";
import FastClick from 'fastclick';

import { isWorkPlus } from './utils/tools';

const App = {
  mounted() {
    if (isWorkPlus()) {
      document.addEventListener('deviceready', () => {
        this.init();
      }, false);
    } else {
      McxDialog.toast('请在iWork中打开页面');
      this.init();
    }
  },
  init() {
    console.log('Page init');
  },
};

$(function() {
  FastClick.attach(document.body);
  App.mounted();
});
