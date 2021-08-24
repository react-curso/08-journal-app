import { Provider } from "react-redux";
import { store } from "./store/store";

import { AppRouter } from "./routes/AppRouter";

// react-journal
function JournalApp() {
  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
}

export default JournalApp;