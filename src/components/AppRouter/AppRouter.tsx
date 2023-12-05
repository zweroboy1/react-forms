import { Routes, Route } from 'react-router-dom';
import { UncontrolledForm } from '../../pages/UncontrolledForm/UncontrolledForm';
import { ReactHookForm } from '../../pages/ReactHookForm/ReactHookForm';
import { Main } from '../../pages/Main/Main';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="/hook-form" element={<ReactHookForm />} />
    </Routes>
  );
};

export { AppRouter };
