const BASE_SIZE = 14;

export default {
  color: {
    primary: '#f69435'
  },
  boxShadow: {
    xs: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity:  0.16,
      shadowRadius: 1.51,
      elevation: (BASE_SIZE * 0.25) / 2
    },
    sm: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity:  0.17,
      shadowRadius: 3.05,
      elevation: BASE_SIZE * 0.25
    },
    md: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity:  0.20,
      shadowRadius: 5.62,
      elevation: BASE_SIZE * 0.5
    },
    lg: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity:  0.23,
      shadowRadius: 11.27,
      elevation: BASE_SIZE
    },
    xl: {
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity:  0.24,
      shadowRadius: 16.41,
      elevation: 20
    }
  },
  alignSize: {
    1: BASE_SIZE * 0.25,
    2: BASE_SIZE * 0.5,
    3: BASE_SIZE * 0.75,
    4: BASE_SIZE,
    5: BASE_SIZE * 1.25,
    6: BASE_SIZE * 1.5,
    7: BASE_SIZE * 1.75,
    8: BASE_SIZE * 2,
  }
}
