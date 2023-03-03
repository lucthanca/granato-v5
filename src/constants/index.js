const BASE_SIZE = 14;

class Constants {
  static color = {
    primary: '#f69435',
    white: {
      normal: 'white',
    },
    black: {
      normal: '#101820FF',
      light: 'rgba(16,24,32,0.75)',
      lighter: 'rgba(16,24,32,0.5)',
      moreLight: 'rgba(16,24,32,0.25)',
    },
    red: {
      normal: 'red',
      darker: '#a83e32',
    },
    gray: {
      lightest: '#eee',
      lighter: '#bbb',
      darker: '#666',
      dark: '#464646',
      normal: '#f3f3f3',
    },
    blue: {
      normal: 'blue',
    },
    midnightblue: {
      normal: 'midnightblue',
    },
    'blue-sky': { normal: '#2678f2' },
  };
  static boxShadow = {
    xs: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.16,
      shadowRadius: 1.51,
      elevation: (BASE_SIZE * 0.25) / 2,
    },
    sm: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.17,
      shadowRadius: 3.05,
      elevation: BASE_SIZE * 0.25,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5.62,
      elevation: BASE_SIZE * 0.5,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.23,
      shadowRadius: 11.27,
      elevation: BASE_SIZE,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.24,
      shadowRadius: 16.41,
      elevation: 20,
    },
  };
  static alignSize = {
    1: BASE_SIZE * 0.25,
    2: BASE_SIZE * 0.5,
    3: BASE_SIZE * 0.75,
    4: BASE_SIZE,
    5: BASE_SIZE * 1.25,
    6: BASE_SIZE * 1.5,
    7: BASE_SIZE * 1.75,
    8: BASE_SIZE * 2,
  };
  static borderRadius = {
    rounded: 9999999,
    xs: BASE_SIZE * 0.325,
    sm: BASE_SIZE * 0.625,
    md: BASE_SIZE,
    lg: BASE_SIZE * 1.325,
    xl: BASE_SIZE * 1.625,
    '2xl': BASE_SIZE * 2,
  };
  static fontSize = {
    base: BASE_SIZE,
    xs: BASE_SIZE * 0.625,
    sm: BASE_SIZE * 0.775,
    '2sm': BASE_SIZE * 0.825,
    md: BASE_SIZE * 1.125,
    lg: BASE_SIZE * 1.225,
    xl: BASE_SIZE * 1.5,
    '2xl': BASE_SIZE * 1.75,
    '3xl': BASE_SIZE * 2,
  };

  static button_color = '#FF9900';
  static button_disable_color = '#999999';
  static line_color = '#555555';
  static border_color = '#333333';
  static error_border_color = '#DD0000';
  static success_border_color = '#009900';
  static button_background_color = '#f69435';

  static button = {
    height: {
      primary: 45,
    },
    color: {
      primary: this.color.primary,
      disabled: this.button_disable_color,
    },
  };
  static tierPriceMessageTemplate = ['Buy ', '%{qty}%', ' for ', '%{final_price}%', ' each and save ', '%{discount}%'];
}

export default Constants;
