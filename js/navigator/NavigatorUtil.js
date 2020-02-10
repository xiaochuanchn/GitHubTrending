export default class NavigatorUtil {
  /**
   * @description: 返回到首页
   * @param {type}
   * @return:
   */
  static resetToHomePage(params) {
    console.log(params);
    const {navigation} = params;
    navigation.navigate('Main');
  }
  /**
   * @description: 跳转到详情页
   * @param {type}
   * @return:
   */
  static goPage(params, page) {
    const navigation = NavigatorUtil.navigation;
    console.log(params, page);
    if (!navigation) {
      console.log('为空');
      return;
    }
    navigation.navigate(page, {...params});
  }
  static goBack(navigation) {
    navigation.goBack();
  }
}
