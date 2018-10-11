const stringToJson = (string) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    return string;
  }
};

const cordovaGenerator = (hook, action, params = []) => new Promise((resolve, reject) => {
  if (typeof cordova !== 'undefined') {
    cordova.exec(function(result) {
      result = stringToJson(result);
      resolve(result);
    }, function(error) {
      resolve({ status: -1, error });
    }, hook, action, params);
  } else {
    resolve({ status: -1 });
  }
});

export const emptyRightBtn = () => cordovaGenerator("WorkPlus_WebView", "clearRightButtons");
export const changeTitle = (title) => cordovaGenerator("WorkPlus_WebView", "title", [title]);