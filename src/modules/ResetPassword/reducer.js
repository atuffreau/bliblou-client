import {
	SET_VALUE, SET_VALID, TOGGLE_PASSWORD_VISIBILITY, SET_IS_LOADING, SET_IS_SENT, SET_NEED_CONFIRM_SIGN_UP, CLEAR
} from "./actions";

const MAIL_ID = "mail",
			SIGN_UP_CODE_ID = "signUpCode",
			CONFIRMATION_CODE_ID = "confirmationCode",
			PASSWORD_ID = "password";

const initialState = {
  [ MAIL_ID ]: { id: MAIL_ID, value: "", isValid: undefined },
  [ SIGN_UP_CODE_ID ]: { id: SIGN_UP_CODE_ID, value: "", isValid: undefined },
  [ CONFIRMATION_CODE_ID ]: { id: CONFIRMATION_CODE_ID, value: "", isValid: undefined },
  [ PASSWORD_ID ]: { id: PASSWORD_ID, value: "", isValid: undefined },
	isLoading: false,
	needConfirmSignUp: false,
  isSent: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_VALUE: {
      const { id, value } = action.payload;
      return ({ 
				...state,
				[ id ]: { ...state[id], value }
			});
		};
			
		case SET_VALID: {
			const { id, isValid } = action.payload;
			return ({ 
				...state, 
				[ id ]: { ...state[id], isValid } 
			});
		};

    case TOGGLE_PASSWORD_VISIBILITY:
      const isClear = !state.password.isClear;
      return ({ 
				...state, 
				password: { ...state.password, isClear }
			});

    case SET_IS_LOADING:
      const isLoading = action.payload;
      return { ...state, isLoading };

		case SET_IS_SENT:
			const isSent = action.payload;
			return { ...state, isSent };

		case SET_NEED_CONFIRM_SIGN_UP:
			const needConfirmSignUp = action.payload;
			return { ...state, needConfirmSignUp };

    case CLEAR:
      return initialState;

    default:
      return state;
  }
}
