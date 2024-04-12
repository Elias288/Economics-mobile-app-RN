import { createContext, useContext, useState } from 'react';
import { Snackbar } from 'react-native-paper';

/**
 * @typedef {Object} NotificationProviderProps
 * @property {() => void} showSnackbar
 * @property {(text: string) => void} setSnackBarContent
 * @property {(label: string, action: () => void) => void} defineSnackBarAction
 */

const NotificationContext = createContext(undefined);

export const useNotificationProvider = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useFunctionProvider debe estar dentro de un NotificationProvider');

  return context;
};

function NotificationProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState('example');
  const [snackBarAction, setSnackBarAction] = useState({
    label: 'Undo',
    onPress: () => onDismiss,
  });

  const showSnackbar = () => setIsVisible(true);
  const setSnackBarText = (text) => setSnackBarContent(text);

  const onDismiss = () => {
    setIsVisible(false);
    setSnackBarContent('example');
  };

  const defineSnackBarAction = (label, action) => {
    setSnackBarAction({
      label,
      onPress: action,
    });
  };

  return (
    <NotificationContext.Provider
      value={{ setSnackBarContent: setSnackBarText, showSnackbar, defineSnackBarAction }}
    >
      {children}

      <Snackbar
        visible={isVisible}
        onDismiss={onDismiss}
        action={snackBarAction}
        style={{ bottom: 50 }}
      >
        {snackBarContent}
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
